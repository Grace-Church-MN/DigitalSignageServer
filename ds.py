#!/usr/bin/python3

# import the necessary packages
import os, signal
import requests
import time
import json
import subprocess
import multiprocessing
from multiprocessing.context import Process

assignments = []
delay = 0
tabProcess = None
tabPid = None

def tabScreen(t):
        while True:
                print(t)
                subprocess.Popen("export DISPLAY=:0.0 && xdotool key Ctrl+Shift+Tab", shell=True)
                print("tab")
                time.sleep(int(t))

def process_event(tmpAssignment):
        global assignments
        global delay
        global tabProcess
        global tabPid
    #    os.system('pkill -f firefox')
        os.system('pkill -f chromium-browser')
        if tmpAssignment['Video']:
                assignments = []
                assignments.append(tmpAssignment["URLS"][0])
                os.system('wget "'+tmpAssignment["URLS"][0]+'" -O /home/pi/DigitalSignageServer/tmp/video.mp4')
                command = 'export DISPLAY=:0 && --kiosk --new-window --start-fullscreen --disable-session-crashed-bubble --disable-infobars --window-size=1920,1080 --window-position=0,0 --incognito "file:///home/pi/DigitalSignageServer/video.html"'
                subprocess.Popen(command, shell=True)
        else:
                assignments = []
                urls = ''
                delay = tmpAssignment['Delay']
                for val in tmpAssignment['URLS']:
                        assignments.append(val)
                        urls+='"'
                        urls+=val
                        urls+='" '
                command = 'export DISPLAY=:0 && /usr/bin/chromium-browser --kiosk --new-window --start-fullscreen --disable-session-crashed-bubble --disable-infobars --window-size=1920,1080 --window-position=0,0 --incognito '+(urls)
                subprocess.Popen(command, shell=True)

                if tabProcess:
                        if tabProcess.is_alive:
                                os.kill(int(tabPid), signal.SIGKILL)
                if len(tmpAssignment["URLS"]) > 1:
                        tabProcess = Process(target=tabScreen,args=[delay],daemon=True,name='TabProcess')
                        tabProcess.start()
                        print(tabProcess.pid)
                        tabPid = tabProcess.pid
#                       tabProcess.join()
        return

if __name__ == '__main__':

                f = open('/home/pi/DigitalSignageServer/cred.json','r')
                cred = json.load(f)
                f.close()

                apiBase = 'https://api.grace.church/v1/'

                # authenticate device
                tokenReq = requests.post(apiBase+'ds/authenticate', data = {'displayID':cred['DisplayID'],'password':cred['Password']})
                token = json.loads(tokenReq.text)['token']

                try:
                        while True:
                                # inform device
                                informReq = requests.get(apiBase+'ds/inform', headers = {"XAuthToken":token})

                                # get device assignment
                                assignmentReq = requests.get(apiBase+'ds/assignment', headers = {"XAuthToken":token})
                                tmpAssignment = json.loads(assignmentReq.text)

                                if tmpAssignment['Refresh']:
                                        print("Refreshing")
                                        process_event(tmpAssignment)
                                elif assignments == tmpAssignment['URLS']:
                                        print("No New Assignments")
                                else:
                                        process_event(tmpAssignment)

                                time.sleep(60.0)

                except KeyboardInterrupt:
                                print("\n[INFO] cleaning up...")
                            #    os.system('pkill -f firefox')
                                os.system('pkill -f chromium-browser')
                                os.system('rm /home/pi/DigitalSignageServer/tmp/*')
