"use client";

import { CharacterData } from "@/types";
import Image from "next/image";

const Character = ({
  data,
  position,
}: CharacterData & { position: string }) => {
  const { id, name, health, attack, defense, speed, sprite, currentStats } =
    data;

  return (
    <div
      id={`character-${id}`}
      className="flex flex-col items-start justify-center"
    >
      <div
        style={{
          transform: position === "right" ? "scaleX(-1)" : "scaleX(1)",
        }}
      >
        {sprite && sprite.state !== undefined && (
          <Image
            id={`character-${id}-sprite`}
            src={sprite[sprite.state].url}
            alt={name}
            width={200}
            height={200}
            className="w-auto"
          />
        )}
      </div>
    </div>
  );
};

export default Character;
