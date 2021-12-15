import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { usePokemonStorage, usePokemonURLs } from "../../context/";
import { orderByNameOrId } from "../../handlers/orderByNameOrId";
import Card from "../card";

export default function View() {
  const { pokemonsURLs } = usePokemonURLs();
  const {
    pokemonsStorage,
    setPokemonsStorage,
    filteredPokemon,
    isItSortByName,
  } = usePokemonStorage();
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(min + 20);

  const getPokemonInfo = () => {
    if (max < 700) {
      pokemonsURLs.slice(min, max).map((item) => {
        return axios.get(item.url).then((res) =>
          setPokemonsStorage((prev) => {
            orderByNameOrId(prev, isItSortByName);
            return [...prev, res.data];
          })
        );
      });
      setMax(max + 20);
    }

    setPokemonsStorage(
      pokemonsStorage.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      })
    );
  };

  useEffect(() => {
    if (pokemonsURLs && pokemonsStorage.length === min) {
      getPokemonInfo();
      //console.log(pokemonsURLs.slice(19,39));
    }
    if (pokemonsStorage) {
      setPokemonsStorage(prev=> {
        orderByNameOrId(prev, isItSortByName)
        return prev
      });
    }
  }, [pokemonsURLs, min, isItSortByName]);
  return (
    <>
      <Container>
        {filteredPokemon ? (
          <Card key={0} pokemon={filteredPokemon} />
        ) : (
          pokemonsStorage.map((item, key) => <Card key={key} pokemon={item} />)
        )}
      </Container>
      <Button
        onClick={() => {
          console.log(pokemonsStorage.length);
          setMin(min + 20);
        }}
      >
        Load More
      </Button>
    </>
  );
}
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 5px 0;
`;
const Button = styled.button`
  color: white;
  outline: none;
  border: none;
  width: 100%;
  padding: 10px;
  background-color: #78a6b5;
  cursor:pointer;
`;
