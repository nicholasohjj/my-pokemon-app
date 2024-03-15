import Link from 'next/link'
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


export default async function Page() {
``
  const pokemons = await getPokemons();
  
  return (
    <>
      <Head>
        <title>Pokemon List</title>
      </Head>
      <div style= {styles.container}>
        {pokemons.map((pokemon) => (
          <div key={pokemon.name} style={styles.card}>
            <h2>{pokemon.name}</h2>
            {/* Extract the Pokemon ID using RegExp and template string in href */}
            <Link href={`/pokemon/${pokemon.url.match(/\/pokemon\/(\d+)\/$/)[1]}`}> View Details
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
