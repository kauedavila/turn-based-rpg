import useStages from "@/app/hooks/useStages";
import { usePartyStore } from "@/stores/usePartyStore";
import { useScreenStore } from "@/stores/useScreenStore";
import { useStagesStore } from "@/stores/useStageStore";

const MenuStages = () => {
  const { data: stages } = useStages();
  const setStage = useStagesStore((state: any) => state?.setStage);
  const party = usePartyStore((state: any) => state?.party);
  const setScreen = useScreenStore((state: any) => state?.setScreen);

  const handleBattle = async (stage: any) => {
    if (party.length !== 3 || party.includes(undefined)) return alert("Complete your party in order to procceed!");
    setScreen("battle");
    setStage(stage);
  };
  return (
    <>
      <div id="menu-stages" className="flex items-center justify-center z-10 w-full h-full">
        {stages?.map((stage: any, index: number) => (
          <div
            key={index}
            className="
          hover:transform hover:scale-110 
           transition duration-300 ease-in-out
          cursor-pointer
          relative flex flex-col items-center  justify-center w-[10%] h-fit"
            onClick={() => handleBattle(stage)}
          >
            <img src={`${process.env.NEXT_PUBLIC_API_URL}/${stage.bg}`} alt={stage.name} className="w-full h-full object-cover" />
            <h1 className="flex justify-center items-center bg-opacity-25  absolute bg-black w-full h-full text-white text-2xl">{stage.name}</h1>
          </div>
        ))}
      </div>
    </>
  );
};

export default MenuStages;
