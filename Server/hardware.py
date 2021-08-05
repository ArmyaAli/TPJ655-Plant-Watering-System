import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BCM)
GPIO.setup(18, GPIO.OUT)
GPIO.setup(24, GPIO.IN, pull_up_down=GPIO.PUD_UP)
GPIO.output(18, GPIO.LOW)


def water():
    GPIO.setmode(GPIO.BCM)
    GPIO.setup(18, GPIO.OUT)

    GPIO.output(18, GPIO.HIGH)
    time.sleep(10)
    GPIO.output(18, GPIO.LOW)


def waterWithTime(seconds):
    GPIO.output(18, GPIO.HIGH)
    time.sleep(seconds)
    GPIO.output(18, GPIO.LOW)


def manual(channel):
   GPIO.output(18, GPIO.HIGH)
   time.sleep(10)
   GPIO.output(18, GPIO.LOW)
         
