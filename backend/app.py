from flask import Flask, redirect, url_for, request, jsonify
from pymongo import MongoClient
from flask_cors import CORS, cross_origin
import json
import threading
import time
import ast
import copy
from simulation import randomSimulationInit, randomSimulationNextState, userDefSimulationInit, userDefSimulationNextState

app = Flask(__name__)
#cors = CORS(app)
cors = CORS(app, resources={r"/api/settings": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'

nodes = [
    {'id': 0, 'drone': True, 'x':.5, 'y':.75, 'rot':25, 'velocity':.55, 'ledger':['Transaction 1','Transaction 2','Transaction 3']},
    {'id': 1, 'drone': False, 'x':.20, 'y':.50, 'rot':36, 'velocity':.2, 'ledger':['Transaction 1','Transaction 2','Transaction 3']},
    {'id': 2, 'drone': True, 'x':.50, 'y':.10, 'rot':170, 'velocity':.4, 'ledger':['Transaction 1','Transaction 2','Transaction 3']},
]

control = 'pause'

settings = {'selectValue':'Random', 'numDrones':0, 'numStations':0}

sharedLock = threading.Lock()

def runSimulation():
    global settings
    global nodes
    global control
    if(True or settings['selectValue'] == 'Random'):
        randomSimulationInit(settings,control,nodes)
        while True:
            if control == 'play':
                randomSimulationNextState(settings,control,nodes)
            time.sleep(1000)
    else:
        userDefSimulationInit(settings,control,nodes)
        while True:
            if control == 'play':
                userDefSimulationNextState(settings,control,nodes)
            time.sleep(1000)



#mongoClient = MongoClient('mongodb://127.0.0.1:27017')
#db = mongoClient.get_database('sims_db')

@app.route('/api/nodes', methods=['GET'])
def api_nodes():
    global nodes
    global settings
    global control
    if control == 'play':
        if settings['selectValue'] == 'Random':
            randomSimulationNextState(settings,control,nodes)
        else:
            userDefSimulationNextState(settings,control,nodes)
    tempNodes = copy.deepcopy(nodes)
    for i in range(len(tempNodes)):
        tempNodes[i]['ledger'] = list(map(lambda transaction: transaction.__str__(), tempNodes[i]['ledger']))
    return jsonify(tempNodes)

@app.route('/api/settings', methods=['GET', 'POST'])
@cross_origin()
def api_settings():
    global settings
    global control
    global nodes
    if request.method == "POST":
        decoded = request.data.decode('utf-8')
        json_dict = ast.literal_eval(decoded)
        settings = json_dict
        if settings['selectValue'] == 'Random':
            randomSimulationInit(settings,control,nodes)
        else:
            userDefSimulationInit(settings,control,nodes)
        return jsonify(success=True)
    else:
        return jsonify(settings)

@app.route('/api/control', methods=['GET', 'POST'])
def api_control():
    global settings
    global control
    global nodes
    if request.method == "POST":
        if control == 'pause':
            control = 'play'
        else:
            control = 'pause'
        return jsonify(success=True)
    else:
        return jsonify(settings)

if __name__ == "__main__":
    app.run(debug=True)