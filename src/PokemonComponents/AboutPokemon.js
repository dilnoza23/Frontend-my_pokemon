import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Navbar';

const AboutPokemon = () => {
  const { pokemonName } = useParams();
  const [pokemonData, setPokemonData] = useState(null);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        setPokemonData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPokemonData();
  }, [pokemonName]);

  if (!pokemonData) {
    return <div>Loading...</div>;
  }

  const { name, sprites, types, stats } = pokemonData;

  const getTypeNames = () => {
    if (!types || !Array.isArray(types)) {
      return [];
    }

    return types.map((type) => type.type.name);
  };

  const getStatValue = (statName) => {
    if (!stats || !Array.isArray(stats)) {
      return null;
    }

    const stat = stats.find((stat) => stat.stat.name === statName);
    return stat ? stat.base_stat : null;
  };

  const cardStyle = {
    backgroundColor: types[0].type.name === 'normal' ? '#A8A878' : types[0].type.name === 'fire' ? '#F08030' : types[0].type.name === 'water' ? '#6890F0' : types[0].type.name === 'grass' ? '#78C850' : '#FFFFFF',
    color: '#000000',
    borderRadius: '10px',
    padding: '20px',
    marginBottom: '20px',
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <h1>{name}</h1>
        <div className="card" style={cardStyle}>
          <img src={sprites.front_default} alt={name} width="200px" />
          <div className="card-body">
            <h5 className="card-title">Type: {getTypeNames().join(', ')}</h5>
            <p className="card-text">Speed: {getStatValue('speed')}</p>
            <p className="card-text">Height: {pokemonData.height}</p>
            <a href='/' className='btn btn-primary'>Back</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPokemon;
