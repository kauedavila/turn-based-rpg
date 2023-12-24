"use client";
import Character from "@/components/character";
import handleAttack from "@/hooks/attack";
import { useCallback, useEffect, useMemo, useState } from "react";

export type SpriteStates = "idle" | "attack" | "hit" | "death";

export type CharacterData = {
  data: {
    id: number;
    name: string;
    health: number;
    attack: number;
    defense: number;
    speed: number;
    sprite?: {
      state?: SpriteStates;
      idle?: string;
      attack?: string;
      hit?: string;
      death?: string;
      width?: number;
      height?: number;
    };
    currentStats?: {
      health?: number;
      attack?: number;
      defense?: number;
      speed?: number;
    };
  };
};

export default function Home() {
  const [battleCharacters, setBattleCharacters] = useState<CharacterData[]>([]);

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
          name: "Charmander",
          health: 39,
          attack: 52,
          defense: 43,
          speed: 65,
          width: 96,
          height: 96,
          sprite: {
            state: "idle",
            idle: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/25c93289-0576-4645-bc48-e828abec9740/dcyj4w4-bcc6eb71-43f9-474c-8c57-57095a7259de.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzI1YzkzMjg5LTA1NzYtNDY0NS1iYzQ4LWU4MjhhYmVjOTc0MFwvZGN5ajR3NC1iY2M2ZWI3MS00M2Y5LTQ3NGMtOGM1Ny01NzA5NWE3MjU5ZGUuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.2fz4bKNq_sl5RFZ8sgisXG6JiDiTO6cTvmw23sCNyik",
            attack: "https://pbs.twimg.com/media/EPabAgKX0AY0IS8.png",
            hit: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
            death:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
          },
        },
      },
      {
        data: {
          id: 2,
          name: "Squirtle",
          health: 44,
          attack: 48,
          defense: 65,
          speed: 43,
          sprite: {
            state: "idle",
            idle: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
            attack:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
            hit: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
            death:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
          },
        },
      },
    ];
  }, []);

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
        className="relative bg-gray-900 h-[75%] w-[75%] flex justify-around"
      >
        <div
          id="battle-characters"
          className="relative w-full h-full flex justify-around items-end pb-[15%]"
        >
          {battleCharacters.map((character) => (
            <Character key={character.data.id} data={character.data} />
          ))}
        </div>
        <div
          id="battle-actions"
          className="bg-red-500 w-full h-[20%] absolute bottom-0 flex justify-around items-center opacity-25 hover:opacity-90 transition-opacity duration-500 backdrop-filter backdrop-blur-sm hover:backdrop-blur-md"
        >
          <button
            id="attack"
            className="bg-gray-900 w-[10%] h-[50%] flex justify-center items-center "
            onClick={(e) =>
              handleAttack("jump", battleCharacters, setBattleCharacters)
            }
          >
            <p className="text-white">Attack</p>
          </button>
        </div>
      </div>
    </main>
  );
}
