import { useScreenStore } from "@/stores/useScreenStore";
import { usePartyStore } from "@/stores/usePartyStore";
import { CharacterData } from "@/types";
import { useEffect, useState } from "react";
import CharacterMenuData from "@/components/characterMenuData";
import { useStagesStore } from "@/stores/useStageStore";
import useStages from "@/app/hooks/useStages";
import useCharacters from "@/app/hooks/useCharacters";
import SelectCharacter from "@/components/character/selectCharacter";

export default function Menu() {
  const party = usePartyStore((state: any) => state?.party);
  const setParty = usePartyStore((state: any) => state?.setParty);
  const [selectingCharacter, setSelectingCharacter] = useState<number>(0);

  const characters = useCharacters().data;

  const setScreen = useScreenStore((state: any) => state?.setScreen);

  const stages = useStages().data;
  const setStage = useStagesStore((state: any) => state?.setStage);

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

  const handleBattle = async (stage: any) => {
    if (party.length !== 3 || party.includes(undefined)) return alert("Complete your party in order to procceed!");
    setScreen("battle");
    setStage(stage);
  };

  return (
    <div
      id="menu-screen"
      className="relative bg-gray-900 h-[90%] w-[90%] flex justify-center  items-end overflow-hidden"
      style={{
        backgroundImage: `url(https://img.freepik.com/premium-photo/medieval-town-anime-background-illustration_708558-453.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "bottom",
      }}
    >
      {selectingCharacter > 0 && <SelectCharacter selectingCharacter={selectingCharacter} setSelectingCharacter={setSelectingCharacter} />}
      <div id="party-list" className="absolute flex items-start justify-start z-10 w-[80%] h-[50%]">
        {Array(3)
          .fill(0)
          .map((_, index) => {
            const character = party[index];

            return (
              <div key={index} id={`party-list-character-${character?._id}`} className="flex  w-full h-full justify-center py-4">
                {!character ? (
                  <div
                    className="flex  items-center place-self-center justify-center border border-gray-900 bg-gray-600 w-[25%] rounded-full h-auto aspect-square
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
      <details className="absolute right-0 top-0 flex flex-col gap-4 items-center justify-center w-fit h-fit bg-gray-800 rounded-md p-4 cursor-pointer">
        <summary className="flex items-center justify-center w-full h-full">
          <p className="text-2xl font-bold text-white ">Stages</p>
        </summary>
        {stages?.length > 0 &&
          stages?.map((stage: any, index: number) => {
            return (
              <button
                key={index}
                className="w-full h-auto mt-4 bg-gray-600 rounded-md text-white cursor-pointer aspect-square flex items-center justify-center hover:bg-gray-700 hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out"
                onClick={() => handleBattle(stage)}
              >
                <p className="text-white ">{stage?.name}</p>
                <p className="text-white">{stage?.description}</p>
              </button>
            );
          })}
      </details>
    </div>
  );
}
