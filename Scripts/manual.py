import RPi.GPIO as GPIO
import time

def waterPlant:
    GPIO.setmode(GPIO.BCM)
    GPIO.setup(18, GPIO.OUT)

    GPIO.output(18, GPIO.HIGH)
    time.sleep(10)
    GPIO.output(18, GPIO.LOW)