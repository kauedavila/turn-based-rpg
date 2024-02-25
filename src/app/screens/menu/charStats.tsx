const CharStats = ({ character }: any) => {
  return (
    <>
      <div
        className="flex flex-col
                items-start justify-start w-full h-auto pb-2"
      >
        <p>
          <strong>{character?.name}</strong>
        </p>
        <p>
          <strong>LV</strong>: {character?.level}
        </p>
        <p>
          <strong>HP</strong>: {character?.health}
        </p>
        <p>
          <strong>ATK</strong>: {character?.attack}
        </p>
        <p>
          <strong>DEF</strong>: {character?.defense}
        </p>
        <p>
          <strong>SPD</strong>: {character?.speed}
        </p>
      </div>
    </>
  );
};

export default CharStats;
