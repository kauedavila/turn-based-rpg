import { CharacterData, SpriteStates } from "@/app/battle/page";

const calculateDamage = (attacker: CharacterData, defender: CharacterData) => {
  const damage = 1;
  return damage;
};

const handleSpriteState = (
  attacker: CharacterData,
  defender: CharacterData,
  attackerState: SpriteStates,
  defenderState: SpriteStates,
  setBattleCharacters: (characters: CharacterData[]) => void
) => {
  setBattleCharacters([
    {
      ...attacker,
      data: {
        ...attacker.data,
        sprite: {
          ...attacker.data.sprite,
          state: attackerState,
        },
      },
    },
    {
      ...defender,
      data: {
        ...defender.data,
        sprite: {
          ...defender.data.sprite,
          state: defenderState,
        },
      },
    },
  ]);
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

  const defaultAnimation = {
    attack: "",
    attackDelay: 0,
    attackDuration: 0,
    hit: "",
    hitDelay: 0,
    hitDuration: 0,
  };

  const animationData = [
    {
      type: "melee",
      attack: "animate-melee-attack",
      attackDelay: 0,
      attackDuration: 500,
      hit: "animate-melee-hit",
      hitDelay: 300,
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

  const animation =
    animationData.find((data) => data.type === type) || defaultAnimation;

  setTimeout(() => {
    attackerId?.classList.add(animation.attack);
    handleSpriteState(attacker, defender, "attack", "hit", setBattleCharacters);
  }, animation.attackDelay);

  setTimeout(() => {
    defenderId?.classList.add(animation.hit);
    setTimeout(() => {
      defenderId?.classList.remove(animation.hit);
    }, animation.hitDuration);
  }, animation.hitDelay);
  setTimeout(() => {
    attackerId?.classList.remove(animation.attack);
    handleSpriteState(attacker, defender, "idle", "idle", setBattleCharacters);
  }, animation.attackDuration);
};

const handleAttack = (
  type: string,
  battleCharacters: CharacterData[],
  setBattleCharacters: (characters: CharacterData[]) => void
) => {
  const characters = [...battleCharacters];
  const attacker = characters[0];
  const defender = characters[1];
  const damage = calculateDamage(attacker, defender);
  const currentHealth = defender?.data?.currentStats?.health;
  defender.data.currentStats = {
    ...defender?.data.currentStats,
    health: currentHealth ? currentHealth - damage : 0,
  };
  //   alert(
  //     `${attacker.data.name} dealt ${damage} damage to ${defender.data.name}`
  //   );
  handleAnimation(type, attacker, defender, setBattleCharacters);

  return setBattleCharacters(characters);
};

export default handleAttack;
