import { AnimationData } from "@/types";

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
    attackName: "switch",
    attackAnimation: "null",
    attackDelay: 0,
    attackDuration: 0,
    hitAnimation: "null",
    hitDelay: 0,
    hitDuration: 0,
  },
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
    attackName: "throw_rock",
    attackAnimation: "animate-throw_rock-attack",
    attackDelay: 0,
    attackDuration: 500,
    hitAnimation: "animate-melee-hit",
    hitDelay: 200,
    hitDuration: 500,
    projectile: "stone",
  },
  {
    attackName: "jump_attack",
    attackAnimation: "animate-jump-attack",
    attackDelay: 0,
    attackDuration: 500,
    hitAnimation: "animate-melee-hit",
    hitDelay: 300,
    hitDuration: 500,
  },
];
