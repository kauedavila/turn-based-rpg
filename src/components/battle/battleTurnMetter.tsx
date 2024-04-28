import { useBattleCharactersStore } from "@/stores/useBattleCharactersStore";
import { useBattleEnemiesStore } from "@/stores/useBattleEnemiesStore";
import { CharacterData } from "@/types";

const BattleTurnMetter = () => {
  const battleCharacters = useBattleCharactersStore((state: any) => state?.battleCharacters);
  const battleEnemies = useBattleEnemiesStore((state: any) => state?.battleEnemies);

  const battleArray = battleCharacters.concat(battleEnemies);

  return (
    <div id="battle-turn-metter" className="absolute items-center flex bottom-8 left-[25%] w-[50%] h-2 bg-white rounded-full">
      {battleArray?.map((character: CharacterData, index: number) => {
        const spriteUrl = character?.sprite;
        const isEnemy = battleEnemies.includes(character);
        return (
          <div
            key={index}
            id={`char-turn-metter-${index}`}
            className={`absolute transition-all duration-300
               h-10  w-10 bg-black rounded-full`}
            style={{
              left: `${Math.min(character.currentStats?.progress || 0, 95)}%`,
              backgroundImage: `url(${process.env.NEXT_PUBLIC_API_URL}/public/uploads/${isEnemy ? "enemies" : "classes"}/${spriteUrl})`,
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
