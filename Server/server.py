import time
import schedule
from flask import Flask, request
import sqlite3
from flask_cors import CORS
from subprocess import call
import threading
import RPi.GPIO as GPIO
import time
import hardware
from datetime import datetime

app = Flask(__name__)
# needed for POST requests on local computer
CORS(app)

# current state of the device
deviceState = {
    "state": "idle",
}

# lookup table for the day jobs
scheduleLookup = {
    "mon": schedule.every().monday,
    "tue": schedule.every().tuesday,
    "wed": schedule.every().wednesday,
    "thurs": schedule.every().thursday,
    "fri": schedule.every().friday,
    "sat": schedule.every().saturday,
    "sun": schedule.every().sunday,
}

# active schedules we will have
schedules = {

}

# converts normal time to military time
def convertNormalTime(time):
    return datetime.strptime(time, '%I:%M%p').strftime('%H:%M')

# login handler
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

# handler to handle account information related requests
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

# manual watering handler
@app.route("/water", methods=['POST'])
def water():
    deviceState["state"] = "watering"
    t = request.json['time']
    if t == None:
        t = 10
    else:
        t = int(t)
    hardware.waterWithTime(t)
    deviceState["state"] = "idle"
    return {"status": "finished watering"}

# returns the state of the device (the client will poll this)
@app.route("/status", methods=['GET'])
def status():
    return {"status": deviceState["state"]}


# handles schedule related requests
@app.route("/schedule", methods=['GET', 'POST', 'DELETE'])
def SET_schedule():
    username = request.args.get('user')
    if username == None:
        return {"status": "not logged in"}
    if request.method == 'GET':
        try:
            con = sqlite3.connect('database/test.db')
            data = []
            for row in con.cursor().execute(f"SELECT id, day, hour, minute, dayHalf, repeating FROM Schedule"):
                data.append({
                    "id": f"{row[0]}",
                    "days": f"{row[1]}",
                    "hour": f"{row[2]}",
                    "minute": f"{row[3]}",
                    "dayHalf": f"{row[4]}",
                    "repeating": f"{row[5]}",
                })
            return {"data": data}
        except:
            return {"status": "server error"}
    if request.method == 'POST':
        id = None
        hour = None
        minute = None
        day = None
        repeating = None
        dayHalf = None
        t = request.args.get('time')

        if t == None:
            t = 10
        else:
            t = int(t)

        print(t)
        for sched in request.json:
            id = int(sched['id'])
            hour = int(sched['hour'])
            minute = int(sched['minute'])
            day = ','.join(sched['days'])
            dayHalf = str(sched['dayHalf'])
            repeating = str(sched['repeating'])

        schedDay = day.lower().split(',')
        timeMilitary = convertNormalTime(f"{hour}:{minute}{dayHalf}")
        print(timeMilitary, hour, minute, dayHalf)

        for sday in schedDay:
            scheduleDayFunc = scheduleLookup[sday]
            print(sday, scheduleDayFunc)
            schedules[sday] = scheduleDayFunc.at(timeMilitary)
            schedules[sday].do(hardware.waterWithTime, seconds=t)
        # try:
        con = sqlite3.connect('database/test.db')
        data = []
        sql = ''' INSERT INTO Schedule(id, user,hour,minute,day,dayHalf,repeating)
              VALUES(?,?,?,?,?,?,?) '''
        cur = con.cursor()
        cur.execute(sql, [id, username, hour, minute, day, dayHalf, repeating])
        con.commit()
        return {"rowchanged": cur.lastrowid}
    # for the future the client will need to send the username data,
    # and we can stop the scheduling job based on that
    if request.method == 'DELETE':
        idToDelete = request.args.get('toDelete')
        con = sqlite3.connect('database/test.db')
        sql = '''DELETE FROM Schedule WHERE id=?'''
        cur = con.cursor()
        cur.execute(sql, [idToDelete])
        con.commit()
        return {"rowchanged": cur.lastrowid}


# this function listens for schedule jobs
def schedulePoller():
    while True:
        schedule.run_pending()
        time.sleep(1)


def main():
    scheduleThread = threading.Thread(target=schedulePoller, args=[])
    scheduleThread.daemon = True
    scheduleThread.start()
    # add rising edge detection on a channel
    # handles interrupts
    GPIO.add_event_detect(24, GPIO.RISING, callback=hardware.manual)
    app.run(host="0.0.0.0", debug=False, threaded=True)


if __name__ == "__main__":
    main()
