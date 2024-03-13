const getPokemons = async () => {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon')
  console.log(res)
  const data = await res.json()
  return data
}

export default async function Page() {

  const res = await getPokemons();
  
  return <h1>{JSON.stringify(res)}!</h1>
}