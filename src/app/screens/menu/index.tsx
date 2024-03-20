import { useScreen } from "@/stores/screen";
import { useParty } from "@/stores/useParty";
import { useCharacters } from "@/stores/useCharacter";
import { CharacterData } from "@/types";
import { useEffect, useState } from "react";
import CharacterMenuData from "@/components/characterMenuData";
import { useStages } from "@/stores/useStage";

export default function Menu() {
  const party = useParty((state: any) => state?.party);
  const setParty = useParty((state: any) => state?.setParty);
  const [selectingCharacter, setSelectingCharacter] = useState<number>(0);

  const characters = useCharacters((state: any) => state?.characters);
  const setCharacters = useCharacters((state: any) => state?.setCharacters);

  const setScreen = useScreen((state: any) => state?.setScreen);
  const screen = useScreen((state: any) => state?.screen);

  const stages = useStages((state: any) => state?.stages);
  const setStages = useStages((state: any) => state?.setStages);
  const setStage = useStages((state: any) => state?.setStage);

  useEffect(() => {
    const fetchStages = async () => {
      const data = await fetch("http://localhost:3000/api/stages", {})
        .then((response) => response.json())
        .catch((error) => console.error(error));
      data && setStages(data);
    };

    fetchStages();
  }, []);

  useEffect(() => {
    const fetchCharacters = async () => {
      const data = await fetch("http://localhost:3000/api/characters", {})
        .then((response) => response.json())
        .catch((error) => console.error(error));

      data && setCharacters(data);
    };

    fetchCharacters();
  }, [screen]);

  useEffect(() => {
    const updatedParty = party.map((character: CharacterData) => {
      const updatedCharacter = characters.find((item: CharacterData) => item._id === character._id);
      updatedCharacter._id = character._id;
      return updatedCharacter;
    });

    setParty(updatedParty);
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
              <div key={index} id={`party-list-character-${character?.id}`} className="flex  w-full h-full justify-center py-4">
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

const SelectCharacter = ({ selectingCharacter, setSelectingCharacter }: { selectingCharacter: number; setSelectingCharacter: any }) => {
  const party = useParty((state: any) => state?.party);
  const setParty = useParty((state: any) => state?.setParty);
  const characters = useCharacters((state: any) => state?.characters);

  const handleAddToParty = (index: number) => {
    setSelectingCharacter(0);
    const character = characters[index];
    const newParty = [...party];
    newParty[selectingCharacter - 1] = character;
    setParty(newParty);
  };

  return (
    <section id="select-character-main" className="flex  z-20 absolute items-center justify-center w-full h-full backdrop-blur-sm">
      <div id="select-character" className="flex flex-col w-[75%] h-[75%] bg-gray-300 rounded-md shadow-lg p-4">
        <div id="select-character-close" className="flex justify-end w-full" onClick={() => setSelectingCharacter(0)}>
          <p
            id="select-character-close-button"
            className="text-2xl font-bold cursor-pointer aspect-square hover:scale-105 transition-all duration-300 ease-in-out w-[5%] h-auto bg-gray-700 text-gray-100 rounded-full flex items-center justify-center"
          >
            x
          </p>
        </div>
        <div className="grid grid-cols-6 gap-2">
          {characters?.map((character: any, index: number) => {
            const spriteUrl = character?.sprite;

            const characterInParty: boolean = party.find((item: CharacterData) => item?._id === character?._id) ? true : false;
            return (
              <div
                key={index}
                id={`party-list-character-${character?._id}-sprite`}
                className={
                  characterInParty
                    ? "w-full h-auto aspect-square border  rounded-md bg-gray-700 cursor-not-allowed filter grayscale"
                    : "w-full h-auto aspect-square border border-black rounded-md hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer bg-gray-500 hover:border-gray-800 hover:bg-gray-700"
                }
                style={{
                  backgroundImage: `url(http://localhost:3000/${spriteUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "top",
                }}
                onClick={() => !characterInParty && handleAddToParty(index)}
              >
                <div id={`party-list-character-${character?._id}-data`} className="flex flex-col h-full justify-between p-1 text-white">
                  <p>
                    <strong>{character?.name}</strong>
                  </p>
                  <p className="text-xs self-end ">
                    <strong>LV</strong>: {character?.level}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
