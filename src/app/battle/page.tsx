"use client";
import Character from "@/components/character";
import handleAttack, { animationData } from "@/hooks/attack";
import { useCallback, useEffect, useMemo, useState } from "react";

type spriteData = {
  url?: string;
  flip?: boolean;
  width?: number;
  height?: number;
};

export type CharacterData = {
  data: {
    id: number;
    name: string;
    health: number;
    attack: number;
    defense: number;
    speed: number;
    sprite?: {
      state?: string;
      idle?: spriteData;
      attack?: spriteData;
      hit?: spriteData;
      death?: spriteData;
    };
    currentStats?: {
      health?: number;
      attack?: number;
      defense?: number;
      speed?: number;
    };
  };
};

export type BattleData = {
  timer?: number;
  turn?: number;
  attacker?: number;
  stage?: {
    background?: string;
  };
};

const handleTurn = (
  battleCharacters: CharacterData[],
  setBattleCharacters: (characters: CharacterData[]) => void,
  setBattleData: (data: BattleData) => void
) => {
  const characters = [...battleCharacters];
  let attacker = characters[0];
  let defender = characters[1];

  handleAttack("melee", attacker, defender, setBattleCharacters);

  const animation = animationData.find(
    (data) => data.attackName === "melee"
  ) || {
    attackDuration: 0,
    attackDelay: 0,
  };

  setTimeout(() => {
    let attacker = characters[1];
    let defender = characters[0];
    handleAttack("melee", attacker, defender, setBattleCharacters);
  }, 500 + animation?.attackDuration + animation?.attackDelay);
};

