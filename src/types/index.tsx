export type ScreenList = "menu" | "battle";

export type SpriteDataType = {
  [key: string]: string | SpriteStateDataType | undefined;
  name: string;
  state?: SpriteStates;
  idle?: SpriteStateDataType;
  attack?: SpriteStateDataType;
  hit?: SpriteStateDataType;
  death?: SpriteStateDataType;
};

export type SpriteStateDataType = {
  url?: string;
  flip?: boolean;
  width?: number;
  height?: number;
};

export type SpriteStates = "idle" | "attack" | "hit" | "death";

export type CharacterData = {
  id: number;
  name: string;
  level: number;
  experience: number;
  health: number;
  attack: number;
  defense: number;
  speed: number;
  moves?: {
    name?: string;
    level?: number;
  }[];
  sprite?: {
    name?: string;
    state?: SpriteStates;
  };
  currentStats?: {
    health?: number;
    attack?: number;
    defense?: number;
    speed?: number;
  };
};

export type EnemyData = CharacterData;

export type PartyDataType = CharacterData[] &
  {
    partyId: number;
  }[];

export type BattleData = {
  timer?: number;
  turn?: number;
  waiting?: boolean;
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
  projectile?: string;
};
