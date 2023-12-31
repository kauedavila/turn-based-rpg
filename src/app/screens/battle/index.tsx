"use client";
import Character from "@/components/character";
import handleTurn from "@/functions/handleTurn";
import { useBattleCharacters } from "@/stores/battleCharacters";
import { useScreen } from "@/stores/screen";
import { useParty } from "@/stores/useParty";
import { BattleData, CharacterData } from "@/types";
import React, { useEffect, useState } from "react";

export default function Battle({}: {}) {
  const battleCharacters = useBattleCharacters(
    (state: any) => state?.battleCharacters
  );
  const setBattleCharacters = useBattleCharacters(
    (state: any) => state?.setBattleCharacters
  );

  const party = useParty((state: any) => state?.party);
  const setScreen = useScreen((state: any) => state?.setScreen);

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

  const handleFlee = () => {
    confirm("Are you sure you want to flee?") === true &&
      (party.forEach((character: CharacterData) => {
        character.data.currentStats = undefined;
      }),
      battleCharacters.forEach((character: CharacterData) => {
        character.data.currentStats = undefined;
      }),
      setScreen("menu"),
      setBattleCharacters(battleCharacters));
  };

  useEffect(() => {
    battleCharacters.forEach((character: CharacterData) => {
      character.data.currentStats === undefined && calculateCurrentStats();
    });
  }, [battleCharacters]);

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
            const healthPercentage =
              Math.max(
                Math.floor(
                  ((character.data.currentStats?.health ?? 0) /
                    character.data.health) *
                    100
                ),
                0
              ) || 100;
            return (
              <React.Fragment key={index}>
                <div
                  key={index}
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
              </React.Fragment>
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
              key={index}
              data={character.data}
              position={index === 0 ? "left" : "right"}
            />
          ))}
      </div>
      {battleData.waiting ? null : (
        <div
          id="battle-actions"
          className="flex flex-col absolute left-0 bottom-0 border-2 rounded-tr-md border-black"
        >
          <details
            className="text-left bg-gray-900 text-white  
              hover:bg-gray-700 transition-all duration-300 cursor-pointer"
          >
            <summary className="px-10 py-2 border border-black">Attack</summary>
            <div
              className="grid grid-cols-2"
              style={{
                gridTemplateColumns:
                  battleCharacters[0]?.data.moves?.length > 1
                    ? "1fr 1fr"
                    : "1fr",
              }}
            >
              {battleCharacters[0]?.data.moves?.map((move: any) => (
                <button
                  key={move.name}
                  className=" text-left bg-gray-800 text-white border border-black px-10 py-2 first-letter:capitalize
              hover:bg-gray-700 transition-all duration-300
              "
                  onClick={() => {
                    handleTurn(
                      "attack",
                      move.name ?? "melee",
                      battleCharacters,
                      setBattleCharacters,
                      battleData,
                      setBattleData,
                      party
                    );
                  }}
                >
                  {move.name.replace("_", " ")}
                </button>
              ))}
            </div>
          </details>
          {party.length > 1 && (
            <details
              className="text-left bg-gray-900 text-white  
              hover:bg-gray-700 transition-all duration-300 cursor-pointer"
            >
              <summary className="px-10 py-2 border border-black">
                Switch
              </summary>
              <div className="flex">
                {party?.map((character: CharacterData, index: number) => (
                  <button
                    key={index}
                    className="w-full relative text-left bg-red-900 text-white border border-black px-10 py-2 first-letter:capitalize
              hover:bg-gray-700 transition-all duration-300"
                    style={{
                      display:
                        character.data.id === battleCharacters[0]?.data.id
                          ? "none"
                          : "block",
                    }}
                    onClick={() => {
                      handleTurn(
                        "switch",
                        index.toString(),
                        battleCharacters,
                        setBattleCharacters,
                        battleData,
                        setBattleData,
                        party
                      );
                    }}
                  >
                    <p className="relative z-10">{character.data.name}</p>
                    <div
                      className="absolute bottom-0 left-0 w-full h-full"
                      style={{
                        backgroundColor: handleHPColor(
                          Math.max(
                            Math.floor(
                              ((character.data.currentStats?.health ?? 0) /
                                character.data.health) *
                                100
                            ),
                            0
                          ) || 100
                        ),
                        width: `${
                          Math.max(
                            Math.floor(
                              ((character.data.currentStats?.health ?? 0) /
                                character.data.health) *
                                100
                            ),
                            0
                          ) || 100
                        }%`,
                      }}
                    ></div>
                  </button>
                ))}
              </div>
            </details>
          )}

          <button
            className="w-full h-auto text-left bg-gray-900 text-white border border-black px-10 py-2 first-letter:capitalize
              hover:bg-gray-700 transition-all duration-300"
            onClick={handleFlee}
          >
            Flee
          </button>
        </div>
      )}
    </div>
  );
}
