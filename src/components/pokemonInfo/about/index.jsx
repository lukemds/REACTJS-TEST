import styled from "styled-components";
import { firstLetterToUpperCase } from "../../../handlers/firstLetterToUpperCase";

export default function About({ pokemon }) {
  console.log("teste ", pokemon);
  return (
    <Container>
      <SubContainer>
        <div>Weight {pokemon.weight} kg</div>
        <div>Height {pokemon.height} m</div>
        <div>
          {pokemon.abilities.map((item, key) => (
            <p>{firstLetterToUpperCase(item.ability.name)}</p>
          ))}{" "}
          Moves
        </div>
      </SubContainer>
      <p>text</p>
      <div>Status</div>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  padding: 10px 0;
`;
const SubContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-around;
`;
