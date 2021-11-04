from operator import and_
from re import search
from flask_cors import cross_origin
from flask_jwt_extended import (create_access_token, create_refresh_token,
                                jwt_required, jwt_refresh_token_required, get_jwt_identity)
from flask import jsonify
from flask_restful import reqparse, Resource

from application import api
from application.errors import ItemNotExistsError, InternalServerError, AppException, AccessDeniedError
import datetime
from application.models import Blog
from application.schemas import BlogSchema
from sqlalchemy_filters import apply_filters, apply_sort, apply_pagination
import time

@api.resource('/blog/<string:postId>', endpoint='blog-post')
class BlogApi(Resource):
    def __init__(self):
        pass

    def get(self, postId):
        try:
            blogPost = Blog.query.filter_by(id=postId).first()
            if blogPost:
                blogSchema = BlogSchema()

                # related posts
                minimalBlogSchema = BlogSchema(many=True, exclude=['body'])
                relatedPosts = Blog.query.filter_by(category=blogPost.category).order_by(
                Blog.updated_on.desc()).limit(3).all()
                relatedPosts = [relatedPost for relatedPost in relatedPosts if relatedPost.id != blogPost.id]


                return jsonify(meta={"statusCode": "200", "message": "Blogs Successfully"}, data=blogSchema.dump(blogPost), relatedPosts=minimalBlogSchema.dump(relatedPosts))
            else:
                raise ItemNotExistsError("Blog does not exist")
        except AppException as err:
            raise err
        except Exception as err:
            print(err)
            raise InternalServerError(
                "Internal server error occurred {}".format(err))

    # @jwt_required
    def delete(self, postId):
        try:
            # current_user = get_jwt_identity()
            # if current_user["type"] != "TEACHER":
            #     raise AccessDeniedError(
            #         "Only instructors are allowed to post a blog")
            blogPost = Blog.query.filter_by(id=postId).first()
            if blogPost:
                Blog.delete(blogPost)
                return jsonify(meta={"statusCode": "200", "message": "Blogs Deleted Successfully"})
            else:
                raise ItemNotExistsError("Blog Doesnt Exsists")
        except AppException as err:
            raise err
        except Exception as err:
            print(err)
            raise InternalServerError(
                "Internal server error occurred {}".format(err))

@api.resource('/blog', endpoint='blog')
class BlogApi(Resource):
    def __init__(self):
        self.parser = reqparse.RequestParser()
        self.parser.add_argument(
            'title', help='[title] field needed', required=True, type=str)
        self.parser.add_argument(
            'coverImage', help='[coverImage] field needed', required=True, type=str)
        self.parser.add_argument(
            'body', help='[body] field needed', required=True, type=str)
        self.parser.add_argument(
            'category', help='[category] field needed', required=True, type=str)
        self.parser.add_argument(
            'blogId', help='[blogId] field needed', required=False, type=int)

        self.getParser = reqparse.RequestParser()
        self.getParser.add_argument(
            'page', help='Invalid Page Number', required=False, type=int, default=1)
        self.getParser.add_argument(
            'q', type=str, default="")
        self.getParser.add_argument(
            'category', type=str, default='')

    def get(self):
        inputObj = self.getParser.parse_args()
        try:
            queryHandle = Blog.query
            filters = [
                {'field': 'title', 'op': 'like',
                    'value': "%{}%".format(inputObj.q)},
                (inputObj.get('category') and {'field': 'category', 'op': '==',
                                               'value': "{}".format(inputObj.category)}),
            ]

            filters = [
                formattedFilters for formattedFilters in filters if formattedFilters]

            sort_spec = [
                {'model': 'Blog', 'field': 'updated_on', 'direction': 'desc'},
            ]

            filteredResult = apply_filters(queryHandle, filters)
            sortedResult = apply_sort(filteredResult, sort_spec)
            paginatedQuery, pagination = apply_pagination(
                sortedResult, page_number=inputObj["page"], page_size=10)
            page_size, page_number, num_pages, total_results = pagination

            results = paginatedQuery.all()
            # fetch recent posts
            recentPosts = queryHandle.filter_by().order_by(
                Blog.updated_on.desc()).limit(5).all()

            print("recent: ", recentPosts)
            if results:
                blogSchema = BlogSchema(many=True)
                minimalBlogSchema = BlogSchema(many=True, exclude=['body','category'])
                return jsonify(meta={"statusCode": "200", "message": "Blogs Successfully"}, data={
                    "posts": blogSchema.dump(results),
                    "totalResults": total_results,
                    "totalPages": num_pages,
                    "recentPosts": minimalBlogSchema.dump(recentPosts)
                })
            else:
                return jsonify(meta={"statusCode": "404", "message": "No blogs found"}, data={
                    "totalResults": 0,
                    "totalPages": 0
                })

        except AppException as err:
            raise err
        except Exception as err:
            print(err)
            raise InternalServerError(
                "Internal server error occurred {}".format(err))

    # @jwt_required
    def post(self):
        inputObj = self.parser.parse_args()
        try:
            # current_user = get_jwt_identity()
            # if current_user["type"] != "instructor":
            #     raise AccessDeniedError(
            #         "Only instructors are allowed to post a blog")

            if inputObj.blogId:
                blogPost = Blog.query.filter_by(
                    id=inputObj.blogId).first()
                if blogPost:
                    blogPost.title = inputObj.title
                    blogPost.body = inputObj.body
                    blogPost.category = inputObj.category
                    blogPost.coverImage=inputObj.coverImage
                else:
                    raise ItemNotExistsError("Blog does not exist")

            else:
                blogPost = Blog(
                    title=inputObj.title,
                    body=inputObj.body,
                    category=inputObj.category,
                    coverImage=inputObj.coverImage
                )

            Blog.save(blogPost)

            return jsonify(meta={"statusCode": "200", "message": "Blog created successfuly"}, data={
                "id": blogPost.id
            })

        except AppException as err:
            raise err
        except Exception as err:
            raise InternalServerError(
                "Internal server error occurred {}".format(err))
