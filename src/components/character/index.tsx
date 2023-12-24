"use client";

import { CharacterData } from "@/app/battle/page";
import Image from "next/image";

const Character = ({ data }: CharacterData) => {
  const { id, name, health, attack, defense, speed, sprite, currentStats } =
    data;

  return (
    <div
      id={`character-${id}`}
      className="relative flex flex-col items-center justify-center w-[50%] h-[25%]"
    >
      {sprite && (
        <Image
          id={`character-${id}-sprite`}
          src={sprite}
          alt={name}
          width={200}
          height={200}
          objectFit="contain"
          className="w-1/2 h-1/2 object-contain"
        />
      )}
      <p className="text-white">{name}</p>
      <p className="text-white">
        HP: {currentStats?.health} / {health}
      </p>
      <div className="absolute hidden animate-bounce" />
    </div>
  );
};

export default Character;
