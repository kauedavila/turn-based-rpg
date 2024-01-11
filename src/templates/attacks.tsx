export const attackData = [
  {
    attackName: "switch",
    properties: [],
    element: "none",
    power: 0,
  },
  {
    attackName: "melee",
    attackDisplayName: "Melee",
    properties: ["close", "physical", "endowable"],
    element: "neutral",
    power: 40,
  },
  {
    attackName: "throw_rock",
    attackDisplayName: "Throw Rock",
    properties: ["ranged", "physical"],
    element: "earth",
    power: 40,
  },
  {
    attackName: "jump_attack",
    attackDisplayName: "Jump Attack",
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
