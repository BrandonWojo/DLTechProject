import React, { useState } from 'react';
import { useHistory , Redirect} from 'react-router-dom';
import axios from 'axios';
import './Home.css';

const Home = (props) => {

  const [settings, setSettings] = useState({
    selectValue: "Random",
    numDrones: 0,
    numStations: 0
  });

  const [settingsSet, setSettingsSet] = useState(false);
  
  //const history = useHistory();

  const handleSelectChange = (e) => {
    setSettings({
      selectValue: e.target.value,
      numDrones: settings.numDrones,
      numStations: settings.numStations
    });
  };

  const handleDroneChange = (e) => {
    e.persist();
    setSettings({
      selectValue: settings.selectValue,
      numDrones: Number.parseInt(e.target.value),
      numStations: settings.numStations
    });
  };

  const handleStationChange = (e) => {
    e.persist();
    setSettings({
      selectValue: settings.selectValue,
      numDrones: settings.numDrones,
      numStations: Number.parseInt(e.target.value),
    });
  };

  const handleClick = () => {
    axios.post('http://localhost:5000/api/settings', settings)
      .then(response => {
        if (response.status === 200) {
          console.log(`Settings were posted to server`);
        } else {
          console.log(`Settings api sent back response with status != 200 ${response.data}`);
        }
      }).catch(e => {
          console.log(`Settings post fail ${e}`);
      }).finally(() => {
        console.log(`Redirecting to Simulation`);
        setSettingsSet(true);
        //console.log(props);
        //props.history.history.push("/simulation");
      });
  };

  
  return (
    <div>
      <h1 className="title">Simulation Details</h1>
          <form>
              <select 
                value={settings.selectValue} 
                onChange={handleSelectChange} 
              >
                <option value="Random">Random</option>
                <option value="UserDef">User Defined</option>
              </select>
              <input type='text' className='inputtext' id='title' placeholder='# Drones' onChange={handleDroneChange} />
              <input type='text' className='inputtext' placeholder='# Stations' onChange={handleStationChange} />
          </form>
          <button className='button' onClick={handleClick}>Go</button>
    </div>
  );
}

export default Home;