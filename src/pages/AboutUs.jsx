import React from "react";
import "../Styles/AboutUs.css"; // Importa los estilos

const AboutUs = () => {
  return (
    <div className="aboutus">
      <div className="about-container">
        <h1 className="about-title">¡Sobre Nosotros!</h1>

        <p className="about-text">¡Hola entrenador Pokémon! 👋</p>

        <p className="about-text">
          Esta Pokédex fue creada como un proyecto personal con React, para
          explorar el mundo del desarrollo web de manera divertida y temática.
          Usamos la increíble <span className="highlight">PokeAPI</span>, una
          API gratuita que proporciona datos detallados sobre todos los Pokémon.
        </p>

        <p className="about-text">
          Aquí podrás buscar tus Pokémon favoritos, conocer sus tipos,
          habilidades, estadísticas y mucho más. Nuestra misión es darte una
          experiencia lo más cercana posible a la Pokédex del mundo real.
        </p>

        <p className="about-text">
          ¡Gracias por visitar nuestra Pokédex! Que tu viaje Pokémon esté lleno
          de aventuras, capturas y batallas épicas. 🎮⚡️
        </p>

        <div className="pokeball-container">
          <img
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
            alt="Pokeball"
            className="pokeball"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
