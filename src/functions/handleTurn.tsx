import { BattleData, CharacterData, EnemyData } from "@/types";
import handleAttack from "./handleAttack";
import { animationData } from "@/templates/animations";

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

  const enemyAction = "melee";

  const getAnimation = (attackName: string) =>
    animationData.find((data) => data.attackName === attackName) || {
      attackDuration: 0,
      attackDelay: 0,
    };

  const animationA = getAnimation(action);
  const animationB = getAnimation(enemyAction);

  const delayA = animationA.attackDuration + animationA.attackDelay;
  const delayB = animationB.attackDuration + animationB.attackDelay;

  setBattleData({ ...battleData, waiting: true });

  const performAttack = (attacker: CharacterData, defender: CharacterData, attackType: string, attackerPosition?: string) => {
    handleAttack(attackType, attacker, defender, battleCharacters, setBattleCharacters, attackerPosition);
  };

  const scheduleAttack = (attacker: CharacterData, defender: CharacterData, attackType: string, delay: number, attackerPosition?: string) => {
    setTimeout(() => {
      performAttack(attacker, defender, attackType, attackerPosition);
    }, delay);
  };

  scheduleAttack(attacker, defender, attacker === characters[0] ? action : enemyAction, 100, attacker === characters[0] ? "left" : "right");

  if (action === "switch") {
    battleCharacters[0] = party[Number(value)];
    setBattleCharacters(battleCharacters);
  }

  setBattleData((prev: any) => ({ ...prev, progress: attacker === characters[0] ? [0, prev.progress[1]] : [prev.progress[0], 0], waiting: true }));
};

export default handleTurn;
