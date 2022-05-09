import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {

  const [weather, setweather] = useState({})
  const [changevtemp, setchangevtemp] = useState(true)
  const [changetemp, setchangetemp] = useState(true)

  useEffect(() => {
    function success(pos) {
      var crd = pos.coords;
    
      console.log('Your current position is:');
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=189d87564124b309d7d32aa495b93378`)
      .then(res => {
        setweather(res.data)
      })
    }
  
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  
  navigator.geolocation.getCurrentPosition(success, error);
}, [])

  const tempc = (weather.main?.temp - 275.15).toFixed(2)
  const tempf = ((weather.main?.temp - 275.15)  * 9/5 + 32 ).toFixed(2)
  document.body.style =`background: #00aae4`

  return (
    <div className="App">
      <div className='card'>
        <h2>Aplicacion del clima</h2>
        <h3>{weather.name}, {weather.sys?.country}</h3>
        <p><b>Temperatura: </b>{changevtemp ? tempc:tempf} <b>{changetemp ? "°C":"°F"}</b></p>
        <p><b>Humedad: </b>{weather.main?.humidity}%</p>
        <p><b>Presion atmosferica: </b>{weather.main?.pressure}</p>
        <img className='image' src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`} alt="" />
        <button onClick={() => {
          setchangevtemp(!changevtemp)
          setchangetemp(!changetemp)
        }
        }>Grados °C / °F</button>
      </div>
    </div>
  );
}

export default App;
