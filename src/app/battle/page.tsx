"use client";
import Character from "@/components/character";
import handleAttack from "@/hooks/attack";
import { useCallback, useEffect, useMemo, useState } from "react";

export type CharacterData = {
  data: {
    id: number;
    name: string;
    health: number;
    attack: number;
    defense: number;
    speed: number;
    sprite?: string;
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
          sprite:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
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
          sprite:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
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
        className="relative bg-gray-900 h-[75%] w-[75%] flex justify-around items-center"
      >
        {battleCharacters.map((character) => (
          <Character key={character.data.id} data={character.data} />
        ))}
        <div
          id="battle-actions"
          className="bg-red-500 w-full h-[20%] absolute bottom-0 flex justify-around items-center opacity-25 hover:opacity-90 transition-opacity duration-500 backdrop-filter backdrop-blur-sm hover:backdrop-blur-md"
        >
          <button
            id="attack"
            className="bg-gray-900 w-[10%] h-[50%] flex justify-center items-center "
            onClick={(e) =>
              handleAttack("melee", battleCharacters, setBattleCharacters)
            }
          >
            <p className="text-white">Attack</p>
          </button>
        </div>
      </div>
    </main>
  );
}
