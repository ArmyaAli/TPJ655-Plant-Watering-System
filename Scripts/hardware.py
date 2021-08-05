import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BCM)
GPIO.setup(18, GPIO.OUT)
GPIO.setup(24, GPIO.IN, pull_up_down=GPIO.PUD_UP)

GPIO.output(18, GPIO.LOW)

while 1:
   inputState = GPIO.input(24)

   if inputState == False:
      print "on"
      GPIO.output(18, GPIO.HIGH)
   if inputState == True:
      print "off"
      GPIO.output(18, GPIO.LOW)