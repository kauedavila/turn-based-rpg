export type ScreenList = "menu" | "battle";

type MediaType = {
  data?: {
    attributes: {
      url?: string;
    };
  };
};

export type SpriteDataType = {
  [key: string]: string | undefined | MediaType;
  name?: string;
  state?: SpriteStates;
  idle?: MediaType;
  attack?: MediaType;
  hit?: MediaType;
  death?: MediaType;
};

export type ResultScreenProps = {
  result: string | null;
  experience: number;
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
  auto?: boolean;
  progress: [number, number];
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
