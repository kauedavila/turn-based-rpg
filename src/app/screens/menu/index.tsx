import { usePartyStore } from "@/stores/usePartyStore";
import { CharacterData } from "@/types";
import { useEffect, useState } from "react";
import useCharacters from "@/app/hooks/useCharacters";
import MenuParty from "@/components/menu/menuParty";
import MenuStages from "@/components/menu/menuStages";

export default function Menu() {
  const party = usePartyStore((state: any) => state?.party);
  const setParty = usePartyStore((state: any) => state?.setParty);
  const [menu, setMenu] = useState(0);

  const { data: characters, isLoading: loadingChars } = useCharacters();

  useEffect(() => {
    const updatedParty =
      characters &&
      party.map((character: CharacterData) => {
        const updatedCharacter = characters?.find((item: CharacterData) => item._id === character._id);
        updatedCharacter._id = character._id;
        return updatedCharacter;
      });

    characters && setParty(updatedParty);
  }, [characters]);

  const menuNames = ["Party", "Map"];

  return (
    <>
      {loadingChars ? (
        <div className="flex items-center justify-center h-screen w-screen text-white">
          <h1>Loading...</h1>
        </div>
      ) : (
        <div
          id="menu-screen"
          className="relative bg-gray-900 w-full h-full flex justify-center  items-end overflow-hidden"
          style={{
            backgroundImage: `url(https://img.freepik.com/premium-photo/medieval-town-anime-background-illustration_708558-453.jpg)`,
            backgroundSize: "cover",
            backgroundPosition: "bottom",
          }}
        >
          <div id="menu-select" className="absolute right-0 flex flex-col items-end justify-start order-2 z-20 w-[5%]  h-full">
            {menuNames.map((_, index) => {
              return (
                <button
                  key={index}
                  className={`p-1 w-full h-auto bg-gray-700 rounded-md text-white 
                          cursor-pointer aspect-square flex items-center justify-center
                           ${menu === index ? "border-2 border-white" : ""}`}
                  onClick={() => setMenu(index)}
                >
                  {menuNames[index]}
                </button>
              );
            })}
          </div>
          {menu === 0 && <MenuParty />}
          {menu === 1 && <MenuStages />}
        </div>
      )}
    </>
  );
}
