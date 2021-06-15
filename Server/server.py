from flask import Flask
from flask import request

app = Flask(__name__)

@app.route("/login", methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        return "Log in successful!"