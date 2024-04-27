import { useBattleEnemiesStore } from "@/stores/useBattleEnemiesStore";
import Character from "../character";
import { EnemyData } from "@/types";

const BattleEnemies = () => {
  const battleEnemies = useBattleEnemiesStore((state: any) => state?.battleEnemies);
  return (
    <div id="battle-Enemies" className="relative flex-col w-full h-full flex justify-between px-[15%] py-[5%]">
      {battleEnemies.length > 0 &&
        battleEnemies?.map((character: EnemyData, index: number) => (
          <Character
            key={index}
            name={character.name}
            sprite={character.sprite}
            position={"right"}
            className={`
        ${index === 0 ? "bottom-[20%] z-20" : index === 1 ? "bottom-[35%] z-10" : index === 2 ? "bottom-[5%] z-30" : ""}
        `}
          />
        ))}
    </div>
  );
};

export default BattleEnemies;
