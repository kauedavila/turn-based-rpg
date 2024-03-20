import CharMoves from "@/components/character/charMoves";
import CharStats from "@/components/character/charStats";
import CharRemove from "@/components/character/charRemove";

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
  const spriteUrl = character?.sprite || "";

  return (
    <div className="grid grid-cols-1 grid-rows-1 w-full  justify-items-center ">
      <div className="flex absolute gap-4 w-[20%] h-[50%] -top-40 justify-start items-center py-4 px-4 bg-gray-800 rounded-md shadow-lg text-white">
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
      <div
        className="w-[50%] h-[100%] rounded-md shadow-lg"
        style={{
          backgroundImage: `url(${process.env.NEXT_PUBLIC_API_URL}/${spriteUrl})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top",
        }}
      />
    </div>
  );
}
