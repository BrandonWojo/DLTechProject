# DLTechProject
To run the project you will need to have ReactJS, NodeJS, Python/PIP, and Flask installed on your machine.

In addition, the project was made to run on the google chrome browser with the "Allow CORS: Access-Control-Allow-Origin" browser extension. Extension can be found here https://mybrowseraddon.com/access-control-allow-origin.html. With this extension installed make sure to toggle it on to use the app. Also make sure to toggle it off after you are done using the app.

Other browsers can be used if they have supporting extensions to unblock cross origin resource sharing (CORS).

ReactJS is built on NodeJS so we will install NodeJS.  This tutorial (https://www.liquidweb.com/kb/install-react-js-windows/) shows how to install NodeJS on Windows by navigating to the NodeJS website (https://nodejs.org/en/download/).  A MacOS Installer can also be downloaded from the same page.  Linux users can download and install NodeJS through their package manager or by downloading and building the source code. ReactJS will be automatically installed by the node package manager later.

Now we will install python/pip from the python downlaod page (https://www.python.org/downloads/).  If you already have python/pip installed just make sure you have a version of python greater than 3.7 (I used 3.7.4 in this project).

Now open a command prompt, if on windows it would be recommended to use a NodeJS command prompt as referenced in the tutorial(https://www.liquidweb.com/kb/install-react-js-windows/).  On MacOS or Linux a Terminal will work fine.  Navigate to the frontend directory of the DLTech Project with the cd command then run the command "npm install".  This will install all the packages needed to run the frontend of the project including ReactJS. Leave this prompt open even after it finishes installing.

On windows open a regular command prompt (Not the NodeJS one from before) on MacOS/Linux again open a new terminal window.  Navigate to the backend directory of the DLTech Project with the cd command then run the following commands:

python -m pip install flask
python -m pip install flask_cors
python -m pip install pymongo
python -m pip install json
python -m pip install ast

Leave this prompt open even after it finishes installing.

# At This point all the needed software is intalled

To run the project, first we start the backend code with the command prompt or terminal that we previously navigated to the backend directory with.  To start the backend code run the command "python app.py".

Next we start the frontend code with the command prompt or terminal that we previously navigated to the frontend directory with.  To start the backend code run the command "npm start".

The frontend code will probably open a default browser window, close this and open chrome.  Once the frontend code has completed loading ~15-30 sec.  Navigate to http://localhost:3000/home, this is where you select the simulation details.  To run a random simulation use the drop down menu to select Random and input the number of drones and stations, click go, then click Simulation the the top. Hit pause/play to toggle the pause/play of the simulation (the simulation is paused at the beginning). Clicking on a drone/station brings up its info below the simulation (scroll down).  

I implemented a basic random simulation on the backend in the file DLTech/backedn/simulation.py.  The lifecycle for a simulation is first the init function which is meant to set up the array of nodes (an array containg both drones and stations) and their inital states. Then while the simulation is unpaused the getNextState function is called with period of 100ms which updates the nodes to their next state according to the simulation policy.

The userDefSimulationInit and userDefSimulationNextState lifecycle functions are meant to be used for user defined simulations.  The idea is for the the existing blockchain simulation to be merged in here.  This way future development of the mechanics of the simulation is purely in python.

# Note

The software expects the node array to be an array of dictionaries where each dictionary is the represenation of the node.  

Node dictionary example:

node = {
    'id': 2, 
    'drone': True, 
    'x':.50, 
    'y':.10, 
    'rot':170, 
    'velocity':.4, 
    'ledger':['Transaction 1','Transaction 2','Transaction 3']
}

These are the componenets of a node being tracked for the purpose of the simulation.  id is expected to be a unique integer >= 0  to idetify a node. drone is a boolean which indicates if a node is a drone or otherwise a station.  x is the horizontal coordinate as a percentage of the width of a field being simulated, x is between 0 and 1. y is the vertical coordinate as a percentage of the height of a field being simulated, y is between 0 and 1. rot is the rotational angle of the node, in degrees.  velocity is the velocity of the drone, can be used in the simulation policy as seen in my random simulation code (non constrained floating point number). Ledger is the local ledger the node holds, represented as an array of transactions.  Here an array of strings is used for the transactions but any object can be used as long as it has an implemented __str__() function (to string method).