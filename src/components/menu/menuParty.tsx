import { usePartyStore } from "@/stores/usePartyStore";
import SelectCharacter from "../character/selectCharacter";
import CharacterMenuData from "../characterMenuData";
import { useState } from "react";

const MenuParty = () => {
  const [selectingCharacter, setSelectingCharacter] = useState<number>(0);
  const party = usePartyStore((state: any) => state?.party);
  return (
    <>
      <div id="menu-party" className=" flex items-end justify-center z-10 w-full h-full">
        {selectingCharacter > 0 && <SelectCharacter selectingCharacter={selectingCharacter} setSelectingCharacter={setSelectingCharacter} />}
        {Array(3)
          .fill(0)
          .map((_, index) => {
            const character = party[index];

            return (
              <div key={index} id={`party-list-character-${character?._id}`} className="flex w-[100%] h-[100%] justify-center items-end  mb-8">
                {!character ? (
                  <div
                    className="flex  items-center place-self-end mb-10 justify-center border border-gray-900 bg-gray-600 w-[25%] rounded-full h-auto aspect-square
                cursor-pointer hover:bg-gray-700 hover:border-gray-800 hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out"
                    onClick={() => setSelectingCharacter(index + 1)}
                  >
                    <p className="text-gray-100 text-4xl m-0 p-0">+</p>
                  </div>
                ) : (
                  <CharacterMenuData character={character} index={index} />
                )}
              </div>
            );
          })}
      </div>
    </>
  );
};

export default MenuParty;
