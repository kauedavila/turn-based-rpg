"use client";
import Character from "@/components/character";
import handleTurn from "@/functions/handleTurn";
import { useBattleCharacters } from "@/stores/battleCharacters";
import { BattleData, CharacterData } from "@/types";
import { useEffect, useState } from "react";

export default function Battle({}: {}) {
  const battleCharacters = useBattleCharacters(
    (state: any) => state?.battleCharacters
  );
  const setBattleCharacters = useBattleCharacters(
    (state: any) => state?.setBattleCharacters
  );
  const [battleData, setBattleData] = useState<BattleData>({
    timer: 0,
    turn: 1,
  });

  const calculateCurrentStats = () => {
    battleCharacters?.forEach((character: CharacterData) => {
      character.data.currentStats = {
        health: character.data.health,
        attack: character.data.attack,
        defense: character.data.defense,
        speed: character.data.speed,
      };
    });
  };

  const handleHPColor = (healthPercentage: number) => {
    if (healthPercentage > 50) {
      return "green";
    } else if (healthPercentage > 25) {
      return "#f5c71a";
    } else {
      return "#eb244b";
    }
  };

  useEffect(() => {
    calculateCurrentStats();
  }, []);

  return (
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
        {battleCharacters.length > 0 &&
          battleCharacters?.map((character: CharacterData, index: number) => {
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
                    className={`relative flex flex-col w-full h-6 bg-red-900 box-border
                    border-2 border-solid border-slate-500 rounded-md
                     transition-all duration-500 ${
                       index === 0 ? "items-start" : "items-end"
                     }`}
                  >
                    <div
                      className={`absolute w-full h-full transition-all duration-500 z-10 ${
                        healthPercentage > 10 ? "" : "animate-health-flash"
                      }`}
                      style={{
                        width: `${healthPercentage}%`,
                        backgroundColor: handleHPColor(healthPercentage),
                      }}
                    />
                    <div
                      className="absolute w-full h-full transition-all duration-1000"
                      style={{
                        width: `${healthPercentage}%`,
                        backgroundColor: "#dc143c",
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
        {battleCharacters.length > 0 &&
          battleCharacters?.map((character: CharacterData, index: number) => (
            <Character
              key={character.data.id}
              data={character.data}
              position={index === 0 ? "left" : "right"}
            />
          ))}
      </div>
      {battleData.waiting ? null : (
        <div
          id="battle-actions"
          className="bg-white w-fit h-fit absolute left-0 bottom-0 flex flex-col justify-center items-center border-4 rounded-md border-black"
        >
          <details
            className="w-full h-auto text-left bg-gray-900 text-white  
              hover:bg-gray-700 transition-all duration-300 cursor-pointer 
              "
          >
            <summary className="px-10 py-2 border border-black ">
              Attack
            </summary>
            {battleCharacters[0]?.data.moves?.map((move: any) => (
              <button
                key={move.name}
                className="h-auto text-left bg-gray-900 text-white border border-black px-10 py-2 first-letter:capitalize
              hover:bg-gray-700 transition-all duration-300
              "
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
                {move.name}
              </button>
            ))}
          </details>
        </div>
      )}
    </div>
  );
}
