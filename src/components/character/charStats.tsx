const CharStats = ({ character }: any) => {
  return (
    <>
      <div
        className="flex flex-col 
                items-start justify-start w-full h-full pb-2 text-sm"
      >
        <p>
          <strong className="text-base">{character?.name}</strong>
        </p>
        <ul className="text-sm">
          <li>
            <span>LV {character?.level} - </span>
            EXP {character?.experience} / {character?.level * 20}
          </li>
          <li>HP {character?.health}</li>
          <li>ATK {character?.attack}</li>
          <li>DEF {character?.defense}</li>
          <li>SPD {character?.speed}</li>
        </ul>
      </div>
    </>
  );
};

export default CharStats;
