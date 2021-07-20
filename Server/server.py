import time
from flask import Flask, request
import sqlite3
from flask_cors import CORS
from subprocess import call
import datetime
print(
    datetime.datetime.fromtimestamp(
        int("84600")
    ).strftime('%H:%M:%S')
)

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
                    return {"status": "success"}
            return {"status": "failiure"}
        except:
            return {"status": "server error"}


@app.route("/accountInfo", methods=['GET', 'POST'])
def getAccountInfo():
    if request.method == 'GET':
        try:
            username = request.args.get('user')
            con = sqlite3.connect('database/test.db')
            print(
                f"SELECT username, fName, lName, Address, systemModel FROM userInfo WHERE username=?")
            for row in con.cursor().execute(f"SELECT username, fName, lName, Address, systemModel FROM userInfo WHERE username=\'{username}\'"):
                print(row)
                return {
                    "username": f"{row[0]}",
                    "fName": f"{row[1]}",
                    "lName": f"{row[2]}",
                    "address": f"{row[3]}",
                    "model": f"{row[4]}",
                }
            return {"status": "failiure"}
        except:
            return {"status": "server error"}
    # if request.method == 'POST':
    #     try:
    #         # data
    #         user = str(request.json['username'])
    #         fName = str(request.json['fName'])
    #         lName = str(request.json['lName'])
    #         addr = str(request.json['addr'])
    #         username = request.args.get('user')
    #         con = sqlite3.connect('database/test.db')
    #         cur = con.cursor()
    #         if len(user) > 0:
    #             print(f"UPDATE User SET username=\'{user}\' WHERE username=\'{username}\'")
    #             query = f"UPDATE User SET username={user} WHERE username={username}";
    #             cur.execute(query)

    #         queryLeft = f"UPDATE userInfo SET "
    #         queryRight = "WHERE username={username}";
    #         if len(fName) > 0:
    #             queryLeft += ",fName={fName}"
    #         if len(lName) > 0:
    #             queryLeft += ",lName={lName}"
    #         if len(addr) > 0:
    #             queryLeft += ",address={addr} "
    #         cur.execute(queryLeft + queryRight)
    #         con.commit()
    #         return {
    #             "status": "success",
    #         }
    #     except:
    #         return {"status": "server error"}


@app.route("/water", methods=['POST'])
def water():
    deviceState["state"] = "watering"
    # manual.waterPlant()
    time.sleep(10)
    deviceState["state"] = "idle"
    return {"status": "finished watering"}


@app.route("/status", methods=['GET'])
def status():
    return {"status": deviceState["state"]}


@app.route("/schedule", methods=['GET', 'POST'])
def schedule():
    if request.method == 'GET':
        # try:
            username = request.args.get('user')
            con = sqlite3.connect('database/test.db')
            print(f"SELECT username, hour, minute, second, day, repeating FROM Schedule WHERE username=\'{username}\'")
            data = []
            for row in con.cursor().execute(f"SELECT hour, minute, second, day, repeating FROM Schedule"):
                print(row)
                data.append({
                    "hour": f"{row[0]}",
                    "minute": f"{row[1]}",
                    "second": f"{row[2]}",
                    "day": f"{row[3]}",
                    "repeating": f"{row[4]}",
                })
                return {"data": data}
            return {"status": "failiure"}
        # except:
        #     return {"status": "server error"}
