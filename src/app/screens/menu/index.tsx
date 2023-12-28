import { ScreenList } from "@/types";

export default function Menu({
  screen,
  setScreen,
}: {
  screen: ScreenList;
  setScreen: (screen: ScreenList) => void;
}) {
  return (
    <main
      id="battle-page"
      className="flex flex-col justify-center items-center h-screen bg-black "
    >
      <div
        id="menu-screen"
        className="relative bg-gray-900 h-[75%] w-[75%] flex  overflow-hidden"
        style={{
          backgroundImage: `url(https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/ca530ccc-fd0f-4f26-bbc7-9af8e8225eea/dd5qnyp-781f6297-22b0-46d8-b100-a34b741a1160.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2NhNTMwY2NjLWZkMGYtNGYyNi1iYmM3LTlhZjhlODIyNWVlYVwvZGQ1cW55cC03ODFmNjI5Ny0yMmIwLTQ2ZDgtYjEwMC1hMzRiNzQxYTExNjAucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.yxbgNBh9crVxUr4QfVmMITa488tmAqlbxQU-XlTSXgE)`,
          backgroundSize: "cover",
          backgroundPosition: "bottom",
        }}
      >
        <div id="menu-hud">
          <button
            onClick={() => setScreen("battle")}
            className="bg-white text-black font-bold p-4 rounded-lg shadow-lg"
          >
            Start
          </button>
        </div>
      </div>
    </main>
  );
}
