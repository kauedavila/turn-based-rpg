import { useBattleCharactersStore } from "@/stores/useBattleCharactersStore";
import { usePartyStore } from "@/stores/usePartyStore";
import { useScreenStore } from "@/stores/useScreenStore";
import { BattleData, CharacterData } from "@/types";
import handleTurn from "@/functions/handleTurn";
import handleHPColor from "@/functions/handleHpColor";

const BattleActions = ({
  variant,
  auto,
  setAuto,
  battleData,
  setBattleData,
}: {
  variant: string;
  auto: boolean;
  setAuto: (auto: boolean) => void;
  battleData: BattleData;
  setBattleData: (battleData: BattleData) => void;
}) => {
  const battleCharacters = useBattleCharactersStore((state: any) => state?.battleCharacters);
  const setBattleCharacters = useBattleCharactersStore((state: any) => state?.setBattleCharacters);
  const party = usePartyStore((state: any) => state?.party);
  const setScreen = useScreenStore((state: any) => state?.setScreen);

  const handleFlee = () => {
    confirm("Are you sure you want to flee?") === true &&
      (party.forEach((character: CharacterData) => {
        character.currentStats = undefined;
      }),
      battleCharacters?.forEach((character: CharacterData) => {
        character.currentStats = undefined;
      }),
      setScreen("menu"),
      setBattleCharacters(battleCharacters));
  };

  const handleToggleAuto = () => {
    setAuto(!auto);
    if (battleData.progress[0] >= 100) {
      handleTurn("attack", "melee", battleCharacters, setBattleCharacters, battleData, setBattleData, party, battleCharacters[0], battleCharacters[1]);
    }
  };

  return (
    <>
      {variant === "left" ? (
        <div id="battle-actions-left" className="flex flex-col absolute left-0 bottom-0 border-2 rounded-tr-md border-black">
          <details
            className="text-left bg-gray-900 text-white  
              hover:bg-gray-700 transition-all duration-300 cursor-pointer"
          >
            <summary className="px-10 py-2 border border-black">Attack</summary>
            <div
              className="grid grid-cols-2"
              style={{
                gridTemplateColumns: battleCharacters[0]?.moves?.length > 1 ? "1fr 1fr" : "1fr",
              }}
            >
              {battleCharacters[0]?.moves?.map((move: any) => (
                <button
                  key={move.name}
                  className=" text-left bg-gray-800 text-white border border-black px-10 py-2 first-letter:capitalize
              hover:bg-gray-700 transition-all duration-300
              "
                  onClick={() => {
                    handleTurn("attack", move.name ?? "melee", battleCharacters, setBattleCharacters, battleData, setBattleData, party, battleCharacters[0], battleCharacters[1]);
                  }}
                >
                  {move.name.replace("_", " ")}
                </button>
              ))}
            </div>
          </details>
          {party.length > 1 && (
            <details
              className="text-left bg-gray-900 text-white  
              hover:bg-gray-700 transition-all duration-300 cursor-pointer"
            >
              <summary className="px-10 py-2 border border-black">Switch</summary>
              <div className="flex">
                {party?.map((character: CharacterData, index: number) => (
                  <button
                    key={index}
                    className="w-full relative text-left bg-red-900 text-white border border-black px-10 py-2 first-letter:capitalize
              hover:bg-gray-700 transition-all duration-300"
                    style={{
                      display: character?._id === battleCharacters[0]?._id ? "none" : "block",
                    }}
                    onClick={() => {
                      handleTurn("switch", index.toString(), battleCharacters, setBattleCharacters, battleData, setBattleData, party, battleCharacters[0], battleCharacters[1]);
                    }}
                  >
                    <p className="relative z-10">{character?.name}</p>
                    <div
                      className="absolute bottom-0 left-0 w-full h-full"
                      style={{
                        backgroundColor: handleHPColor(Math.max(Math.floor(((character?.currentStats?.health ?? 0) / character?.health) * 100), 0) || 100),
                        width: `${Math.max(Math.floor(((character?.currentStats?.health ?? 0) / character?.health) * 100), 0) || 100}%`,
                      }}
                    ></div>
                  </button>
                ))}
              </div>
            </details>
          )}

          <button
            className="w-full h-auto text-left bg-gray-900 text-white border border-black px-10 py-2 first-letter:capitalize
              hover:bg-gray-700 transition-all duration-300"
            onClick={handleFlee}
          >
            Flee
          </button>
        </div>
      ) : (
        <div id="battle-actions-2" className="flex flex-col absolute right-0 bottom-0 border-2 rounded-tl-md border-black">
          <button
            className={`w-full h-auto text-left bg-gray-${battleData.auto ? "500" : "900"} text-white border border-black px-10 py-2 first-letter:capitalize
              hover:bg-gray-700 transition-all duration-300`}
            onClick={() => handleToggleAuto()}
          >
            {auto ? "Stop" : "Auto"}
          </button>
        </div>
      )}
    </>
  );
};

export default BattleActions;
