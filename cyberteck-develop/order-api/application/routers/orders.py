from flask import jsonify
from flask_restful import reqparse, Resource
from marshmallow.fields import Boolean

from application import api
from application.errors import ItemNotExistsError, InternalServerError, AppException
from application.models import Order
from application.schemas import OrderInfoSchema
from datetime import datetime


@api.resource('/order/<string:orderId>', endpoint='order_get')
class OrderInfoApi(Resource):

    def get(self, orderId):
        try:
            orderInfo = Order.query.filter_by(id=orderId).first()
            if orderInfo:
                schoolInfoSchema = OrderInfoSchema()
                schoolInfoData = schoolInfoSchema.dump(orderInfo)
            else:
                raise ItemNotExistsError("Order does not exist")
            return jsonify(meta={"statusCode": "200", "message": "Order found Successfully"}, data={**schoolInfoData})

        except AppException as err:
            raise err
        except Exception as err:
            raise InternalServerError(
                "Internal server error occurred {}".format(err))


@api.resource('/orders', endpoint='order')
class OrderApi(Resource):

    def __init__(self):
        self.parser = reqparse.RequestParser()
        
        self.getParser = reqparse.RequestParser()
        self.getParser.add_argument('customer-name', type=str)
        self.getParser.add_argument('purchased-product', type=str)
        self.getParser.add_argument('from', type=lambda x: datetime.strptime(x,'%d/%m/%y'))
        self.getParser.add_argument('to', type=lambda x: datetime.strptime(x,'%d/%m/%y'))
        self.getParser.add_argument('purchase-price', type=str)
        self.getParser.add_argument('csv', type=Boolean)
        self.getParser.add_argument('email', type=str)
        self.getParser.add_argument('source', type=str, default="ALL")
        self.getParser.add_argument('limit', type=int, default=0)
       

    def __add_filters(self, query, filters):

        if filters.get('from') and filters.get('to'):
            query = query.filter( Order.date_of_purchase.between(filters['from'], filters['to']) )
            query = query.order_by( Order.date_of_purchase.desc())
        elif filters.get('customer-name'):
            query = query.order_by(Order.customer_name.asc())
        elif filters.get('purchased-product'):
            query = query.order_by(Order.purchased_product.asc())
        elif filters.get('purchase-price'):
            if filters['purchase-price'].lower() == 'desc':
                query = query.order_by(Order.price.desc())
            else:
                query = query.order_by(Order.price.desc())
        elif filters.get('email'):
            query = query.order_by(Order.email.asc())
        return query


    def get(self):
        inputObj = self.getParser.parse_args()
        filters = dict(inputObj)
        try:
            order_query = Order.query
            fetch_source = filters.pop('source')
            fetch_limit = filters.pop('limit')

            order_query = self.__add_filters(order_query, filters)

            if fetch_limit > 0:
                order_query = order_query.limit(fetch_limit)
            orderList = order_query.all()
            if orderList:
                orderInfoSchema = OrderInfoSchema(many=True)
                orderDataList = orderInfoSchema.dump(orderList)
            else:
                raise ItemNotExistsError("Order does not exist")
            return jsonify(meta={"statusCode": "200", "message": "Order found Successfully"}, data=orderDataList)
        except AppException as err:
            raise err
        except Exception as err:
            raise InternalServerError(
                "Internal server error occurred {}".format(err))
