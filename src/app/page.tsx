"use client";
import Menu from "@/app/screens/menu";
import { useScreenStore } from "@/stores/useScreenStore";
import Battle from "./screens/battle";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Login from "./screens/login";

export default function Home() {
  const screen = useScreenStore((state: any) => state?.screen);
  const setScreen = useScreenStore((state: any) => state?.setScreen);

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
        {screen === "login" && <Login />}
        {screen === "menu" && <Menu />}
        {screen === "battle" && <Battle />}
      </main>
    </QueryClientProvider>
  );
}
