import { AnimationData, CharacterData } from "@/types";

export const defaultAnimation = {
  attackName: "melee",
  attackAnimation: "animate-melee-attack",
  attackDelay: 0,
  attackDuration: 1000,
  hitAnimation: "animate-melee-hit",
  hitDelay: 500,
  hitDuration: 500,
};

export const animationData: AnimationData[] = [
  {
    attackName: "melee",
    attackAnimation: "animate-melee-attack",
    attackDelay: 0,
    attackDuration: 1000,
    hitAnimation: "animate-melee-hit",
    hitDelay: 500,
    hitDuration: 500,
  },

  {
    attackName: "jump",
    attackAnimation: "animate-jump-attack",
    attackDelay: 0,
    attackDuration: 500,
    hitAnimation: "animate-melee-hit",
    hitDelay: 300,
    hitDuration: 500,
  },
];

const attackData = [
  {
    attackName: "melee",
    properties: ["close", "physical", "endowable"],
    element: "neutral",
    power: 40,
  },
];

const defaultAttack = {
  attackName: "melee",
  properties: ["close", "physical", "endowable"],
  element: "neutral",
  power: 40,
};

const calculateDamage = (
  attackName: string,
  attacker: CharacterData,
  defender: CharacterData
) => {
  const move =
    attackData.find((data) => data.attackName === attackName) || defaultAttack;

  const { attack: attackerAtk, defense: attackerDef } = attacker.data
    .currentStats || { attack: 0, defense: 0 };

  const { defense: defenderDef } = defender.data.currentStats || {
    attack: 0,
    defense: 0,
  };

  if (!attackerAtk || !attackerDef || !defenderDef) return 0;

  let damage = 0;
  switch (move.attackName) {
    default:
      damage =
        (((2 * 5) / 5) * move.power * attackerAtk) / defenderDef / 50 + 2;
      break;
  }
  return damage;
};

const handleSpriteState = (
  target: CharacterData,
  state: string,
  setBattleCharacters: (characters: CharacterData[]) => void
) => {
  setBattleCharacters((prev) =>
    prev.map((character) => {
      if (character.data.id === target.data.id) {
        character.data.sprite = {
          ...character.data.sprite,
          state,
        };
      }
      return character;
    })
  );
};

const handleAnimation = (
  attackName: string,
  attacker: CharacterData,
  defender: CharacterData,
  setBattleCharacters: (characters: CharacterData[]) => void
) => {
  const attackerId = document.getElementById(
    `character-${attacker?.data.id}-sprite`
  ) as HTMLElement;
  const defenderId = document.getElementById(
    `character-${defender?.data.id}-sprite`
  ) as HTMLElement;

  const animation =
    animationData.find((data) => data.attackName === attackName) ||
    defaultAnimation;

  setTimeout(() => {
    attackerId?.classList.add(animation.attackAnimation);
    handleSpriteState(attacker, "attack", setBattleCharacters);
  }, animation.attackDelay);

  setTimeout(() => {
    defenderId?.classList.add(animation.hitAnimation);
    handleSpriteState(defender, "hit", setBattleCharacters);

    setTimeout(() => {
      defenderId?.classList.remove(animation.hitAnimation);
    }, animation.hitDuration);
  }, animation.hitDelay);
  setTimeout(() => {
    attackerId?.classList.remove(animation.attackAnimation);
    handleSpriteState(attacker, "idle", setBattleCharacters);
    handleSpriteState(defender, "idle", setBattleCharacters);
  }, animation.attackDuration);
};

const handleAttack = (
  attackName: string,
  attacker: CharacterData,
  defender: CharacterData,
  setBattleCharacters: (characters: CharacterData[]) => void
) => {
  const damage = calculateDamage(attackName, attacker, defender);
  const currentHealth = defender?.data?.currentStats?.health;

  const animation = animationData.find(
    (data) => data.attackName === attackName
  ) || {
    attackDuration: 0,
    attackDelay: 0,
    hitDelay: 0,
    hitDuration: 0,
  };

  handleAnimation(attackName, attacker, defender, setBattleCharacters);

  setTimeout(() => {
    defender.data.currentStats = {
      ...defender?.data.currentStats,
      health: currentHealth ? currentHealth - damage : 0,
    };
  }, animation.hitDelay + animation.attackDelay);

  return;
};

export default handleAttack;
