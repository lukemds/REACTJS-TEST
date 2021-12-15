import {
  Rock,
  Ghost,
  Steel,
  Water,
  Grass,
  Psychic,
  Ice,
  Dark,
  Fairy,
  Normal,
  Fighting,
  Flying,
  Poison,
  Ground,
  Bug,
  Fire,
  Electric,
  Dragon,
} from '../styled-components/themes'

export const themeSelector = (type) => {
  switch (type) {
    case 'Rock':
      return Rock
    case 'ghost':
      return Ghost
    case 'steel':
      return Steel
    case 'water':
      return Water
    case 'grass':
      return Grass
    case 'psychic':
      return Psychic
    case 'ice':
      return Ice
    case 'dark':
      return Dark
    case 'fairy':
      return Fairy
    case 'normal':
      return Normal
    case 'fighting':
      return Fighting
    case 'flying':
      return Flying
    case 'poison':
      return Poison
    case 'ground':
      return Ground
    case 'bug':
      return Bug
    case 'fire':
      return Fire
    case 'electric':
      return Electric
    case 'dragon':
      return Dragon
    default:
      return Normal
  }
}
