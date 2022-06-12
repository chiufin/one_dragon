import React, { useEffect, useState } from 'react';
import image1 from './images/logo.png';
import image2 from './images/beer.png';
import image3 from './images/football.png';
import image4 from './images/sandwich.png';
import image5 from './images/study.png';
import './App.css';
//import ReactGA from 'react-ga';
import AppConfig from './config/AppConfig';
import TextLoading from './Components/TextLoading';

const images = [image1, image2, image3, image4, image5 ];

const App = () => {
  const [imageIndex, setImageIndex] = useState(Math.floor(Math.random() * images.length));
  const [apiData, setApiData] = useState('');
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    //ReactGA.initialize(process.env.REACT_APP_GA, {
    //  gaOptions: {
    //    siteSpeedSampleRate: 100,
    //  }
    //});
    //ReactGA.pageview(window.location.pathname + window.location.search);
    fetch(AppConfig.backendURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({query: "{ hello }"})
    })
      .then(r => r.json())
      .then(data => {
        console.log('data returned:', data);
        const value = data && data.data && data.data.hello;
        setApiData(value);
      })
      .catch(err => {
        console.warn(err);
      })
      .finally(() => setLoader(false));
  });
  return (
    <div
      className="App"
      onClick={ () => {
        let randomNum = Math.floor(Math.random() * images.length);
        if (randomNum === imageIndex) {
          randomNum = (randomNum+1)%images.length;
        }
        setImageIndex(randomNum);
      }}>
      <header className="App-header">
        <img
          src={images[imageIndex]}
          className="App-logo"
          alt="logo"
        />
        <p>
          Staccc's petite app
        </p>
        <p>from graphql: {loader ? <TextLoading /> : apiData}</p>
      </header>
    </div>
  );
}

export default App;
