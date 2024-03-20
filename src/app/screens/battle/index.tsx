"use client";
import useEnemy from "@/app/hooks/useEnemy";
import Character from "@/components/character";
import handleExp from "@/functions/handleExp";
import handleTurn from "@/functions/handleTurn";
import { useScreenStore } from "@/stores/useScreenStore";
import { usePartyStore } from "@/stores/usePartyStore";
import { useStagesStore } from "@/stores/useStageStore";
import { BattleData, CharacterData, ResultScreenProps } from "@/types";
import React, { useEffect, useState } from "react";
import { useBattleCharactersStore } from "@/stores/useBattleCharactersStore";
import useCharacters from "@/app/hooks/useCharacters";

export default function Battle({}: {}) {
  const characters = useCharacters().data;
  const battleCharacters = useBattleCharactersStore((state: any) => state?.battleCharacters);
  const setBattleCharacters = useBattleCharactersStore((state: any) => state?.setBattleCharacters);
  const stage = useStagesStore((state: any) => state?.stage);
  const enemyCharacter = useEnemy(stage?.enemyList[0])?.data;

  const [resultScreen, setResultScreen] = useState<ResultScreenProps>({
    result: null,
    experience: 0,
  });
  const party = usePartyStore((state: any) => state?.party);
  const setScreen = useScreenStore((state: any) => state?.setScreen);

  const [turnResult, setTurnResult] = useState<string | null>(null);
  const [battleData, setBattleData] = useState<BattleData>({
    timer: 0,
    turn: 1,
    progress: [0, 0],
    waiting: true,
  });

  const [auto, setAuto] = useState<boolean>(false);

  const calculateCurrentStats = ({ index }: { index: number }) => {
    const character = battleCharacters[index];

    character.currentStats = {
      health: character.health,
      attack: character.attack,
      defense: character.defense,
      speed: character.speed,
    };
  };

  const calculateExperience = (enemyLevel: CharacterData) => {
    const experience = enemyLevel;
    return experience;
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
        character.currentStats = undefined;
      }),
      battleCharacters?.forEach((character: CharacterData) => {
        character.currentStats = undefined;
      }),
      setScreen("menu"),
      setBattleCharacters(battleCharacters));
  };

  const handleToggleAuto = () => {
    setAuto(!auto);
    if (battleData.progress[0] >= 100) {
      handleTurn("attack", "melee", battleCharacters, setBattleCharacters, battleData, setBattleData, party, battleCharacters[0], battleCharacters[1]);
    }
  };

  useEffect(() => {
    battleCharacters?.forEach((character: CharacterData, index: number) => {
      character.currentStats === undefined && calculateCurrentStats({ index });
    });
  }, [battleCharacters]);

  useEffect(() => {
    if (enemyCharacter) {
      enemyCharacter.currentStats = undefined;
      setBattleCharacters([party[0], enemyCharacter]);
    }
  }, [enemyCharacter, party]);

  useEffect(() => {
    if (turnResult === "player_dies") setScreen("gameover");
    else if (turnResult === "enemy_dies") {
      setBattleData((prev) => ({ ...prev, waiting: false }));

      const exp = calculateExperience(battleCharacters[1].level);
      party.forEach((character: CharacterData) => {
        handleExp(Number(character.experience), Number(exp), character._id);
      });
      setResultScreen({ result: "win", experience: Number(exp) });
    }
  }, [turnResult]);

  useEffect(() => {
    const interval =
      battleCharacters.length == 2
        ? setInterval(() => {
            if (battleCharacters[1]?.currentStats?.health <= 0) {
              setTurnResult("enemy_dies");
            }
            const speed = battleCharacters.map((character: CharacterData) => Number(character.currentStats?.speed) ?? 0);
            battleData.waiting &&
              setBattleData((prev) => ({
                ...prev,
                progress: [prev.progress[0] + speed[0], prev.progress[1] + speed[1]],
                waiting: prev.progress[0] + speed[0] < 100 && prev.progress[1] + speed[1] < 100,
              }));

            battleData.progress[0] >= 100 &&
              auto === true &&
              handleTurn("attack", "melee", battleCharacters, setBattleCharacters, battleData, setBattleData, party, battleCharacters[0], battleCharacters[1]);

            battleData.progress[1] >= 100 && handleTurn("attack", "melee", battleCharacters, setBattleCharacters, battleData, setBattleData, party, battleCharacters[1], battleCharacters[0]);
          }, 500)
        : setInterval(() => {
            console.log("waiting for characters");
          }, 500);

    return () => clearInterval(interval);
  }, [battleData, battleCharacters]);

  return (
    <div
      id="battle-screen"
      className="relative bg-gray-900 h-[90%] w-[90%] flex overflow-hidden"
      style={{
        backgroundImage: `url(http://localhost:3000/${stage?.bg})`,
        backgroundSize: "cover",
        backgroundPosition: "bottom",
      }}
    >
      {battleCharacters?.length !== 2 ? (
        <p className="text-white">loading characters</p>
      ) : (
        <>
          <div id="battle-hud" className="w-full h-[20%] absolute top-0 flex justify-between items-start gap-[10%]">
            {battleCharacters?.map((character: CharacterData, index: number) => {
              const healthPercentage = character.currentStats ? Math.max(Math.floor(((character.currentStats?.health ?? 0) / character.health) * 100), 0) : 100;
              return (
                <React.Fragment key={index}>
                  <div key={index} className={`flex flex-col w-full ${index === 0 ? "items-start" : "items-end"}`}>
                    <div
                      className={`relative flex flex-col w-full h-6 bg-red-900 box-border
                    border-2 border-solid border-slate-500 rounded-md
                     transition-all duration-500 ${index === 0 ? "items-start" : "items-end"}`}
                    >
                      <div
                        className={`absolute w-full h-full transition-all duration-500 z-10 ${healthPercentage > 10 ? "" : "animate-health-flash"}`}
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
                    <p className="text-white z-10">{character.name}</p>
                  </div>
                  {index === 0 && <p className="text-white w-40">Turn {battleData.turn}</p>}
                </React.Fragment>
              );
            })}
          </div>
          <div id="battle-characters" className="relative w-full h-full flex justify-between items-end px-[15%] py-[5%]">
            {battleCharacters.length === 2 &&
              battleCharacters?.map((character: CharacterData, index: number) => (
                <Character key={index} id={character._id} name={character.name} sprite={character.sprite} position={index === 0 ? "left" : "right"} />
              ))}
          </div>
          {battleData.progress[0] < 100 || auto === true ? null : (
            <div id="battle-actions" className="flex flex-col absolute left-0 bottom-0 border-2 rounded-tr-md border-black">
              <details
                className="text-left bg-gray-900 text-white  
              hover:bg-gray-700 transition-all duration-300 cursor-pointer"
              >
                <summary className="px-10 py-2 border border-black">Attack</summary>
                <div
                  className="grid grid-cols-2"
                  style={{
                    gridTemplateColumns: battleCharacters[0]?.moves?.length > 1 ? "1fr 1fr" : "1fr",
                  }}
                >
                  {battleCharacters[0]?.moves?.map((move: any) => (
                    <button
                      key={move.name}
                      className=" text-left bg-gray-800 text-white border border-black px-10 py-2 first-letter:capitalize
              hover:bg-gray-700 transition-all duration-300
              "
                      onClick={() => {
                        handleTurn("attack", move.name ?? "melee", battleCharacters, setBattleCharacters, battleData, setBattleData, party, battleCharacters[0], battleCharacters[1]);
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
                  <summary className="px-10 py-2 border border-black">Switch</summary>
                  <div className="flex">
                    {party?.map((character: CharacterData, index: number) => (
                      <button
                        key={index}
                        className="w-full relative text-left bg-red-900 text-white border border-black px-10 py-2 first-letter:capitalize
              hover:bg-gray-700 transition-all duration-300"
                        style={{
                          display: character?._id === battleCharacters[0]?._id ? "none" : "block",
                        }}
                        onClick={() => {
                          handleTurn("switch", index.toString(), battleCharacters, setBattleCharacters, battleData, setBattleData, party, battleCharacters[0], battleCharacters[1]);
                        }}
                      >
                        <p className="relative z-10">{character?.name}</p>
                        <div
                          className="absolute bottom-0 left-0 w-full h-full"
                          style={{
                            backgroundColor: handleHPColor(Math.max(Math.floor(((character?.currentStats?.health ?? 0) / character?.health) * 100), 0) || 100),
                            width: `${Math.max(Math.floor(((character?.currentStats?.health ?? 0) / character?.health) * 100), 0) || 100}%`,
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
          <div className="flex flex-col absolute right-0 bottom-0 border-2 rounded-tl-md border-black">
            <button
              className={`w-full h-auto text-left bg-gray-${battleData.auto ? "500" : "900"} text-white border border-black px-10 py-2 first-letter:capitalize
              hover:bg-gray-700 transition-all duration-300`}
              onClick={() => handleToggleAuto()}
            >
              {auto ? "Stop" : "Auto"}
            </button>
          </div>

          <div className="absolute items-center flex bottom-8 left-[25%] w-[50%] h-2 bg-white rounded-full">
            {battleCharacters?.map((character: CharacterData, index: number) => {
              const spriteUrl = character?.sprite;
              return (
                <div
                  key={index}
                  id={`char-turn-metter-${index}`}
                  className={`absolute transition-all duration-300
               h-10  w-10 bg-black rounded-full`}
                  style={{
                    left: `${Math.min((battleData?.progress[index] / 100) * 95, 95)}%`,
                    backgroundImage: `url(http://localhost:3000/${spriteUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
              );
            })}
          </div>

          {!resultScreen?.result ? null : (
            <div className="absolute w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
              <div className="bg-gray-900 text-white p-10 rounded-md flex flex-col justify-center items-center gap-5 transition-all duration-500">
                <div>
                  <h1>Victory!</h1>
                  <p>You have earned {resultScreen?.experience} experience points</p>
                </div>
                <button onClick={() => setScreen("menu")}>Return to menu</button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
