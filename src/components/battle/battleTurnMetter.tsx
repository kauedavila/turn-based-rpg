import { useBattleCharactersStore } from "@/stores/useBattleCharactersStore";
import { BattleData, CharacterData } from "@/types";

const BattleTurnMetter = () => {
  const battleCharacters = useBattleCharactersStore((state: any) => state?.battleCharacters);

  return (
    <div id="battle-turn-metter" className="absolute items-center flex bottom-8 left-[25%] w-[50%] h-2 bg-white rounded-full">
      {battleCharacters?.map((character: CharacterData, index: number) => {
        const spriteUrl = character?.sprite;
        return (
          <div
            key={index}
            id={`char-turn-metter-${index}`}
            className={`absolute transition-all duration-300
               h-10  w-10 bg-black rounded-full`}
            style={{
              left: `${Math.min((character.currentStats?.progress || 0 / 100) * 95, 95)}%`,
              backgroundImage: `url(${process.env.NEXT_PUBLIC_API_URL}/public/uploads/${index === 1 ? "enemies" : "classes"}/${spriteUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        );
      })}
    </div>
  );
};

export default BattleTurnMetter;
