"use client";
import useEnemy from "@/app/hooks/useEnemy";
import handleTurn from "@/functions/handleTurn";
import { useScreenStore } from "@/stores/useScreenStore";
import { usePartyStore } from "@/stores/usePartyStore";
import { useStagesStore } from "@/stores/useStageStore";
import { BattleData, CharacterData, ResultScreenProps } from "@/types";
import React, { useEffect, useState } from "react";
import { useBattleCharactersStore } from "@/stores/useBattleCharactersStore";
import BattleActions from "@/components/battle/battleActions";
import ResultsScreen from "@/components/battle/resultsScreen";
import BattleHUD from "@/components/battle/battleHUD";
import BattleCharacters from "@/components/battle/battleCharacters";
import BattleTurnMetter from "@/components/battle/battleTurnMetter";
import { useCharactersMutation } from "@/app/hooks/useCharacters";
import { useBattleEnemiesStore } from "@/stores/useBattleEnemiesStore";
import BattleEnemies from "@/components/battle/battleEnemies";

export default function Battle({}: {}) {
  const battleCharacters = useBattleCharactersStore((state: any) => state?.battleCharacters);
  const setBattleCharacters = useBattleCharactersStore((state: any) => state?.setBattleCharacters);

  const battleEnemies = useBattleEnemiesStore((state: any) => state?.battleEnemies);
  const setBattleEnemies = useBattleEnemiesStore((state: any) => state?.setBattleEnemies);

  const stage = useStagesStore((state: any) => state?.stage);
  const { data: enemyCharacter } = useEnemy(stage?.enemyList[0]);

  const [resultScreen, setResultScreen] = useState<ResultScreenProps>({
    result: null,
    experience: 0,
  });

  const party = usePartyStore((state: any) => state?.party);
  const setScreen = useScreenStore((state: any) => state?.setScreen);

  const characterMutation = useCharactersMutation();

  const [turnResult, setTurnResult] = useState<string | null>(null);
  const [battleData, setBattleData] = useState<BattleData>({
    timer: 0,
    turn: null,
    waiting: true,
  });

  const [auto, setAuto] = useState<boolean>(false);

  const calculateExperience = (enemyLevel: CharacterData) => {
    const experience = enemyLevel;
    return experience;
  };

  const calculateCurrentStats = ({ index }: { index: number }) => {
    const character = battleCharacters;
    const enemies = battleEnemies;

    character.map((character: CharacterData) => {
      character.currentStats = {
        health: character.health,
        attack: character.attack,
        defense: character.defense,
        speed: character.speed,
        progress: 0,
      };
    });

    enemies.map((enemy: CharacterData) => {
      enemy.currentStats = {
        health: enemy.health,
        attack: enemy.attack,
        defense: enemy.defense,
        speed: enemy.speed,
      };
    });
  };

  useEffect(() => {
    battleCharacters?.forEach((character: CharacterData, index: number) => {
      character.currentStats === undefined && calculateCurrentStats({ index });
    });
  }, [battleCharacters]);

  useEffect(() => {
    if (enemyCharacter) {
      enemyCharacter.currentStats = undefined;
      setBattleCharacters(party);
      setBattleEnemies([enemyCharacter]);
    }
  }, [enemyCharacter, party]);

  useEffect(() => {
    if (turnResult === "player_dies") setScreen("gameover");
    else if (turnResult === "enemy_dies") {
      setBattleData((prev) => ({ ...prev, waiting: false }));

      const exp = calculateExperience(battleCharacters[1].level);
      party.forEach((character: CharacterData) => {
        characterMutation.mutate({ ...character, experience: Number(character.experience) + Number(exp) });
      });
      setResultScreen({ result: "win", experience: Number(exp) });
    }
  }, [turnResult]);

  useEffect(() => {
    const interval =
      battleCharacters.length > 0
        ? setInterval(() => {
            if (battleData.waiting === false) return;
            battleCharacters.map((character: any) => {
              if (character.currentStats.progress >= 100) {
                character.currentStats.progress = 100;
                setBattleData((prev) => ({ ...prev, waiting: false, turn: character.name }));
              } else {
                character.currentStats.progress += character.currentStats.speed;
              }
            });
          }, 500)
        : setInterval(() => {
            console.log("waiting for characters");
          }, 500);
    return () => clearInterval(interval);
  }, [battleData, battleCharacters]);

  return (
    <div
      id="battle-screen"
      className="relative bg-gray-900 w-full h-full flex overflow-hidden"
      style={{
        backgroundImage: `url(${process.env.NEXT_PUBLIC_API_URL}/${stage?.bg})`,
        backgroundSize: "cover",
        backgroundPosition: "bottom",
      }}
    >
      {battleCharacters?.length === 0 ? (
        <p className="text-white">loading characters</p>
      ) : (
        <>
          <BattleHUD />
          <BattleCharacters />
          <BattleEnemies />
          {battleData.waiting === true || auto === true ? null : <BattleActions variant="left" auto={auto} setAuto={setAuto} battleData={battleData} setBattleData={setBattleData} />}
          <BattleActions variant="right" auto={auto} setAuto={setAuto} battleData={battleData} setBattleData={setBattleData} />
          <BattleTurnMetter />
          {!resultScreen?.result ? null : <ResultsScreen result={resultScreen?.result} experience={resultScreen?.experience} />}
        </>
      )}
    </div>
  );
}
