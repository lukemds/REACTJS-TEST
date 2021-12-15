import { useNavigate } from "react-router-dom";
import styled, { ThemeProvider, keyframes } from "styled-components";
import { usePokemonStorage } from "../../context/PokemonsStorage";
import { firstLetterToUpperCase } from "../../handlers/firstLetterToUpperCase";
import { themeSelector } from "../../handlers/themesSelector";

export default function Card({ pokemon }) {
  const navigate = useNavigate();
  const { setPokemonInfo } = usePokemonStorage();

  const pokemonInfoHandle = () => {
    setPokemonInfo(pokemon);
    navigate(`/${pokemon.id}`);
  };

  return (
    <ThemeProvider theme={themeSelector(pokemon.types[0].type.name)}>
      <Container onClick={() => pokemonInfoHandle()}>
        <Background>
          {pokemon.id}
          <img alt="" src={pokemon.sprites.front_default} />
        </Background>
        <Name>
          {firstLetterToUpperCase(pokemon.name)}
        </Name>
      </Container>
    </ThemeProvider>
  );
}

const Animation = keyframes`
    0%, 100%{
      }
      50%{
        color:gold;
        border: 2px solid gold;
        background-color:gold;
    }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 5px;
  min-width: 120px;
  min-height: 100px;
  color: ${(props) => props.theme.body};
  border: solid 2px ${(props) => props.theme.body};
  border-radius: 10px;
  background-color: ${(props) => props.theme.body};
  box-shadow: 3px 3px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  &:hover {
    animation: ${Animation} 2s infinite;
  }
`;

const Background = styled.div`
  background-color: white;
  border-radius: 10px 10px 0 0;
  min-height: 77%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Name = styled.div`
  display: flex;
  color: white;
  justify-content: center;
  padding: 5px 0;
  width: 100%;
`;
