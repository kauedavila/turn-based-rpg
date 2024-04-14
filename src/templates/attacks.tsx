export const attackData = [
  {
    attackName: "switch",
    properties: [],
    power: 0,
  },
  {
    attackName: "melee",
    attackDisplayName: "Melee",
    properties: ["offensive", "close", "physical", "endowable"],
    description: "A basic melee attack",
    power: 40,
  },
  {
    attackName: "melee2",
    attackDisplayName: "Melee 2",
    properties: ["offensive", "close", "physical", "endowable"],
    description: "A second melee attack",
    power: 40,
  },
  {
    attackName: "throw_rock",
    attackDisplayName: "Throw Rock",
    properties: ["offensive", "ranged", "physical"],
    description: "Throw a rock at your enemy",
    power: 40,
  },
  {
    attackName: "jump_attack",
    attackDisplayName: "Jump Attack",
    properties: ["offensive", "close", "physical", "endowable"],
    description: "Jump and attack your enemy",
    power: 40,
  },
];

export const defaultAttack = {
  attackName: "melee",
  properties: ["close", "physical", "endowable"],
  power: 40,
};
