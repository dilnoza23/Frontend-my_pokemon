import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AllPokemonsList from "./PokemonComponents/AllPokemonsList";
import AboutPokemon from "./PokemonComponents/AboutPokemon";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AllPokemonsList />} />
        <Route path="/pokemon/:pokemonName" element={<AboutPokemon />} />
      </Routes>
    </Router>
  );
}

export default App;
