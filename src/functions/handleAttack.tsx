import { animationData, defaultAnimation } from "@/templates/animations";
import { attackData, defaultAttack } from "@/templates/attacks";
import { templateProjectiles } from "@/templates/projectiles";
import { AnimationData, CharacterData, SpriteStates } from "@/types";

const calculateDamage = (
  attackName: string,
  attacker: CharacterData,
  defender: CharacterData
) => {
  const move =
    attackData.find((data) => data.attackName === attackName) || defaultAttack;

  const { attack: attackerAtk, defense: attackerDef } = attacker.data
    .currentStats || { attack: 0, defense: 0 };

  const { defense: defenderDef } = defender?.data.currentStats || {
    attack: 0,
    defense: 0,
  };

  if (!attackerAtk || !attackerDef || !defenderDef || move.power === 0)
    return 0;

  let damage = 0;
  switch (move.attackName) {
    default:
      damage =
        (((2 * 5) / 5) * move.power * attackerAtk) / defenderDef / 50 + 2;
      break;
  }

  damage = Math.round(damage);
  return damage * 3;
};

const handleSpriteState = (
  target: CharacterData,
  state: SpriteStates,
  battleCharacters: CharacterData[],
  setBattleCharacters: (characters: CharacterData[]) => void
) => {
  setBattleCharacters(
    battleCharacters.map((character) => {
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
  battleCharacters: CharacterData[],
  setBattleCharacters: (characters: CharacterData[]) => void,
  attackerPosition?: string
) => {
  const defenderPosition = attackerPosition === "left" ? "right" : "left";

  const attackerId = document.getElementById(
    `character-${attackerPosition}-sprite`
  ) as HTMLElement;
  const defenderId = document.getElementById(
    `character-${defenderPosition}-sprite`
  ) as HTMLElement;

  const animation: AnimationData =
    animationData.find((data) => data.attackName === attackName) ||
    defaultAnimation;

  const projectile = templateProjectiles.find(
    (item) => item.name === animation?.projectile
  );

  console.log(projectile);

  const projectilesIds: any = [];
  if (projectile) {
    for (let i = 0; i < projectile.projectiles.length; i++) {
      const projectileId = document.getElementById(
        `projectile-${projectile.projectiles[i]?.name}`
      ) as HTMLElement;
      projectilesIds.push(projectileId);
    }
  }

  setTimeout(() => {
    attackerId?.classList.add(animation.attackAnimation);

    projectilesIds?.forEach((projectileId: any, index: number) => {
      projectileId?.classList.add(projectile?.projectiles[0]?.className);
      projectileId?.classList.remove("hidden");
    });

    handleSpriteState(
      attacker,
      "attack",
      battleCharacters,
      setBattleCharacters
    );
  }, animation.attackDelay);

  setTimeout(() => {
    defenderId?.classList.add(animation.hitAnimation);
    handleSpriteState(defender, "hit", battleCharacters, setBattleCharacters);

    setTimeout(() => {
      defenderId?.classList.remove(animation.hitAnimation);
    }, animation.hitDuration);
  }, animation.hitDelay);
  setTimeout(() => {
    attackerId?.classList.remove(animation.attackAnimation);
    handleSpriteState(attacker, "idle", battleCharacters, setBattleCharacters);
    handleSpriteState(defender, "idle", battleCharacters, setBattleCharacters);
    projectilesIds?.forEach((projectileId: any, index: number) => {
      projectileId?.classList.remove(projectile?.projectiles[0]?.className);
      projectileId?.classList.add("hidden");
    });
  }, animation.attackDuration);
};

const handleAttack = (
  attackName: string,
  attacker: CharacterData,
  defender: CharacterData,
  battleCharacters: CharacterData[],
  setBattleCharacters: (characters: CharacterData[]) => void,
  attackerPosition?: string
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

  handleAnimation(
    attackName,
    attacker,
    defender,
    battleCharacters,
    setBattleCharacters,
    attackerPosition
  );

  setTimeout(() => {
    defender.data.currentStats = {
      ...defender?.data.currentStats,
      health: currentHealth ? currentHealth - damage : 0,
    };
  }, animation.attackDelay);

  return;
};

export default handleAttack;
