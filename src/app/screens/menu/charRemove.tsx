import { useParty } from "@/stores/useParty";

const CharRemove = ({ index }: { index: number }) => {
  const party = useParty((state: any) => state?.party);
  const setParty = useParty((state: any) => state?.setParty);

  const handleRemoveFromParty = (index: number) => {
    const newParty = [...party];
    newParty[index] = undefined;
    setParty(newParty);
  };

  return (
    <>
      <div className="flex flex-col items-start justify-start w-full h-full pb-2">
        <strong>Remove from party?</strong>
        <button className="p-1 w-full h-auto bg-red-500 rounded-md text-white cursor-pointer" onClick={() => handleRemoveFromParty(index)}>
          Remove
        </button>
      </div>
    </>
  );
};

export default CharRemove;
