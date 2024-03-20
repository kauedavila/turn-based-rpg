import { useBattleCharactersStore } from "@/stores/useBattleCharactersStore";
import Character from "../character";
import { CharacterData } from "@/types";

const BattleCharacters = () => {
  const battleCharacters = useBattleCharactersStore((state: any) => state?.battleCharacters);
  return (
    <div id="battle-characters" className="relative w-full h-full flex justify-between items-end px-[15%] py-[5%]">
      {battleCharacters.length === 2 &&
        battleCharacters?.map((character: CharacterData, index: number) => (
          <Character key={index} id={character._id} name={character.name} sprite={character.sprite} position={index === 0 ? "left" : "right"} />
        ))}
    </div>
  );
};

export default BattleCharacters;
