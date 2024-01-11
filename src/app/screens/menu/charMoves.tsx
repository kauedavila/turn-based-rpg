import { attackData } from "@/templates/attacks";

const CharMoves = ({ character }: any) => {
  return (
    <>
      <div
        className="flex flex-col gap-1 
                items-start justify-start w-full h-auto "
      >
        {character?.data?.moves?.map((move: any, index: number) => {
          const attack = attackData.find(
            (attack) => attack.attackName === move.name
          );
          return (
            <div
              key={index}
              className="p-1 w-full h-auto bg-gray-700 rounded-md text-white text-sm cursor-pointer"
            >
              <strong>{attack?.attackDisplayName}</strong>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default CharMoves;
