import { CharacterData } from "@/types";

const templateCharacters: CharacterData[] = [
  {
    data: {
      id: 1,
      name: "Saga",
      level: 1,
      health: 100,
      attack: 5,
      defense: 5,
      speed: 5,
      moves: [
        {
          name: "melee",
          level: 1,
        },
        {
          name: "throw_rock",
          level: 1,
        },
      ],
      sprite: {
        name: "Scorpion",
      },
    },
  },
  {
    data: {
      id: 2,
      name: "Saga 2",
      level: 1,
      health: 100,
      attack: 5,
      defense: 5,
      speed: 5,
      moves: [
        {
          name: "melee",
          level: 1,
        },
      ],
      sprite: {
        name: "Subzero",
      },
    },
  },
  {
    data: {
      id: 3,
      name: "Guts",
      level: 1,
      health: 100,
      attack: 5,
      defense: 5,
      speed: 5,
      moves: [
        {
          name: "melee",
          level: 1,
        },
      ],
      sprite: {
        name: "Guts",
      },
    },
  },
];
export default templateCharacters;
