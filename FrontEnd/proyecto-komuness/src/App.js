import logo from './logo.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" style = {{ width: '200px', height: 'auto' }} />
        <p>
          Hello world
        </p>
       
      </header>
    </div>
  );
}

export default App;
