export type ScreenList = "menu" | "battle";

export type ResultScreenProps = {
  result: string | null;
  experience: number;
};

export type CharacterData = {
  _id: number;
  name: string;
  level: number;
  class: string;
  experience: number;
  health: number;
  attack: number;
  defense: number;
  speed: number;
  moves?: {
    name?: string;
    level?: number;
  }[];
  sprite?: string;
  currentStats?: {
    health?: number;
    attack?: number;
    defense?: number;
    speed?: number;
    progress?: number;
  };
};

export type EnemyData = CharacterData;

export type PartyDataType = CharacterData[] &
  {
    partyId: number;
  }[];

export type BattleData = {
  timer?: number;
  turn?: string | null;
  waiting?: boolean;
  auto?: boolean;
  charTurn?: number;
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

export type ResultScreenData = {
  result: string;
  experience: number;
};
