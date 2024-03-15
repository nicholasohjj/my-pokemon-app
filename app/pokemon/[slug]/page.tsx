import Link from 'next/link'

const getPokemon = async (slug) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${slug}`);
  const data = await res.json();
  return {
    id: data.id,
    name: data.name,
    base_experience: data.base_experience,
    height: data.height,
    is_default: data.is_default,
    order: data.order,
    weight: data.weight,
    abilities: data.abilities.map(ability => ({
      is_hidden: ability.is_hidden,
      slot: ability.slot,
      ability: ability.ability.name 
    })),
    forms: data.forms.map(form => form.name),
    game_indices: data.game_indices,
    held_items: data.held_items,
    location_area_encounters: data.location_area_encounters,
    moves: data.moves,
    past_types: data.past_types,
    sprites: data.sprites,
    cries: data.cries, 
    species: data.species.name,
    stats: data.stats,
    types: data.types.map(type => type.type.name)
  };
};

export default async function Page({ params }) {
  const pokemon = await getPokemon(params.slug);

  const renderValue = (value) => {
    if (Array.isArray(value)) {
      return (
        <ul>
          {value.map((item, index) => (
            <li key={index}>{typeof item === 'object' ? item.ability || item.name : item}</li>
          ))}
        </ul>
      );
    } else if (typeof value === 'object') {
      return JSON.stringify(value, null, 2);
    } else {
      return value.toString();
    }
  };

  const spriteUrl = pokemon.sprites.front_default;

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <Link href="/" style={{ textDecoration: 'none', color: 'blue' }}>Back to Home</Link>
      </div>
      
      <h2 style={{ textAlign: 'center' }}>{pokemon.name.toUpperCase()}</h2>
      <div style={{ textAlign: 'center' }}>
        <img src={spriteUrl} alt={`Sprite of ${pokemon.name}`} />
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>Name</th>
            <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>Description</th>
            <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>Type</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(pokemon).map(([key, value]) => (
            <tr key={key}>
              <td style={{ border: '1px solid #dddddd', padding: '8px' }}>{key}</td>
              <td style={{ border: '1px solid #dddddd', padding: '8px' }}>{renderValue(value)}</td>
              <td style={{ border: '1px solid #dddddd', padding: '8px' }}>{typeof value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
