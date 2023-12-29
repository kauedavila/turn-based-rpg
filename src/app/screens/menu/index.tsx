import { CharacterData, ScreenList } from "@/types";

export default function Menu() {
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
      ></div>
    </main>
  );
}

// const CreateCharacter = () => {
//   return (
//     <main className="flex items-center justify-center w-full h-auto backdrop-blur">
//       <div className="w-1/2 h-fit flex flex-col justify-center items-center bg-gray-100 rounded-md shadow-md">
//         <h1 className="text-3xl font-bold">Create Character</h1>
//         <form></form>
//       </div>
//     </main>
//   );
// };
