import axios from "axios";
import styled from "styled-components";
import { usePokemonStorage } from "../../context/PokemonsStorage";
import { usePokemonURLs } from "../../context/PokemonsURLS";
import { ReactComponent as Pokeball } from "../../svgs/pokeball.svg";
import { ReactComponent as ArrowDown } from "../../svgs/arrowdown.svg";

export default function Filter() {
  const {
    pokemonsStorage,
    setfilteredPokemon,
    setisItSortByName,
    isItSortByName,
  } = usePokemonStorage();
  const { pokemonsURLs } = usePokemonURLs();

  const searchPokemon = (event) => {
    event.preventDefault();
    let pokemonToSearch = event.target.pokemon.value;

    let hasPokekonInStorage = pokemonsStorage.find(
      (item) => item.name === pokemonToSearch
    );

    hasPokekonInStorage && setfilteredPokemon(hasPokekonInStorage);

    if (hasPokekonInStorage === undefined) {
      hasPokekonInStorage = pokemonsURLs.find(
        (item) => pokemonToSearch === item.name
      );

      if (hasPokekonInStorage) {
        axios
          .get(hasPokekonInStorage.url)
          .then((res) => setfilteredPokemon(res.data));
      } else {
        //message antd ---------------
        console.log("pokemon nao encontrado");
      }
    }
  };
  const reset = (event) => {
    !event && setfilteredPokemon();
  };

  return (
    <Container>
      <HeaderContainer>
        <LogoContainer>
          <Pokeball style={{ marginRight: "20px" }} height={25} width={25} />
          Pokédex
        </LogoContainer>
        <Button onClick={() => setisItSortByName(!isItSortByName)}>
          {isItSortByName ? (
            <>
              #
              <ArrowDown />
            </>
          ) : (
            <>
              Az
              <ArrowDown />
            </>
          )}
        </Button>
      </HeaderContainer>
      <Form
        style={{ width: "100%" }}
        onSubmit={(event) => searchPokemon(event)}
      >
        <Input name="pokemon" onChange={(event) => reset(event.target.value)} />
      </Form>
    </Container>
  );
}

const Button = styled.div`
  outline:none;
  border:none;
  cursor:pointer;
`

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 5px 15px;
`;

const HeaderContainer = styled.div`
  display: flex;
  font-family: Poppins, sans-serif;
  font-size: 24px;
  width: 100%;
  padding: 5px;
  justify-content: space-between;
`;
const Form = styled.form`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Input = styled.input`
  border-radius: 15px;
  outline: none;
  border: 1px solid rgba(0, 0, 0, 0.5);
  padding: 5px;
  width: 96%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
