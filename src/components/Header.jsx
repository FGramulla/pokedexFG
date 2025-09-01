import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

function Header({ changePokemon }) {
  return (
    <header className="header">
      <div className="header-logo">
        <Link to="/">Pokémon</Link>
      </div>
      <nav className="header-nav">
        <ul className="header-menu">
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
          <Link to="/AboutUs">Info</Link>
          </li>
          <li className="dropdown">
            <a href="#contact">Contacto</a>
            <ul className="dropdown-menu">
              <li>
                <a href="https://github.com/FGramulla" target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/franco-gramulla-bridarolli-802a20243/" target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      <div className="header-right">
        <button className="cta-button" onClick={changePokemon}>
          Cambiar Pokémon
        </button>
      </div>
    </header>
  );
}

export default Header;




