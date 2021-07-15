from flask import Flask, request
import sqlite3
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

deviceState = {
    "state": "idle",
}

# SERVER
@app.route("/login", methods=['POST'])
def login():
    if request.method == 'POST':
        try:
            user = request.json['username']
            psw = request.json['password']
            # query the database
            con = sqlite3.connect('database/test.db')
            for row in con.cursor().execute('SELECT * FROM user'):
                if row[1] == str(user) and row[2] == str(psw):
                    return { "status": "success" }
            return { "status": "failiure" }
        except:
            return { "status": "server error"}

@app.route("/water", methods=['POST'])
def water():
    deviceState["state"] = "watering"
    pass

@app.route("/status", methods=['GET'])
def status():
    return {"status": "bruh"}
    
@app.route("/schedule", methods=['POST'])
def schedule():
    pass