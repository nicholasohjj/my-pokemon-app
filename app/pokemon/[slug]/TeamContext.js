"use client"
import React, { createContext, useState, useContext } from 'react';

const TeamContext = createContext();

export const useTeam = () => useContext(TeamContext);

export const TeamProvider = ({ children }) => {
  const [team, setTeam] = useState([]);

  const addToTeam = (pokemon) => {
    if (team.length < 6) {
      setTeam([...team, pokemon]);
    } else {
      console.log('Team is full');
    }
  };

  const removeFromTeam = (pokemonId) => {
    setTeam(team.filter(pokemon => pokemon.id !== pokemonId));
  };

  return (
    <TeamContext.Provider value={{ team, addToTeam, removeFromTeam }}>
      {children}
    </TeamContext.Provider>
  );
};
