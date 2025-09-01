import React, { useState } from "react";
import "../styles/Home.css";
import { Link } from "react-router-dom";
import pokemonGifs from "../data/pokemonGifs";
import { useInView } from "react-intersection-observer";

function Home({ currentPokemon }) {
  const [logoRef, logoInView] = useInView({ triggerOnce: true });
  const [subtitleRef, subtitleInView] = useInView({ triggerOnce: true });
  const [isScrollEnabled, setIsScrollEnabled] = useState(false); // Estado para controlar el scroll

  // Función para habilitar el scroll y desplazarse a home-bottom
  const handleStartClick = () => {
    setIsScrollEnabled(true); // Habilitar el scroll
    document.body.style.overflow = "auto"; // Habilitar el scroll en el body
    document.getElementById("home-bottom").scrollIntoView({ behavior: "smooth" }); // Desplazamiento suave
  };

  return (
    <div className="home">
      <div className="home-top">
        {/* Logo con animación */}
        <div
          ref={logoRef}
          className={`logo ${logoInView ? "slide-down" : ""}`}
        >
          <img src="/img/pokeballPixelart.png" alt="Logo" />
          <img src="/img/titlePixelart.png" alt="Title" />
        </div>
        {/* Botón con animación */}
        <div
          ref={subtitleRef}
          className={`subtitle ${subtitleInView ? "slide-down" : ""}`}
        >
          <button
            className={subtitleInView ? "slide-down" : ""}
            onClick={handleStartClick} // Manejador de clic
          >
            Start
          </button>
        </div>
      </div>
      {/* Sección inferior */}
      <div
        id="home-bottom"
        className="home-bottom"
        style={{ display: isScrollEnabled ? "block" : "none" }} // Ocultar inicialmente
      >
        <div className="home-left">
          <h1 className="home-title">¡Bienvenido a la Pokédex!</h1>
          <p className="home-description">
            Explora, descubre y aprende sobre todos tus Pokémon favoritos.
          </p>
          <Link to="/Pokedex">
            <button>Ir a la Pokedex</button>
          </Link>
        </div>
        <div className="home-right">
          <img
            src={pokemonGifs[currentPokemon]}
            alt="Pokemon gif"
            className="pokemon-gif"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;