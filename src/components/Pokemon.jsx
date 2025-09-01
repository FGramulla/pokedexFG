import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "../styles/Pokemon.css";

function Pokemon() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${id}`
        );
        const speciesResponse = await axios.get(
          `https://pokeapi.co/api/v2/pokemon-species/${id}`
        );
        const flavorText = speciesResponse.data.flavor_text_entries.find(
          (entry) => entry.language.name === "es"
        );
        const pokemonData = {
          id: response.data.id,
          name: response.data.name,
          image: response.data.sprites.front_default,
          officialArtwork:
            response.data.sprites.other["official-artwork"].front_default,
          dreamWorld: response.data.sprites.other.dream_world.front_default,
          shiny: response.data.sprites.front_shiny,
          stats: response.data.stats,
          height: response.data.height,
          weight: response.data.weight,
          types: response.data.types.map((type) => type.type.name),
          moves: response.data.moves.slice(0, 5).map((move) => move.move.name),
          description: flavorText
            ? flavorText.flavor_text
            : `Descripción de ${response.data.name}`,
        };

        setPokemon(pokemonData);
      } catch (error) {
        console.error("Error fetching Pokémon details:", error);
      }
    };

    fetchPokemonDetails();
  }, [id]);

  if (!pokemon) return <div>Cargando...</div>;

  const getTypeColor = (type) => {
    const typeColors = {
      grass: "#78C850",
      fire: "#F08030",
      water: "#6890F0",
      electric: "#F8D030",
      psychic: "#F85888",
      ice: "#98D8D8",
      dragon: "#7038F8",
      dark: "#705848",
      fairy: "#EE99AC",
      normal: "#A8A878",
      fighting: "#C03028",
      flying: "#A890F0",
      poison: "#A040A0",
      ground: "#E0C068",
      rock: "#B8A038",
      bug: "#A8B820",
      ghost: "#705898",
      steel: "#B8B8D0",
    };
    return typeColors[type] || "#A8A8A8";
  };

  const capitalizeFirstLetter = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

  const handlePrev = () => {
    if (pokemon.id > 1) {
      navigate(`/pokemon/${pokemon.id - 1}`);
    }
  };

  const handleNext = () => {
    navigate(`/pokemon/${pokemon.id + 1}`);
  };

  return (
    <div className="pokemon-container">
      <div className="pokemon-detail">
        <div className="pokemon-top">
          <div className="pokemon-title">
            <h1 className="pokemon-id">#{pokemon.id}</h1>
            <h1 className="pokemon-name">
              {capitalizeFirstLetter(pokemon.name)}
            </h1>
          </div>
          <div className="pokemon-image-container">
            <button onClick={handlePrev} className="pokemon-prev-btn">
              <FaArrowLeft size={30} color="#fff" />
            </button>
            <img
              className="pokemon-image"
              src={pokemon.officialArtwork}
              alt={pokemon.name}
              style={{
                boxShadow: `0 4px 10px ${getTypeColor(pokemon.types[0])}`,
              }}
            />
            <div className="additional-images">
              <img
                className="pokemon-image"
                src={pokemon.dreamWorld}
                alt={`${pokemon.name} Dream World`}
                style={{
                  boxShadow: `0 4px 10px ${getTypeColor(pokemon.types[0])}`,
                }}
              />
              <img
                className="pokemon-image"
                src={pokemon.shiny}
                alt={`${pokemon.name} Shiny`}
                style={{
                  boxShadow: `0 4px 10px ${getTypeColor(pokemon.types[0])}`,
                }}
              />
            </div>
            <button onClick={handleNext} className="pokemon-next-btn">
              <FaArrowRight size={30} color="#fff" />
            </button>
          </div>
        </div>
        <div className="pokemon-container">
          <div className="pokemon-info">
            <h2>Datos</h2>
            <p>Altura: {pokemon.height / 10} m</p>
            <p>Peso: {pokemon.weight / 10} kg</p>
            <p>Tipos: {pokemon.types.join(", ")}</p>
            <div className="pokemon-moves">
              <h2>Movimientos</h2>
              <ul className="moves">
                {pokemon.moves.map((move) => (
                  <li key={move}>{capitalizeFirstLetter(move)}</li>
                ))}
              </ul>
            </div>
            <div className="pokemon-stats">
              <h2>Estadísticas</h2>
              <ul className="stats-list">
                {pokemon.stats.map((stat) => (
                  <li key={stat.stat.name}>
                    {capitalizeFirstLetter(stat.stat.name)}: {stat.base_stat}
                  </li>
                ))}
              </ul>
            </div>
            <div className="pokemon-description">
              <h2>Descripción</h2>
              <p>{pokemon.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pokemon;
