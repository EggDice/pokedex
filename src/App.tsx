import React from 'react';
import './App.css';
import { httpGet } from './http';

const url = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png';
                   //
httpGet('https://pokeapi.co/api/v2/pokemon')().then(console.log)

function App() {
  return (
    <div className="App">
      <img src={url} className="App-logo" alt="logo" />
    </div>
  );
}

export default App;
