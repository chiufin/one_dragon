import React, { useEffect, useState } from 'react';
import { from } from 'rxjs';
import { map, filter, mergeMap, delay } from 'rxjs/operators';

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

let numbersObservable = from([1,2,3,4,5]);
let squareNumbers = numbersObservable.pipe(
  filter((val: number) => val > 2),
  mergeMap((val: number) => from([val]).pipe(delay(1000 * val))),
  map((val: number) => val * val)
);

const useObservable = (observable: any, setter: any) => {
  useEffect(() => {
    let subscription = observable.subscribe((result: number) => {
      setter(result);
    })
    return () => subscription.unsubscribe();
  }, [observable, setter])
}

const App = () => {
  const [imageIndex, setImageIndex] = useState(Math.floor(Math.random() * images.length));
  const [apiData, setApiData] = useState('');
  const [loader, setLoader] = useState(false);
  const [currentNum, setCurrentNum] = useState(0);
 
  useObservable(squareNumbers, setCurrentNum);

  // useEffect(() => {
    //ReactGA.initialize(process.env.REACT_APP_GA, {
    //  gaOptions: {
    //    siteSpeedSampleRate: 100,
    //  }
    //});
    //ReactGA.pageview(window.location.pathname + window.location.search);
    
  // });
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
        <p data-cy='app-title'>
          Staccc's petite app
        </p>
        
        <button type='button' onClick={() => {
          setLoader(true)
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
        }}>get graphql data</button>
        <p>{loader ? <TextLoading /> : apiData}</p>
        <p>rxjs: {currentNum}</p>
      </header>
    </div>
  );
}

export default App;
