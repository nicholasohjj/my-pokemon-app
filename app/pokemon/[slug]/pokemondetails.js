// PokemonDetailsPage.js
import React from 'react';
import { useTeam } from './TeamContext';

const PokemonDetailsPage = ({ pokemon }) => {
  const { addToTeam, removeFromTeam } = useTeam();

  const handleAddToTeam = () => {
    addToTeam(pokemon);
  };

  const handleRemoveFromTeam = () => {
    removeFromTeam(pokemon.id);
  };

  return (
    <div>
      <h1>{pokemon.name}</h1>
      <button onClick={handleAddToTeam}>Add to Team</button>
      <button onClick={handleRemoveFromTeam}>Remove from Team</button>
    </div>
  );
};

export default PokemonDetailsPage;
