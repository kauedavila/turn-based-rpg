import { BattleData, CharacterData } from "@/types";
import handleAttack, { animationData } from "./handleAttack";

const handleTurn = (
  action: string,
  battleCharacters: CharacterData[],
  setBattleCharacters: (characters: CharacterData[]) => void,
  battleData: BattleData,
  setBattleData: (data: BattleData) => void
) => {
  if (battleData.waiting) return;

  const characters = [...battleCharacters];
  const speedPriority = battleCharacters
    .filter((character) => character.data.currentStats !== undefined)
    .sort(
      (a, b) =>
        (b.data.currentStats?.speed ?? 0) - (a.data.currentStats?.speed ?? 0)
    );

  const enemyAction = "melee";

  const getAnimation = (attackName: string) =>
    animationData.find((data) => data.attackName === attackName) || {
      attackDuration: 0,
      attackDelay: 0,
    };

  const animationA = getAnimation(action);
  const animationB = getAnimation(enemyAction);

  const delayA = 500 + animationA.attackDuration + animationA.attackDelay;
  const delayB = 500 + animationB.attackDuration + animationB.attackDelay;

  setBattleData({ ...battleData, waiting: true });

  const performAttack = (
    attacker: CharacterData,
    defender: CharacterData,
    attackType: string
  ) => {
    handleAttack(
      attackType,
      attacker,
      defender,
      battleCharacters,
      setBattleCharacters
    );
  };

  const scheduleAttack = (
    attacker: CharacterData,
    defender: CharacterData,
    attackType: string,
    delay: number
  ) => {
    setTimeout(() => {
      performAttack(attacker, defender, attackType);
    }, delay);
  };

  scheduleAttack(
    speedPriority[0],
    speedPriority[1],
    speedPriority[0] === characters[0] ? action : enemyAction,
    100
  );

  scheduleAttack(
    speedPriority[1],
    speedPriority[0],
    speedPriority[1] === characters[0] ? action : enemyAction,
    delayA
  );

  setTimeout(() => {
    setBattleData({
      ...battleData,
      turn: battleData.turn && battleData.turn + 1,
      waiting: false,
    });
  }, delayA + delayB);
};

export default handleTurn;
