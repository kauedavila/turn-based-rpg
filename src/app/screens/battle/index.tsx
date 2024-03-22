"use client";
import useEnemy from "@/app/hooks/useEnemy";
import handleExp, { calculateExperience } from "@/functions/handleExp";
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

export default function Battle({}: {}) {
  const battleCharacters = useBattleCharactersStore((state: any) => state?.battleCharacters);
  const setBattleCharacters = useBattleCharactersStore((state: any) => state?.setBattleCharacters);
  const stage = useStagesStore((state: any) => state?.stage);
  const { data: enemyCharacter } = useEnemy(stage?.enemyList[0]);

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
        backgroundImage: `url(${process.env.NEXT_PUBLIC_API_URL}/${stage?.bg})`,
        backgroundSize: "cover",
        backgroundPosition: "bottom",
      }}
    >
      {battleCharacters?.length !== 2 ? (
        <p className="text-white">loading characters</p>
      ) : (
        <>
          <BattleHUD />
          <BattleCharacters />
          {battleData.progress[0] < 100 || auto === true ? null : <BattleActions variant="left" auto={auto} setAuto={setAuto} battleData={battleData} setBattleData={setBattleData} />}
          <BattleActions variant="right" auto={auto} setAuto={setAuto} battleData={battleData} setBattleData={setBattleData} />
          <BattleTurnMetter battleData={battleData} />
          {!resultScreen?.result ? null : <ResultsScreen result={resultScreen?.result} experience={resultScreen?.experience} />}
        </>
      )}
    </div>
  );
}
