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
      ],
      sprite: {
        name: "Scorpion",
      },
    },
  },
];
export default templateCharacters;
