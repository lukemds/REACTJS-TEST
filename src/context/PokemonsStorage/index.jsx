import React, { createContext, useContext, useState } from "react";

const PokemonsStorageContext = createContext();

export default function PokemonsStorageProvider({ children }) {
  const [pokemonsStorage, setPokemonsStorage] = useState([]);
  const [filteredPokemon, setfilteredPokemon] = useState();
  const [pokemonInfo, setPokemonInfo] = useState()
  const [isItSortByName, setisItSortByName] = useState(false)
  return (
    <PokemonsStorageContext.Provider
      value={{ pokemonsStorage, setPokemonsStorage, filteredPokemon, setfilteredPokemon, pokemonInfo, setPokemonInfo,isItSortByName, setisItSortByName}}
    >
      {children}
    </PokemonsStorageContext.Provider>
  );
}

export function usePokemonStorage() {
  const context = useContext(PokemonsStorageContext);
  const { pokemonsStorage, setPokemonsStorage, filteredPokemon, setfilteredPokemon, pokemonInfo, setPokemonInfo, isItSortByName, setisItSortByName } = context;
  return { pokemonsStorage, setPokemonsStorage, filteredPokemon, setfilteredPokemon, pokemonInfo, setPokemonInfo, isItSortByName, setisItSortByName };
}
