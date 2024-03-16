import React from 'react';
import { useTeam } from './TeamContext';

const FloatingNavbar = () => {
  const { team } = useTeam();

  return (
    <div style={{ position: 'fixed', top: 0, right: 0, backgroundColor: 'white', padding: '10px' }}>
      <h2>Team</h2>
      <ul>
        {team.map(pokemon => (
          <li key={pokemon.id}>{pokemon.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default FloatingNavbar;
