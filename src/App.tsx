import React from 'react';
import './App.css';

const url = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png'

function App() {
  return (
    <div className="App">
      <img src={url} className="App-logo" alt="logo" />
    </div>
  );
}

export default App;
