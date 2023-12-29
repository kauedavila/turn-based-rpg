"use client";
import Battle from "@/app/screens/battle";
import Menu from "@/app/screens/menu";
import { CharacterData, ScreenList } from "@/types";
import { useState } from "react";

export default function Home() {
  const [screen, setScreen] = useState<ScreenList>("menu");
  const [battleCharacters, setBattleCharacters] = useState<CharacterData[]>([]);

  return (
    <>
      {screen === "menu" && (
        <Menu
          screen={screen}
          setScreen={setScreen}
          battleCharacters={battleCharacters}
          setBattleCharacters={setBattleCharacters}
        />
      )}
      {screen === "battle" && (
        <Battle
          screen={screen}
          setScreen={setScreen}
          battleCharacters={battleCharacters}
          setBattleCharacters={setBattleCharacters}
        />
      )}
    </>
  );
}
