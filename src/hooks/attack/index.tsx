import { CharacterData } from "@/app/battle/page";

export const defaultAnimation = {
  attack: "",
  attackDelay: 0,
  attackDuration: 0,
  hit: "",
  hitDelay: 0,
  hitDuration: 0,
};

export const animationData = [
  {
    type: "melee",
    attack: "animate-melee-attack",
    attackDelay: 0,
    attackDuration: 1000,
    hit: "animate-melee-hit",
    hitDelay: 500,
    hitDuration: 500,
  },

  {
    type: "jump",
    attack: "animate-jump-attack",
    attackDelay: 0,
    attackDuration: 500,
    hit: "animate-melee-hit",
    hitDelay: 300,
    hitDuration: 500,
  },
];

const calculateDamage = (attacker: CharacterData, defender: CharacterData) => {
  const damage = 1;
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
  type: string,
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
    animationData.find((data) => data.type === type) || defaultAnimation;

  setTimeout(() => {
    attackerId?.classList.add(animation.attack);
    handleSpriteState(attacker, "attack", setBattleCharacters);
  }, animation.attackDelay);

  setTimeout(() => {
    defenderId?.classList.add(animation.hit);
    handleSpriteState(defender, "hit", setBattleCharacters);

    setTimeout(() => {
      defenderId?.classList.remove(animation.hit);
    }, animation.hitDuration);
  }, animation.hitDelay);
  setTimeout(() => {
    attackerId?.classList.remove(animation.attack);
    handleSpriteState(attacker, "idle", setBattleCharacters);
    handleSpriteState(defender, "idle", setBattleCharacters);
  }, animation.attackDuration);
};

const handleAttack = (
  type: string,
  attacker: CharacterData,
  defender: CharacterData,
  setBattleCharacters: (characters: CharacterData[]) => void
) => {
  const damage = calculateDamage(attacker, defender);
  const currentHealth = defender?.data?.currentStats?.health;
  defender.data.currentStats = {
    ...defender?.data.currentStats,
    health: currentHealth ? currentHealth - damage : 0,
  };

  handleAnimation(type, attacker, defender, setBattleCharacters);

  return setBattleCharacters((prev) =>
    prev.map((character) => {
      if (character.data.id === defender.data.id) {
        character = defender;
      }
      return character;
    })
  );
};

export default handleAttack;
