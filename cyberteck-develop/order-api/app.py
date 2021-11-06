from application import app

if __name__ == '__main__':
    app.run(host= '0.0.0.0', port=5002)



""""
http://127.0.0.1:5000/orders?customer-name=asc
http://127.0.0.1:5000/orders?from=21/01/20&to=01/08/21
http://127.0.0.1:5000/orders?purchase-price=desc
"""