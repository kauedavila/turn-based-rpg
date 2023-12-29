"use client";
import Menu from "@/app/screens/menu";
import { useScreen } from "@/stores/screen";
import { useCharacter } from "@/stores/character";
import { useEffect } from "react";
import templateCharacters from "@/templates/characters";
import { useParty } from "@/stores/useParty";

export default function Home() {
  // const [battleCharacters, setBattleCharacters] = useState<CharacterData[]>([]);

  const screen = useScreen((state: any) => state?.screen);
  const setScreen = useScreen((state: any) => state?.setScreen);
  const setParty = useParty((state: any) => state?.setParty);

  useEffect(() => {
    setScreen("menu");
    setParty(templateCharacters);
  }, []);

  return (
    <main
      id="battle-page"
      className="flex flex-col justify-center items-center h-screen bg-black"
    >
      {screen === "menu" && <Menu />}
      {/* {screen === "battle" && (
        <Battle
          battleCharacters={battleCharacters}
          setBattleCharacters={setBattleCharacters}
        />
      )} */}
    </main>
  );
}
