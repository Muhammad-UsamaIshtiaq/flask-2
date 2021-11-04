from flask_cors import cross_origin
from application.errors import ItemNotExistsError, InternalServerError, AppException, AccessDeniedError
from flask import json, jsonify, send_from_directory
from flask_restful import reqparse, Resource

from application import api, app
import werkzeug
import uuid
import shutil
import imghdr

from PIL import Image, ImageOps, ImageChops
import math
import time
import os

@api.resource('/media/upload', endpoint='media-upload')
class MediaApi(Resource):
    def __init__(self):
        self.parser = reqparse.RequestParser()
        self.parser.add_argument(
            'file', help='[file] image file needed',type=werkzeug.datastructures.FileStorage, location='files', required=True)
    def post(self):
        try:
            inputObj = self.parser.parse_args()
            imgType = imghdr.what(inputObj['file'])
            print("Current Type: ", imgType)
            if not (imgType == "png" or imgType == "jpeg"):
                raise AppException("File type not supported [jpeg, jpg, png]")

            fileName = str(uuid.uuid4()).replace('-', '') + '.jpeg'#.format(imgType)
            mediaRootDir = app.config['APP_ROOT'] + app.config['UPLOAD_FOLDER']

            serverDestination = open(os.path.join(mediaRootDir, fileName), 'wb+')
            shutil.copyfileobj(inputObj['file'], serverDestination)
            serverDestination.close()


            # run task in bg
            # img compression
            originalImage = Image.open(os.path.join(mediaRootDir, fileName))
            originalImage.save(os.path.join(mediaRootDir, fileName), quality=95, optimize=True)

            # Thumbnail
            size = app.config["THUMBNAIL_SIZE"]
            thumbMediaRootDir = app.config['APP_ROOT'] + app.config['UPLOAD_THUMB_FOLDER']
            mode = "RGB"
            if imgType == "png":
                mode = "RGBA"

            thumbImg = originalImage.copy()
            thumbImg.thumbnail(size, Image.NEAREST)
            #thumbImg.save(os.path.join(thumbMediaRootDir , fileName),optimize=True, quality=65)
            #thumb = Image.new(mode, size, (255, 255, 255, 0))
            thumbImg.paste(thumbImg)
            thumbImg.save(os.path.join(thumbMediaRootDir , fileName),optimize=True, quality=65)
            return jsonify(meta={"statusCode": "200", "message": "Media Uploaded Successfuly"}, data={
                'file_name': fileName
            })

        except AppException as err:
            raise err
        except Exception as err:
            raise InternalServerError(
                "Internal server error occurred {}".format(err))


@api.resource('/media/<string:imgName>/<string:format>', endpoint='media-get')
class MediaApi(Resource):
    def __init__(self):
        pass
    def get(self, imgName, format):
        try:
            mediaRootDir = app.config['APP_ROOT'] + app.config['UPLOAD_FOLDER']
            if not os.path.isfile(os.path.join(mediaRootDir, imgName+'.jpeg')):
                raise ItemNotExistsError("Media not found")
            if format == 'thumb':
                thumbMediaRootDir = app.config['APP_ROOT'] + app.config['UPLOAD_THUMB_FOLDER']
                return send_from_directory(thumbMediaRootDir, imgName+'.jpeg')
            return send_from_directory(mediaRootDir, imgName+'.jpeg')
        except AppException as err:
            raise err
        except Exception as err:
            raise InternalServerError(
                "Internal server error occurred {}".format(err))