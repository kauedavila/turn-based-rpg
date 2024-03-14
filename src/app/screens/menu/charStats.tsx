const CharStats = ({ character }: any) => {
  return (
    <>
      <div
        className="flex flex-col 
                items-start justify-start w-full h-auto pb-2 text-sm"
      >
        <p>
          <strong className="text-base">{character?.name}</strong>
        </p>
        <ul>
          <li>LV {character?.level}</li>
          <li>
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
