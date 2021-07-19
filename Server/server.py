from flask import Flask, request
import sqlite3
from flask_cors import CORS
from subprocess import call
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

@app.route("/accountInfo", methods=['GET'])
def getAccountInfo():
    if request.method == 'GET':
        try:
            username = request.args.get('user');
            con = sqlite3.connect('database/test.db')
            print(username, request.url)
            for row in con.cursor().execute(f"SELECT username, fName, lName, Address, systemModel FROM userInfo INNER JOIN user ON userInfo.userid = user.userid WHERE username=\'{username}\'"):
                print(f"{row}")
                return { 
                    "username": f"{row[0]}",
                    "fName": f"{row[1]}",
                    "lName": f"{row[2]}",
                    "address": f"{row[3]}",
                    "model": f"{row[4]}",
                }
            return { "status": "failiure" }
        except:
            return { "status": "server error"}

@app.route("/water", methods=['POST'])
def water():
    deviceState["state"] = "watering"
    manual.waterPlant()
    
@app.route("/status", methods=['GET'])
def status():
    return {"status": "bruh"}
    
@app.route("/schedule", methods=['POST'])
def schedule():
    pass