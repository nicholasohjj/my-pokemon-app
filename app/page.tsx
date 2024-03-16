"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';

const styles = {
  card: {
    margin: '10px',
    padding: '20px',
    border: '1px solid #e1e1e1',
    borderRadius: '10px',
    backgroundColor: '#fff',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    width: '200px',
    color: '#333', // Change the text color to a contrasting color
  },

  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: '20px',
  },

  searchBar: {
    margin: '20px auto',
    padding: '10px 20px',
    width: '50%',
    borderRadius: '20px',
    border: '1px solid #ccc',
    fontSize: '16px',
    textAlign: 'center',
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
            <Link style={{ color: '#0070f3', textDecoration: 'none' }} href={`/pokemon/${pokemon.url.match(/\/pokemon\/(\d+)\/$/)[1]}`}>
              View Details
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
