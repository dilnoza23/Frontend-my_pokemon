import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../Navbar";

const AllPokemonsList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    let startPage, endPage;

    if (totalPages <= 5) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= 3) {
        startPage = 1;
        endPage = 5;
      } else if (currentPage + 1 >= totalPages) {
        startPage = totalPages - 4;
        endPage = totalPages;
      } else {
        startPage = currentPage - 2;
        endPage = currentPage + 2;
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <li
          className={`page-item ${currentPage === i ? "active" : ""}`}
          key={i}
        >
          <button className="page-link" onClick={() => handlePageChange(i)}>
            {i}
          </button>
        </li>
      );
    }

    if (startPage > 1) {
      pageNumbers.unshift(
        <li className="page-item" key="start">
          <button className="page-link" onClick={() => handlePageChange(1)}>
            1
          </button>
        </li>
      );
      pageNumbers.unshift(
        <li className="page-item disabled" key="start-ellipsis">
          <span className="page-link">...</span>
        </li>
      );
    }

    if (endPage < totalPages) {
      pageNumbers.push(
        <li className="page-item disabled" key="end-ellipsis">
          <span className="page-link">...</span>
        </li>
      );
      pageNumbers.push(
        <li className="page-item" key="end">
          <button
            className="page-link"
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </button>
        </li>
      );
    }

    return pageNumbers;
  };

  const fetchPokemonList = async (page) => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?offset=${(page - 1) * 18}&limit=18`
      );
      const dataPromises = response.data.results.map(async (pokemon) => {
        const pokemonData = await axios.get(pokemon.url);
        return {
          name: pokemon.name,
          types: pokemonData.data.types.map((type) => type.type.name), 
          imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
            pokemon.url.split("/")[6]
          }.png`,
        };
      });
      const pokemonDataList = await Promise.all(dataPromises);
      setPokemonList(pokemonDataList);
      setTotalPages(Math.ceil(response.data.count / 20));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPokemonList(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "grass":
        return "#78C850"; 
      case "fire":
        return "#F08030";
      case "water":
        return "#6890F0"; 
      default:
        return "#A8A878";
    }
  };

  return (
    <div>
      <Navbar />
      <h1 className="text-center">Pokémon List</h1>
      <div className="container">
        <div className="row justify-content-center">
          {pokemonList.map((pokemon) => (
            <div className="col-md-2 col-sm-6" key={pokemon.name}>
              <Link to={`/pokemon/${pokemon.name}`} className="card-link">
                <div
                  className="card mb-3"
                  style={{ backgroundColor: getTypeColor(pokemon.types[0]) }}
                >
                  <img
                    src={pokemon.imageUrl}
                    alt={pokemon.name}
                    className="card-img-top"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{pokemon.name}</h5>
                    <p>Types: {pokemon.types.join(", ")}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <div className="d-flex justify-content-center">
          <nav aria-label="Pagination">
            <ul className="pagination">{renderPageNumbers()}</ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default AllPokemonsList;
