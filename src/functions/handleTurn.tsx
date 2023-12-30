import { BattleData, CharacterData } from "@/types";
import handleAttack, { animationData } from "./handleAttack";

const handleTurn = (
  action: string,
  value: string,
  battleCharacters: CharacterData[],
  setBattleCharacters: (characters: CharacterData[]) => void,
  battleData: BattleData,
  setBattleData: (data: BattleData) => void,
  party: CharacterData[]
) => {
  if (battleData.waiting) return;

  const characters = [...battleCharacters];
  const speedPriority = battleCharacters
    .filter((character) => character.data.currentStats !== undefined)
    .sort(
      (a, b) =>
        (b.data.currentStats?.speed ?? 0) - (a.data.currentStats?.speed ?? 0)
    );

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

  const delayA = 500 + animationA.attackDuration + animationA.attackDelay;
  const delayB = 500 + animationB.attackDuration + animationB.attackDelay;

  setBattleData({ ...battleData, waiting: true });

  const performAttack = (
    attacker: CharacterData,
    defender: CharacterData,
    attackType: string,
    attackerPosition?: string
  ) => {
    handleAttack(
      attackType,
      attacker,
      defender,
      battleCharacters,
      setBattleCharacters,
      attackerPosition
    );
  };

  const scheduleAttack = (
    attacker: CharacterData,
    defender: CharacterData,
    attackType: string,
    delay: number,
    attackerPosition?: string
  ) => {
    setTimeout(() => {
      performAttack(attacker, defender, attackType, attackerPosition);
    }, delay);
  };

  scheduleAttack(
    speedPriority[0],
    speedPriority[1],
    speedPriority[0] === characters[0] ? action : enemyAction,
    100,
    speedPriority[0] === characters[0] ? "left" : "right"
  );

  scheduleAttack(
    speedPriority[1],
    speedPriority[0],
    speedPriority[1] === characters[0] ? action : enemyAction,
    delayA,
    speedPriority[1] === characters[0] ? "left" : "right"
  );

  setTimeout(() => {
    if (action === "switch") {
      const newBattleCharacters = battleCharacters.map(
        (item: CharacterData) => item
      );
      newBattleCharacters[0] = party[Number(value)];
      setBattleCharacters(newBattleCharacters);
    }

    setBattleData({
      ...battleData,
      turn: battleData.turn && battleData.turn + 1,
      waiting: false,
    });
  }, delayA + delayB);
};

export default handleTurn;
