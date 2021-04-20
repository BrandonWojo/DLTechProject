import math
from random import random

def randomSimulationNextState(settings,control,nodes):
    for i in range(len(nodes)):
        if nodes[i]['drone']:
            nodes[i]['x'] += math.cos(math.pi*nodes[i]['rot']/180)*nodes[i]['velocity']
            nodes[i]['y'] += math.sin(math.pi*nodes[i]['rot']/180)*nodes[i]['velocity']
            nodes[i]['rot'] += 5

def randomSimulationInit(settings,control,nodes):
    nodes.clear()
    for i in range(settings['numDrones']):
        nodes.append({'id': i, 'drone': True, 'x':random(), 'y':random(), 'rot':random()*360, 'velocity':.01, 'ledger':['Transaction 1','Transaction 2','Transaction 3']})
    for i in range(settings['numDrones'], settings['numDrones'] + settings['numStations']):
        nodes.append({'id': i, 'drone': False, 'x':random(), 'y':random(), 'rot':0, 'velocity':0, 'ledger':['Transaction 1','Transaction 2','Transaction 3']})

def userDefSimulationNextState(settings,control,nodes):
    for i in range(len(nodes)):
        if nodes[i]['drone']:
            nodes[i]['x'] += math.cos(math.pi*nodes[i]['rot']/180)*nodes[i]['velocity']
            nodes[i]['y'] += math.sin(math.pi*nodes[i]['rot']/180)*nodes[i]['velocity']
            nodes[i]['rot'] += 5

def userDefSimulationInit(settings,control,nodes):
    nodes.clear()
    for i in range(settings['numDrones']):
        nodes.append({'id': i, 'drone': True, 'x':random(), 'y':random(), 'rot':random()*360, 'velocity':.01, 'ledger':['Transaction 1','Transaction 2','Transaction 3']})
    for i in range(settings['numDrones'], settings['numDrones'] + settings['numStations']):
        nodes.append({'id': i, 'drone': False, 'x':random(), 'y':random(), 'rot':0, 'velocity':0, 'ledger':['Transaction 1','Transaction 2','Transaction 3']})
