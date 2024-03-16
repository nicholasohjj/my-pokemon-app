"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';

const styles = {
  card: {
    margin: '10px',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },

  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center' 
  },

  searchBar: {
    margin: '20px auto',
    padding: '10px',
    width: '50%',
    borderRadius: '5px',
    border: '1px solid #ccc',
  }
};

const getPokemons = async () => {
  try {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon');
    if (!res.ok) throw new Error('Failed to fetch');
    const data = await res.json();
    return data.results;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default function Page() {
  const [pokemons, setPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPokemons();
      setPokemons(data);
    };
    fetchData();
  }, []);

  const filteredPokemons = pokemons.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <Head>
        <title>Pokemon List</title>
      </Head>
      <input
        type="text"
        placeholder="Search Pokémon by name"
        style={styles.searchBar}
        value={searchTerm}
        onChange={handleSearch}
      />
      <div style={styles.container}>
        {filteredPokemons.map(pokemon => (
          <div key={pokemon.name} style={styles.card}>
            <h2>{pokemon.name}</h2>
            <Link href={`/pokemon/${pokemon.url.match(/\/pokemon\/(\d+)\/$/)[1]}`}>
              View Details
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
