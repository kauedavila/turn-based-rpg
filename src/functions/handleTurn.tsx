import { BattleData, CharacterData } from "@/types";
import handleAttack from "./handleAttack";
import { animationData } from "@/templates/animations";

const handleTurn = (
  action: string,
  value: string,
  battleCharacters: CharacterData[],
  setBattleCharacters: (characters: CharacterData[]) => void,
  battleData: BattleData,
  setBattleData: (data: BattleData) => void,
  party: CharacterData[],
  setTurnResult: (result: string) => void
) => {
  if (battleData.waiting) return;

  const characters = [...battleCharacters];
  const speedPriority = battleCharacters.filter((character) => character.currentStats !== undefined).sort((a, b) => (b.currentStats?.speed ?? 0) - (a.currentStats?.speed ?? 0));

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
    if (attacker.currentStats?.health === 0) {
      const charDeath = attacker === characters[0] ? "player_dies" : "enemy_dies";
      setTurnResult(charDeath);
      return;
    }
    handleAttack(attackType, attacker, defender, battleCharacters, setBattleCharacters, attackerPosition);
  };

  const scheduleAttack = (attacker: CharacterData, defender: CharacterData, attackType: string, delay: number, attackerPosition?: string) => {
    setTimeout(() => {
      performAttack(attacker, defender, attackType, attackerPosition);
    }, delay);
  };

  scheduleAttack(speedPriority[0], speedPriority[1], speedPriority[0] === characters[0] ? action : enemyAction, 100, speedPriority[0] === characters[0] ? "left" : "right");

  // scheduleAttack(speedPriority[1], speedPriority[0], speedPriority[1] === characters[0] ? action : enemyAction, delayA, speedPriority[1] === characters[0] ? "left" : "right");

  if (action === "switch") {
    battleCharacters[0] = party[Number(value)];
    setBattleCharacters(battleCharacters);
  }

  setBattleData((prev: any) => ({ ...prev, progress: [0, 0], waiting: true }));
};

export default handleTurn;
