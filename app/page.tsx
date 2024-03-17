"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import styled from 'styled-components';

const theme = {
  colors: {
    primary: '#0070f3',
    background: '#fff',
    text: '#333',
    linkHover: '#0056b3',
    border: '#e1e1e1',
    shadow: 'rgba(0, 0, 0, 0.1)',
  },
  spacing: {
    small: '10px',
    medium: '20px',
    large: '30px',
  },
  fontSizes: {
    base: '16px',
    large: '18px',
  },
  breakpoints: {
    mobile: '320px',
    tablet: '768px',
    desktop: '1024px',
  },
};

const Card = styled.div`
  margin: ${theme.spacing.small};
  padding: ${theme.spacing.medium};
  border: 1px solid ${theme.colors.border};
  border-radius: 10px;
  background-color: ${theme.colors.background};
  box-shadow: 0px 2px 4px ${theme.colors.shadow};
  text-align: center;
  width: 200px;
  color: ${theme.colors.text};

  h2 {
    margin: 0;
    padding: 0;
    font-size: ${theme.fontSizes.large};
  }

  a {
    color: ${theme.colors.primary};
    text-decoration: none;

    &:hover {
      color: ${theme.colors.linkHover};
    }
  }
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: ${theme.spacing.medium};
`;

const SearchBar = styled.input`
  display: block;
  margin: ${theme.spacing.large} auto;
  padding: ${theme.spacing.small} ${theme.spacing.medium};
  width: 50%;
  border-radius: 20px;
  border: 1px solid ${theme.colors.border};
  font-size: ${theme.fontSizes.base};
  text-align: center;

  @media (max-width: ${theme.breakpoints.tablet}) {
    width: 70%;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 90%;
  }
`;

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
      <SearchBar
        type="text"
        placeholder="Search Pokémon by name"
        value={searchTerm}
        onChange={handleSearch}
        
      />
      <Container>
        {filteredPokemons.map(pokemon => (
          <Card key={pokemon.name}>
            <h2>{pokemon.name}</h2>
            <Link href={`/pokemon/${pokemon.url.match(/\/pokemon\/(\d+)\/$/)[1]}`}>
              View Details
            </Link>
          </Card>
        ))}
      </Container>
    </>
  );
}
