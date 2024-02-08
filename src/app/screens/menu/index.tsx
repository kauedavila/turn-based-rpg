import { useBattleCharacters } from "@/stores/battleCharacters";
import { useScreen } from "@/stores/screen";
import { useParty } from "@/stores/useParty";
import templateCharacters from "@/templates/characters";
import templateEnemies from "@/templates/enemies";
import templateSprites from "@/templates/sprites";
import { CharacterData, SpriteStates } from "@/types";
import { useState } from "react";
import CharacterMenuData from "@/components/characterMenuData";

export default function Menu() {
  const party = useParty((state: any) => state?.party);
  const [selectingCharacter, setSelectingCharacter] = useState<number>(0);

  const setBattleCharacters = useBattleCharacters((state: any) => state?.setBattleCharacters);
  const setScreen = useScreen((state: any) => state?.setScreen);

  const handleBattle = () => {
    if (party.length === 0) return alert("You need at least one character in your party to battle");
    const playerCharacter = party.find((character: CharacterData) => character !== undefined);
    const enemyCharacter = templateEnemies[0];

    party.forEach((character: CharacterData) => {
      if (!character) return;
      character.data.currentStats = undefined;
    });

    [playerCharacter, enemyCharacter].forEach((character: CharacterData) => {
      if (!character) return;
      character.data.currentStats = undefined;
    });

    setBattleCharacters([playerCharacter, enemyCharacter]);
    setScreen("battle");
  };

  return (
    <div
      id="menu-screen"
      className="relative bg-gray-900 h-[75%] w-[75%] flex overflow-hidden "
      style={{
        backgroundImage: `url(https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/ca530ccc-fd0f-4f26-bbc7-9af8e8225eea/dd5qnyp-781f6297-22b0-46d8-b100-a34b741a1160.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2NhNTMwY2NjLWZkMGYtNGYyNi1iYmM3LTlhZjhlODIyNWVlYVwvZGQ1cW55cC03ODFmNjI5Ny0yMmIwLTQ2ZDgtYjEwMC1hMzRiNzQxYTExNjAucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.yxbgNBh9crVxUr4QfVmMITa488tmAqlbxQU-XlTSXgE)`,
        backgroundSize: "cover",
        backgroundPosition: "bottom",
      }}
    >
      {selectingCharacter > 0 && <SelectCharacter selectingCharacter={selectingCharacter} setSelectingCharacter={setSelectingCharacter} />}
      <div id="party-list" className="grid grid-rows-3 grid-cols-1 self-start place-self-start items-start justify-start w-[50%] h-full bg-white rounded-r-md border-r-2 border-gray-700 bg-opacity-50">
        {Array(3)
          .fill(0)
          .map((_, index) => {
            const character = party[index];

            return (
              <div key={index} id={`party-list-character-${character?.data.id}`} className="flex w-full h-full justify-center border-b-2 border-gray-700 pt-2 px-2">
                {!character ? (
                  <div
                    className="flex items-center place-self-center justify-center border border-gray-900 bg-gray-600 w-[25%] rounded-full h-auto aspect-square
                cursor-pointer hover:bg-gray-700 hover:border-gray-800 hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out"
                    onClick={() => setSelectingCharacter(index + 1)}
                  >
                    <p className="text-gray-100 text-4xl m-0 p-0">+</p>
                  </div>
                ) : (
                  <CharacterMenuData character={character} />
                )}
              </div>
            );
          })}
      </div>
      <div id="battle-button" className="flex justify-center items-center w-full h-full">
        <button
          className="w-[25%] h-[25%] bg-gray-700 rounded-full text-white text-2xl font-bold cursor-pointer aspect-square hover:scale-105 transition-all duration-300 ease-in-out"
          onClick={handleBattle}
        >
          Battle
        </button>
      </div>
    </div>
  );
}

const SelectCharacter = ({ selectingCharacter, setSelectingCharacter }: { selectingCharacter: number; setSelectingCharacter: any }) => {
  const party = useParty((state: any) => state?.party);
  const setParty = useParty((state: any) => state?.setParty);

  const handleAddToParty = (index: number) => {
    setSelectingCharacter(0);
    const character = templateCharacters[index];
    const newParty = [...party];
    newParty[selectingCharacter - 1] = character;
    setParty(newParty);
  };

  return (
    <section id="select-character-main" className="flex  absolute items-center justify-center w-full h-full backdrop-blur-sm z-10">
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
          {templateCharacters.map((character: CharacterData, index) => {
            const sprite = templateSprites.find((item) => item.name === character?.data?.sprite?.name);

            const spriteState: SpriteStates = character?.data?.sprite?.state ?? "idle";

            const spriteUrl = sprite?.[spriteState]?.url;
            const characterInParty: boolean = party.find((item: CharacterData) => item?.data?.id === character?.data?.id) ? true : false;

            return (
              <div
                key={index}
                id={`party-list-character-${character?.data.id}-sprite`}
                className={
                  characterInParty
                    ? "w-full h-auto aspect-square border  rounded-md bg-gray-700 cursor-not-allowed filter grayscale"
                    : "w-full h-auto aspect-square border border-black rounded-md hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer bg-gray-500 hover:border-gray-800 hover:bg-gray-700"
                }
                style={{
                  backgroundImage: `url(${spriteUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "top",
                }}
                onClick={() => !characterInParty && handleAddToParty(index)}
              >
                <div id={`party-list-character-${character?.data.id}-data`} className="flex flex-col h-full justify-between p-1 text-white">
                  <p>
                    <strong>{character?.data.name}</strong>
                  </p>
                  <p className="text-xs self-end ">
                    <strong>LV</strong>: {character?.data.level}
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
