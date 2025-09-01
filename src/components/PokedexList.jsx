import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/PokedexList.css';

function PokedexList() {
  const [pokemons, setPokemons] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchNumber, setSearchNumber] = useState('');
  const [types, setTypes] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visiblePokemons, setVisiblePokemons] = useState(20); // Estado para controlar cuántos Pokémon se muestran

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0`);
        const pokemonList = response.data.results;

        const promises = pokemonList.map((pokemon) =>
          axios.get(pokemon.url).then((res) => ({
            id: res.data.id,
            name: res.data.name,
            image: res.data.sprites.other['official-artwork'].front_default,
            types: res.data.types.map((type) => type.type.name),
          }))
        );

        const detailedPokemons = await Promise.all(promises);
        setPokemons(detailedPokemons);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
        setLoading(false);
      }
    };

    const fetchTypes = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/type');
        setTypes(response.data.results.map((type) => type.name));
      } catch (error) {
        console.error('Error fetching Pokémon types:', error);
      }
    };

    fetchPokemonData();
    fetchTypes();
  }, []);

  const filteredPokemons = pokemons
    .filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((pokemon) =>
      selectedTypes.length === 0
        ? true
        : selectedTypes.every((type) => pokemon.types.includes(type))
    )
    .filter((pokemon) =>
      searchNumber ? pokemon.id.toString().includes(searchNumber) : true
    );

  const handleTypeSelect = (type) => {
    setSelectedTypes((prevSelectedTypes) => {
      if (prevSelectedTypes.includes(type)) {
        return prevSelectedTypes.filter((t) => t !== type);
      } else {
        return [...prevSelectedTypes, type];
      }
    });
  };

  const loadMorePokemons = () => {
    setVisiblePokemons((prevVisiblePokemons) => prevVisiblePokemons + 20); // Aumentar en 20 los Pokémon visibles
  };

  return (
    <div className="pokedex-list">
      <h1 className="pokedex-title">Pokedex</h1>

      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar Pokémon..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-bar"
        />
        <input
          type="number"
          placeholder="Nº Pokémon"
          value={searchNumber}
          onChange={(e) => setSearchNumber(e.target.value)}
          className="search-number-bar"
        />
      </div>

      <div className="filter-container">
        <button
          className={`type-filter-button ${selectedTypes.length === 0 ? 'selected' : ''}`}
          onClick={() => setSelectedTypes([])}
        >
          Todos
        </button>
        {types.map((type) => (
          <button
            key={type}
            className={`type-filter-button ${selectedTypes.includes(type) ? 'selected' : ''}`}
            onClick={() => handleTypeSelect(type)}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="pokemon-grid">
        {loading ? (
          <div>Cargando...</div>
        ) : (
          filteredPokemons.slice(0, visiblePokemons).map((pokemon) => ( // Mostrar solo los primeros `visiblePokemons`
            <Link to={`/pokemon/${pokemon.id}`} key={pokemon.id}>
              <div className="pokemon-card">
                <img src={pokemon.image} alt={pokemon.name} className="pokemon-photo" />
                <p className="pokemon-identificacion">#{pokemon.id}</p>
                <p className="pokemon-nombre">{pokemon.name}</p>
              </div>
            </Link>
          ))
        )}
      </div>

      {filteredPokemons.length > visiblePokemons && ( // Mostrar el botón solo si hay más Pokémon por cargar
      <div className='button-container'>
        <button onClick={loadMorePokemons} className="load-more-button">
          Ver más
        </button>
      </div>
      )}
    </div>
  );
}

export default PokedexList;


















