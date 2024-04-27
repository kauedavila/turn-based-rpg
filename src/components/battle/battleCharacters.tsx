import { useBattleCharactersStore } from "@/stores/useBattleCharactersStore";
import Character from "../character";
import { CharacterData } from "@/types";

const BattleCharacters = () => {
  const battleCharacters = useBattleCharactersStore((state: any) => state?.battleCharacters);
  return (
    <div id="battle-characters" className="relative flex-col w-full h-full flex justify-between px-[15%] py-[5%]">
      {battleCharacters.length > 0 &&
        battleCharacters?.map((character: CharacterData, index: number) => (
          <Character
            key={index}
            name={character.name}
            sprite={character.sprite}
            position={"left"}
            className={`left-[25%]
        ${index === 0 ? "bottom-[20%] z-20 left-[40%]" : index === 1 ? "bottom-[35%] z-10 " : index === 2 ? "bottom-[5%] z-30" : ""}
        `}
          />
        ))}
    </div>
  );
};

export default BattleCharacters;
