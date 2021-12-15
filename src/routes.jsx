import { Route, Routes } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { usePokemonURLs } from "./context/PokemonsURLS";
import { Filter, View, PokemonInfo } from "./components/";
import styled from "styled-components";

export default function AppRoutes() {
  const { pokemonsURLs, setPokemonsURLs } = usePokemonURLs();

  useEffect(() => {
    if (!pokemonsURLs) {
      axios
        .get("https://pokeapi.co/api/v2/pokemon/?limit=700&offset=0")
        .then((res) => setPokemonsURLs(res.data.results));
    }
  }, [pokemonsURLs]);
  return (
    <Body>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Filter />
              <View />
            </>
          }
        />
        <Route
          path="/:id"
          element={
            <Body>
              <PokemonInfo />
            </Body>
          }
        />
      </Routes>
    </Body>
  );
}

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;
