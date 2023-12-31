"use client";
import Menu from "@/app/screens/menu";
import { useScreen } from "@/stores/screen";
import { useCharacter } from "@/stores/character";
import { useEffect } from "react";
import templateCharacters from "@/templates/characters";
import { useParty } from "@/stores/useParty";
import Battle from "./screens/battle";

export default function Home() {
  // const [battleCharacters, setBattleCharacters] = useState<CharacterData[]>([]);

  const screen = useScreen((state: any) => state?.screen);
  const setScreen = useScreen((state: any) => state?.setScreen);

  useEffect(() => {
    setScreen("menu");
  }, []);

  return (
    <main
      id="battle-page"
      className="flex flex-col justify-center items-center h-screen bg-black"
    >
      {screen === "menu" && <Menu />}
      {screen === "battle" && <Battle />}
    </main>
  );
}
