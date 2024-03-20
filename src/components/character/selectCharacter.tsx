import useCharacters from "@/app/hooks/useCharacters";
import { usePartyStore } from "@/stores/usePartyStore";
import { CharacterData } from "@/types";

const SelectCharacter = ({ selectingCharacter, setSelectingCharacter }: { selectingCharacter: number; setSelectingCharacter: any }) => {
  const party = usePartyStore((state: any) => state?.party);
  const setParty = usePartyStore((state: any) => state?.setParty);
  const characters = useCharacters().data;

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

export default SelectCharacter;