export default function Home() {
  const [battleCharacters, setBattleCharacters] = useState<CharacterData[]>([]);
  const [battleData, setBattleData] = useState<BattleData>({});

  const calculateCurrentStats = (characters: CharacterData[]) => {
    characters.forEach((character) => {
      character.data.currentStats = {
        health: character.data.health,
        attack: character.data.attack,
        defense: character.data.defense,
        speed: character.data.speed,
      };
    });
    setBattleCharacters(characters);
  };

  const loadCharacters = useCallback(() => {
    return [
      {
        data: {
          id: 1,
          name: "Scorpion",
          health: 39,
          attack: 52,
          defense: 43,
          speed: 65,
          width: 96,
          height: 96,
          sprite: {
            state: "idle",
            shouldFlip: true,
            idle: {
              url: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2a633598-5ed3-4ec1-b0f1-2231281343bf/de0t018-77e46de6-cf20-4295-8a38-a1622963c9a0.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzJhNjMzNTk4LTVlZDMtNGVjMS1iMGYxLTIyMzEyODEzNDNiZlwvZGUwdDAxOC03N2U0NmRlNi1jZjIwLTQyOTUtOGEzOC1hMTYyMjk2M2M5YTAucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.Og9CqG-t0VEeu8RJiMDADNa45pfA3rEzCuq0leSodpQ",
              flip: false,
            },
            attack: {
              url: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2a633598-5ed3-4ec1-b0f1-2231281343bf/de0t018-77e46de6-cf20-4295-8a38-a1622963c9a0.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzJhNjMzNTk4LTVlZDMtNGVjMS1iMGYxLTIyMzEyODEzNDNiZlwvZGUwdDAxOC03N2U0NmRlNi1jZjIwLTQyOTUtOGEzOC1hMTYyMjk2M2M5YTAucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.Og9CqG-t0VEeu8RJiMDADNa45pfA3rEzCuq0leSodpQ",
              flip: false,
            },

            hit: {
              url: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2a633598-5ed3-4ec1-b0f1-2231281343bf/de0t018-77e46de6-cf20-4295-8a38-a1622963c9a0.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzJhNjMzNTk4LTVlZDMtNGVjMS1iMGYxLTIyMzEyODEzNDNiZlwvZGUwdDAxOC03N2U0NmRlNi1jZjIwLTQyOTUtOGEzOC1hMTYyMjk2M2M5YTAucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.Og9CqG-t0VEeu8RJiMDADNa45pfA3rEzCuq0leSodpQ",
              flip: false,
            },
            death: {
              url: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2a633598-5ed3-4ec1-b0f1-2231281343bf/de0t018-77e46de6-cf20-4295-8a38-a1622963c9a0.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzJhNjMzNTk4LTVlZDMtNGVjMS1iMGYxLTIyMzEyODEzNDNiZlwvZGUwdDAxOC03N2U0NmRlNi1jZjIwLTQyOTUtOGEzOC1hMTYyMjk2M2M5YTAucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.Og9CqG-t0VEeu8RJiMDADNa45pfA3rEzCuq0leSodpQ",
              flip: false,
            },
          },
        },
      },
      {
        data: {
          id: 2,
          name: "Subzero",
          health: 44,
          attack: 48,
          defense: 65,
          speed: 43,
          sprite: {
            state: "idle",
            shouldFlip: true,
            idle: {
              url: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2a633598-5ed3-4ec1-b0f1-2231281343bf/d9o65e7-395aabda-8f13-44ff-9cad-31676da7e9c8.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzJhNjMzNTk4LTVlZDMtNGVjMS1iMGYxLTIyMzEyODEzNDNiZlwvZDlvNjVlNy0zOTVhYWJkYS04ZjEzLTQ0ZmYtOWNhZC0zMTY3NmRhN2U5YzgucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.qvpBLdc1n1SYs0SVAQjSRW5kNfgd538fThIE3gEbOLQ",
              flip: true,
            },
            attack: {
              url: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2a633598-5ed3-4ec1-b0f1-2231281343bf/d9o65e7-395aabda-8f13-44ff-9cad-31676da7e9c8.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzJhNjMzNTk4LTVlZDMtNGVjMS1iMGYxLTIyMzEyODEzNDNiZlwvZDlvNjVlNy0zOTVhYWJkYS04ZjEzLTQ0ZmYtOWNhZC0zMTY3NmRhN2U5YzgucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.qvpBLdc1n1SYs0SVAQjSRW5kNfgd538fThIE3gEbOLQ",
              flip: false,
            },
            hit: {
              url: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2a633598-5ed3-4ec1-b0f1-2231281343bf/d9o65e7-395aabda-8f13-44ff-9cad-31676da7e9c8.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzJhNjMzNTk4LTVlZDMtNGVjMS1iMGYxLTIyMzEyODEzNDNiZlwvZDlvNjVlNy0zOTVhYWJkYS04ZjEzLTQ0ZmYtOWNhZC0zMTY3NmRhN2U5YzgucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.qvpBLdc1n1SYs0SVAQjSRW5kNfgd538fThIE3gEbOLQ",
              flip: false,
            },
            death: {
              url: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2a633598-5ed3-4ec1-b0f1-2231281343bf/d9o65e7-395aabda-8f13-44ff-9cad-31676da7e9c8.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzJhNjMzNTk4LTVlZDMtNGVjMS1iMGYxLTIyMzEyODEzNDNiZlwvZDlvNjVlNy0zOTVhYWJkYS04ZjEzLTQ0ZmYtOWNhZC0zMTY3NmRhN2U5YzgucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.qvpBLdc1n1SYs0SVAQjSRW5kNfgd538fThIE3gEbOLQ",
              flip: false,
            },
          },
        },
      },
    ];
  }, []);

  const handleHPColor = (healthPercentage: number) => {
    if (healthPercentage > 50) {
      return "green";
    } else if (healthPercentage > 25) {
      return "yellow";
    } else {
      return "red";
    }
  };

  useEffect(() => {
    const characters = loadCharacters();
    setBattleCharacters(characters);
    calculateCurrentStats(characters);
  }, []);

  return (
    <main
      id="battle-page"
      className="flex flex-col justify-center items-center h-screen bg-black "
    >
      <div
        id="battle-screen"
        className="relative bg-gray-900 h-[75%] w-[75%] flex  overflow-hidden"
        style={{
          backgroundImage: `url(https://64.media.tumblr.com/03a31af62efcd3f59b81237c40e2f2c6/225a8a6ba496dec7-ec/s500x750/8c25533f4c7a21964c50abe94c8bb26350307f98.gif)`,
          backgroundSize: "cover",
          backgroundPosition: "bottom",
        }}
      >
        <div
          id="battle-hud"
          className="w-full h-[20%] absolute top-0 flex justify-between items-start gap-[10%]"
        >
          {battleCharacters.map((character, index) => {
            const healthPercentage = Math.max(
              Math.floor(
                ((character.data.currentStats?.health ?? 0) /
                  character.data.health) *
                  100
              ),
              0
            );
            return (
              <>
                <div
                  key={character.data.id}
                  className={`flex flex-col w-full ${
                    index === 0 ? "items-start" : "items-end"
                  }`}
                >
                  <div
                    className={`flex flex-col w-full h-6 bg-red-900 box-border
                    border-2 border-solid border-slate-500 rounded-md
                     transition-all duration-500 ${
                       index === 0 ? "items-start" : "items-end"
                     }`}
                  >
                    <div
                      className="w-full h-full bg-amber-500
                    transition-all duration-500"
                      style={{
                        width: `${healthPercentage}%`,
                        backgroundColor: handleHPColor(healthPercentage),
                      }}
                    />
                  </div>
                  <details className="text-white z-10">
                    <summary>{character.data.name}</summary>
                    <p>ATK: {character.data.currentStats?.attack}</p>
                    <p>DEF: {character.data.currentStats?.defense}</p>
                    <p>SPD: {character.data.currentStats?.speed}</p>
                  </details>
                </div>
                {index === 0 && <p className="text-white">VS</p>}
              </>
            );
          })}
        </div>
        <div
          id="battle-characters"
          className="relative w-full h-full flex justify-between items-end px-[15%] py-[5%]"
        >
          {battleCharacters.map((character, index) => (
            <Character
              key={character.data.id}
              data={character.data}
              position={index === 0 ? "left" : "right"}
            />
          ))}
        </div>
      </div>
      <div
        id="battle-actions"
        className="bg-red-500 w-[10%] h-full absolute right-0 flex flex-col justify-center gap-2 px-2 items-center opacity-25 hover:opacity-90 transition-opacity duration-500 backdrop-filter backdrop-blur-sm hover:backdrop-blur-md
          "
      >
        <button
          id="attack"
          className="bg-gray-900 w-full h-auto flex justify-center items-center"
          onClick={(e) =>
            handleTurn(battleCharacters, setBattleCharacters, setBattleData)
          }
        >
          <p className="text-white">Attack</p>
        </button>
      </div>
    </main>
  );
}
