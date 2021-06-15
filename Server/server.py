from flask import Flask, request
import sqlite3

app = Flask(__name__)

@app.route("/login", methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        user = request.form["userbox"]
        psw = request.form["passbox"]
        # query the database
        con = sqlite3.connect('database/test.db')
        for row in con.cursor().execute('SELECT * FROM user'):
            if row[1] == user and row[2] == psw:
                return "Successful!"
        return "Unsuccessful"

@app.route("/water", methods=['POST'])
def water():
    pass

@app.route("/schedule", methods=['POST'])
def schedule():
    pass