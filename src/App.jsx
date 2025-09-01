import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header.jsx';
import Home from './pages/Home.jsx';
import './App.css';
import PokedexList from './components/PokedexList.jsx';
import Pokemon from './components/Pokemon.jsx';
import AboutUs from './pages/AboutUs.jsx';
import pokemonGifs from './data/pokemonGifs';

const App = () => {
  const [currentPokemon, setCurrentPokemon] = useState(0);

  const changePokemon = () => {
    setCurrentPokemon((prev) => (prev + 1) % pokemonGifs.length);
  };

  return (
    <Router>
      <Header changePokemon={changePokemon} />
      <Routes>
        <Route path="/" element={<Home currentPokemon={currentPokemon} />} />
        <Route path="/Pokedex" element={<PokedexList />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/pokemon/:id" element={<Pokemon />} />
      </Routes>
    </Router>
  );
};

export default App;

