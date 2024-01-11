import { CharacterData } from "@/types";
import { useEffect, useState } from "react";

const CharStats = ({ character }: any) => {
  return (
    <>
      <div
        className="flex flex-col
                items-start justify-start w-full h-auto pb-2"
      >
        <p>
          <strong>{character?.data?.name}</strong>
        </p>
        <p>
          <strong>LV</strong>: {character?.data?.level}
        </p>
        <p>
          <strong>HP</strong>: {character?.data?.health}
        </p>
        <p>
          <strong>ATK</strong>: {character?.data?.attack}
        </p>
        <p>
          <strong>DEF</strong>: {character?.data?.defense}
        </p>
        <p>
          <strong>SPD</strong>: {character?.data?.speed}
        </p>
      </div>
    </>
  );
};

export default CharStats;
