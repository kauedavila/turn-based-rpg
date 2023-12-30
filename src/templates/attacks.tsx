export const attackData = [
  {
    attackName: "switch",
    properties: [],
    element: "none",
    power: 0,
  },
  {
    attackName: "melee",
    properties: ["close", "physical", "endowable"],
    element: "neutral",
    power: 40,
  },
  {
    attackName: "throw_rock",
    properties: ["ranged", "physical"],
    element: "earth",
    power: 40,
  },
  {
    attackName: "jump_attack",
    properties: ["close", "physical", "endowable"],
    element: "neutral",
    power: 40,
  },
];

export const defaultAttack = {
  attackName: "melee",
  properties: ["close", "physical", "endowable"],
  element: "neutral",
  power: 40,
};
