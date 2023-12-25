"use client";

import { CharacterData } from "@/app/battle/page";
import Image from "next/image";

const Character = ({ data }: CharacterData) => {
  const { id, name, health, attack, defense, speed, sprite, currentStats } =
    data;

  const { state } = sprite || { state: "idle" };

  return (
    <div
      id={`character-${id}`}
      className="flex flex-col items-start justify-center"
    >
      <div className="w-full">
        {sprite && state !== undefined && (
          <Image
            id={`character-${id}-sprite`}
            src={sprite[state]}
            alt={name}
            width={200}
            height={200}
            className={`w-auto  ${
              currentStats?.health === 0 && "animate-death"
            }`}
          />
        )}
      </div>
    </div>
  );
};

export default Character;
