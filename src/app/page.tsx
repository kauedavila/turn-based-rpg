"use client";
import Menu from "@/app/screens/menu";
import { useScreenStore } from "@/stores/useScreenStore";
import { useEffect } from "react";
import Battle from "./screens/battle";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function Home() {
  const screen = useScreenStore((state: any) => state?.screen);
  const setScreen = useScreenStore((state: any) => state?.setScreen);

  useEffect(() => {
    setScreen("menu");
  }, []);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <main id="battle-page" className="flex flex-col justify-center items-center h-screen bg-black">
        {screen === "menu" && <Menu />}
        {screen === "battle" && <Battle />}
      </main>
    </QueryClientProvider>
  );
}
