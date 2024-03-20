import { useScreenStore } from "@/stores/useScreenStore";
import { usePartyStore } from "@/stores/usePartyStore";
import { CharacterData } from "@/types";
import { useEffect, useState } from "react";
import CharacterMenuData from "@/components/characterMenuData";
import { useStagesStore } from "@/stores/useStageStore";
import useStages from "@/app/hooks/useStages";
import useCharacters from "@/app/hooks/useCharacters";
import SelectCharacter from "@/components/character/selectCharacter";
import MenuParty from "@/components/menu/menuParty";

export default function Menu() {
  const party = usePartyStore((state: any) => state?.party);
  const setParty = usePartyStore((state: any) => state?.setParty);
  const [selectingCharacter, setSelectingCharacter] = useState<number>(0);

  const characters = useCharacters().data;

  const setScreen = useScreenStore((state: any) => state?.setScreen);

  const stages = useStages().data;
  const setStage = useStagesStore((state: any) => state?.setStage);

  useEffect(() => {
    const updatedParty =
      characters &&
      party.map((character: CharacterData) => {
        const updatedCharacter = characters?.find((item: CharacterData) => item._id === character._id);
        updatedCharacter._id = character._id;
        return updatedCharacter;
      });

    characters && setParty(updatedParty);
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
      <MenuParty selectingCharacter={selectingCharacter} setSelectingCharacter={setSelectingCharacter} />
    </div>
  );
}
