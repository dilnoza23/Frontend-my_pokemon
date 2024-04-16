import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container d-flex justify-content-between">
        <Link to="/" className="navbar-brand h-1">
          Pokemon
        </Link>
        <div>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search Pokémon"
              value={searchTerm}
              onChange={handleInputChange}
            />
            <div className="input-group-append">
              <button className="btn btn-outline-primary" type="button" onClick={handleSearch}>
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
