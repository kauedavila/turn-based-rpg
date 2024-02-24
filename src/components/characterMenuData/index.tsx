import CharMoves from "@/app/screens/menu/charMoves";
import CharStats from "@/app/screens/menu/charStats";
import CharRemove from "@/app/screens/menu/charRemove";

import templateSprites from "@/templates/sprites";
import { SpriteStates } from "@/types";
import { useState } from "react";
import { GiSkills, GiSpellBook } from "react-icons/gi";
import { IoIosCloseCircle } from "react-icons/io";

const characterTabs = [
  {
    index: 0,
    name: "Stats",
    icon: <GiSkills className="text-white" size={24} />,
  },
  {
    index: 1,
    name: "Skills",
    icon: <GiSpellBook className="text-white" size={24} />,
  },
  {
    index: 2,
    name: "Close",
    icon: <IoIosCloseCircle className="text-red-500" size={24} />,
  },
];

export default function CharacterMenuData({ character, index }: any) {
  const [characterStatTab, setCharacterStatTab] = useState<number>(0);
  const sprite = templateSprites.find((item) => item.name === character?.data?.sprite.name);
  const spriteState: SpriteStates = character?.data?.sprite.state ?? "idle";
  const spriteUrl = sprite?.[spriteState]?.url;

  return (
    <div className="flex justify-between items-between w-full gap-4">
      <div
        className="w-full h-auto aspect-square"
        style={{
          backgroundImage: `url(${spriteUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "top",
        }}
      />
      {characterStatTab === 0 && <CharStats character={character} />}
      {characterStatTab === 1 && <CharMoves character={character} />}
      {characterStatTab === 2 && <CharRemove index={index} />}

      <div className="flex flex-col gap-1">
        {characterTabs.map((tab) => (
          <button
            key={tab.index}
            className={`p-1 w-full h-auto bg-gray-700 rounded-md text-white 
                          cursor-pointer aspect-square flex items-center justify-center
                           ${characterStatTab === tab.index ? "border-2 border-white" : ""}`}
            onClick={() => setCharacterStatTab(tab.index)}
          >
            {tab.icon}
          </button>
        ))}
      </div>
    </div>
  );
}
