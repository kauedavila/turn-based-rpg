type spriteData = {
  url?: string;
  flip?: boolean;
  width?: number;
  height?: number;
};

export type CharacterData = {
  data: {
    id: number;
    name: string;
    health: number;
    attack: number;
    defense: number;
    speed: number;
    moves?: {
      name?: string;
      level?: number;
    }[];
    sprite?: {
      state?: string;
      idle?: spriteData;
      attack?: spriteData;
      hit?: spriteData;
      death?: spriteData;
    };
    currentStats?: {
      health?: number;
      attack?: number;
      defense?: number;
      speed?: number;
    };
  };
};

export type BattleData = {
  timer?: number;
  turn?: number;
  attacker?: number;
  stage?: {
    background?: string;
  };
};

export type AnimationData = {
  attackName: string;
  attackAnimation: string;
  attackDelay: number;
  attackDuration: number;
  hitAnimation: string;
  hitDelay: number;
  hitDuration: number;
};
