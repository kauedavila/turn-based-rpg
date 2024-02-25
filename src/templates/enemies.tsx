import { EnemyData } from "@/types";

const templateEnemies: EnemyData[] = [
  {
    data: {
      id: 1,
      name: "Subzero",
      level: 1,
      experience: 0,
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
