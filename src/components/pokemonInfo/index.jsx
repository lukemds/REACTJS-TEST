import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import { usePokemonStorage } from "../../context/";
import { firstLetterToUpperCase } from "../../handlers/firstLetterToUpperCase";
import { themeSelector } from "../../handlers/themesSelector";
import { TransparentButton } from "../../styled-components/button";
import { PokeballBackground } from "../../svgs/";
import About from "./about";

export default function PokemonInfo() {
  const navigate = useNavigate()
  const { id } = useParams();
  const { pokemonInfo, setPokemonInfo } = usePokemonStorage();
  useEffect(() => {
    !pokemonInfo &&
      axios
        .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then((res) => setPokemonInfo(res.data));
  }, [pokemonInfo]);

  return pokemonInfo ? (
    <ThemeProvider theme={themeSelector(pokemonInfo.types[0].type.name)}>
      <MainContainer>
        <InitialInfo>
          <div>
            <TransparentButton onClick={()=>navigate('/')}>{"<-"}</TransparentButton>
            {pokemonInfo.name}
          </div>
          <div></div>
          <div>#0{pokemonInfo.id}</div>
        </InitialInfo>
        <InfoContainer>
          <TypeBox>
            {pokemonInfo.types.map((item, key) => (
              <ThemeProvider key={key} theme={themeSelector(item.type.name)}>
                <Type>{firstLetterToUpperCase(item.type.name)}</Type>
              </ThemeProvider>
            ))}
          </TypeBox>

          <Title>About</Title>
          <About pokemon={pokemonInfo} />
        </InfoContainer>
      </MainContainer>
      <Img width={250} src={pokemonInfo.sprites.front_default} />
      <PokeballBackground style={{ position: "absolute" }} />
    </ThemeProvider>
  ) : (
    ""
  );
}

const Title = styled.div`
  color: ${(props) => props.theme.body};
  padding: 10px;
`;

const TypeBox = styled.div`
  display: flex;
`;

const Type = styled.div`
  color: white;
  padding: 5px;
  border-radius: 30px;
  background-color: ${(props) => props.theme.body};
`;

const InitialInfo = styled.div`
  display: flex;
  color: white;
  justify-content: space-around;
  width: 100%;
  padding: 10px 0px;
`;
const Img = styled.img`
  position: absolute;
  z-index: 1;
`;

const MainContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  background-color: ${(props) => props.theme.body};
  width: 100%;
  height: 100%;
`;
const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 10px;
  width: 95%;
  height: 75%;
  margin: 50px;
`;
