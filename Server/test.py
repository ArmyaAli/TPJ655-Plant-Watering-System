from datetime import datetime

def convertNormalTime(time):
    return datetime.strptime(time, '%I:%M%p').strftime('%H:%M')


print(convertNormalTime("3:35PM"))