"use client";
import Battle from "@/app/screens/battle";
import Menu from "@/app/screens/menu";
import { ScreenList } from "@/types";
import { useState } from "react";

export default function Home() {
  const [screen, setScreen] = useState<ScreenList>("menu");
  return (
    <>
      {screen === "menu" && <Menu screen={screen} setScreen={setScreen} />}
      {screen === "battle" && <Battle screen={screen} setScreen={setScreen} />}
    </>
  );
}
