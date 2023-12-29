import { EnemyData } from "@/types";

const templateEnemies: EnemyData[] = [
  {
    data: {
      id: 1,
      name: "Subzero",
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
];
export default templateEnemies;
