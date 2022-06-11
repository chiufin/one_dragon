import logo from './logo.png';
import './App.css';
import ReactGA from 'react-ga';

function App() {
  ReactGA.initialize(process.env.REACT_APP_GA);
  ReactGA.pageview(window.location.pathname + window.location.search);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Staccc's petite app
        </p>
      </header>
    </div>
  );
}

export default App;
