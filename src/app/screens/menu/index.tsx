import { useParty } from "@/stores/useParty";
import templateSprites from "@/templates/sprites";
import { SpriteStates } from "@/types";

export default function Menu() {
  const party = useParty((state: any) => state?.party);

  console.log(party);
  return (
    <div
      id="menu-screen"
      className="relative bg-gray-900 h-[75%] w-[75%] flex  overflow-hidden"
      style={{
        backgroundImage: `url(https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/ca530ccc-fd0f-4f26-bbc7-9af8e8225eea/dd5qnyp-781f6297-22b0-46d8-b100-a34b741a1160.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2NhNTMwY2NjLWZkMGYtNGYyNi1iYmM3LTlhZjhlODIyNWVlYVwvZGQ1cW55cC03ODFmNjI5Ny0yMmIwLTQ2ZDgtYjEwMC1hMzRiNzQxYTExNjAucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.yxbgNBh9crVxUr4QfVmMITa488tmAqlbxQU-XlTSXgE)`,
        backgroundSize: "cover",
        backgroundPosition: "bottom",
      }}
    >
      <div id="toolbar"></div>
      <div
        id="party-list"
        className="flex flex-col items-start justify-start w-[25%] h-full bg-white rounded-r-md border-2 border-black bg-opacity-50"
      >
        {party?.map((character: any) => {
          const sprite = templateSprites.find(
            (item) => item.name === character.data.sprite.name
          );

          const spriteState: SpriteStates =
            character.data.sprite.state ?? "idle";

          const spriteUrl = sprite?.[spriteState]?.url;

          return (
            <div
              key={character.data.id}
              id={`party-list-character-${character.data.id}`}
              className="flex justify-start w-full h-auto p-2"
            >
              <div
                id={`party-list-character-${character.data.id}-sprite`}
                className="w-[50%] h-fit aspect-square"
                style={{
                  backgroundImage: `url(${spriteUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "top",
                }}
              ></div>

              <div
                id={`party-list-character-${character.data.id}-data`}
                className="flex flex-col
                items-start justify-start w-fit h-auto "
              >
                <p>
                  <strong>{character.data.name}</strong>
                </p>
                <p>
                  <strong>LV</strong>: {character.data.level}
                </p>
                <p>
                  <strong>HP</strong>: {character.data.health}
                </p>
                <p>
                  <strong>ATK</strong>: {character.data.attack}
                </p>
                <p>
                  <strong>DEF</strong>: {character.data.defense}
                </p>
                <p>
                  <strong>SPD</strong>: {character.data.speed}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
