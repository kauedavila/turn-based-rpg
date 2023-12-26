"use client";
import Character from "@/components/character";
import handleAttack, { animationData } from "@/functions/attack";
import templateCharacters from "@/templates/characters";
import { BattleData, CharacterData } from "@/types";
import { useCallback, useEffect, useMemo, useState } from "react";

const handleTurn = (
  action: string,
  battleCharacters: CharacterData[],
  setBattleCharacters: (characters: CharacterData[]) => void,
  battleData: BattleData,
  setBattleData: (data: BattleData) => void
) => {
  const characters = [...battleCharacters];
  const interval = 1000;

  let speedPriority = battleCharacters.sort(
    (a, b) => b.data.currentStats?.speed - a.data.currentStats?.speed
  );

  let animation = animationData.find((data) => data.attackName === action) || {
    attackDuration: 0,
    attackDelay: 0,
  };

  let delay = animation?.attackDuration + animation?.attackDelay;
  let attacker = speedPriority[0];
  let defender = speedPriority[1];

  handleAttack(action, attacker, defender, setBattleCharacters);

  setTimeout(() => {
    let attacker = speedPriority[1];
    let defender = speedPriority[0];
    handleAttack("melee", attacker, defender, setBattleCharacters);
  }, delay);

  setTimeout(() => {
    setBattleData({
      ...battleData,
      turn: battleData.turn && battleData.turn + 1,
    });
  }, delay * 2);
};

export default function Home() {
  const [battleCharacters, setBattleCharacters] = useState<CharacterData[]>([]);
  const [battleData, setBattleData] = useState<BattleData>({
    timer: 0,
    turn: 1,
  });

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
    return templateCharacters;
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
                {index === 0 && (
                  <p className="text-white w-40">Turn {battleData.turn}</p>
                )}
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
        {battleCharacters[0]?.data.moves?.map((move) => (
          <button
            key={move.name}
            className="w-full h-8 bg-gray-900 text-white rounded-md"
            onClick={() => {
              handleTurn(
                move.name ?? "melee",
                battleCharacters,
                setBattleCharacters,
                battleData,
                setBattleData
              );
            }}
          >
            <p className="first-letter:uppercase text-center">{move.name}</p>
          </button>
        ))}
      </div>
    </main>
  );
}
