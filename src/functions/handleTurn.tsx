import { BattleData, CharacterData, EnemyData } from "@/types";
import handleAttack from "./handleAttack";

const handleTurn = (
  action: string,
  value: string,
  battleCharacters: CharacterData[],
  setBattleCharacters: (characters: CharacterData[]) => void,
  battleData: BattleData,
  setBattleData: (data: any) => void,
  party: CharacterData[],
  attacker: CharacterData,
  defender: any
) => {
  if (battleData.waiting) return;

  const characters = [...battleCharacters];

  if (action == "attack") {
    action = value;
  }

  const attackerType = characters.includes(attacker) ? "character" : "enemy";

  const enemyAction = "melee";

  const performAttack = (attacker: CharacterData, defender: CharacterData, attackType: string) => {
    handleAttack(attackType, attacker, defender);
  };

  const scheduleAttack = (attacker: CharacterData, defender: CharacterData, attackType: string, delay: number) => {
    setTimeout(() => {
      performAttack(attacker, defender, attackType);
    }, delay);
  };

  scheduleAttack(attacker, defender, attackerType === "character" ? action : enemyAction, 100);

  //Reset progress of attacker
  if (attackerType === "character") {
    const attackerIndex = battleCharacters.findIndex((character: any) => character.name === attacker.name);
    characters[attackerIndex].currentStats.progress = 0;
  }
  setBattleData((prev: any) => ({ ...prev, waiting: true, turn: null }));
};

export default handleTurn;
