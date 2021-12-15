import React, { createContext, useContext, useState } from "react";

const PokemonsURLsContext = createContext();

export default function PokemonsURLsProvider({ children }) {
  const [pokemonsURLs, setPokemonsURLs] = useState();
  return (
    <PokemonsURLsContext.Provider value={{ pokemonsURLs, setPokemonsURLs }}>
      {children}
    </PokemonsURLsContext.Provider>
  );
}

export function usePokemonURLs() {
  const context = useContext(PokemonsURLsContext);
  const { pokemonsURLs, setPokemonsURLs } = context;
  return { pokemonsURLs, setPokemonsURLs };
}
