import React, { Component } from 'react';
import './App.css';
import Home from './views/Home/Home.js'
import Simulation from './views/Simulation/Simulation.js'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";

const App = () => {

  //const { history } = useHistory();

  return (
    <Router>
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/simulation">Simulation</Link>
          </li>
        </ul>
      </nav>

      <Switch>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/simulation">
          <Simulation />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  </Router>
  );
  
}

export default App;