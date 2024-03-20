import handleHPColor from "@/functions/handleHpColor";
import { useBattleCharactersStore } from "@/stores/useBattleCharactersStore";
import { CharacterData } from "@/types";
import React from "react";

const BattleHUD = () => {
  const battleCharacters = useBattleCharactersStore((state: any) => state?.battleCharacters);

  return (
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
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default BattleHUD;
