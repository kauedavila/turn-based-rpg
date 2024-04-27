import handleHPColor from "@/functions/handleHpColor";
import { useBattleCharactersStore } from "@/stores/useBattleCharactersStore";
import { useBattleEnemiesStore } from "@/stores/useBattleEnemiesStore";
import { CharacterData, EnemyData } from "@/types";
import React from "react";

const BattleHUD = () => {
  const battleCharacters = useBattleCharactersStore((state: any) => state?.battleCharacters);
  const battleEnemies = useBattleEnemiesStore((state: any) => state?.battleEnemies);

  return (
    <div id="battle-hud" className="w-full h-[20%] absolute top-0 flex  justify-between items-start gap-[10%] py-4 px-8">
      <div id="battle-characters-health" className="flex flex-col w-full h-full justify-between items-start gap-2">
        {battleCharacters?.map((character: CharacterData, index: number) => {
          const healthPercentage = character.currentStats ? Math.max(Math.floor(((character.currentStats?.health ?? 0) / character.health) * 100), 0) : 100;
          return (
            <React.Fragment key={index}>
              <div key={index} className={`flex flex-col w-full `}>
                <div
                  className={`relative flex flex-col justify-center w-full h-10 bg-red-900 box-border
                    border-2 border-solid border-slate-500 rounded-md
                     transition-all duration-500 `}
                >
                  <p className="text-white z-20 p-4 ">{character.name}</p>
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
              </div>
            </React.Fragment>
          );
        })}
      </div>
      <div id="battle-characters-health" className="flex flex-col w-full h-full justify-between items-start gap-2">
        {battleEnemies?.map((enemy: EnemyData, index: number) => {
          const healthPercentage = enemy.currentStats ? Math.max(Math.floor(((enemy.currentStats?.health ?? 0) / enemy.health) * 100), 0) : 100;
          return (
            <React.Fragment key={index}>
              <div key={index} className={`flex flex-col w-full `}>
                <div
                  className={`relative flex flex-col justify-center w-full h-10 bg-red-900 box-border
                    border-2 border-solid border-slate-500 rounded-md
                     transition-all duration-500 `}
                >
                  <p className="text-white z-20 p-4 ">{enemy.name}</p>
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
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default BattleHUD;
