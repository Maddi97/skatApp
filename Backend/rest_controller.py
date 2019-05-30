#!flask/bin/python
from flask import Flask
from flask_cors import CORS, cross_origin
from flask import jsonify
from flask import request

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return jsonify({'text': "Hello, World!"})

@app.route('/postmethod', methods = ['POST'])
def get_post_javascript_data():
    jsdata = request.json
    print(jsdata)
    return ("Gotcha")

if __name__ == '__main__':
    app.run(debug=True)
