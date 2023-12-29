"use client";

import { spritesData } from "@/templates/characters";
import { CharacterData, SpriteDataType } from "@/types";
import Image from "next/image";

const Character = ({
  data,
  position,
}: CharacterData & { position: string }) => {
  const { id, name, health, attack, defense, speed, sprite, currentStats } =
    data;

  const currentSprite = spritesData.find(
    (item) => item.name === sprite?.name
  ) as SpriteDataType;

  const spriteState = currentSprite?.state ?? "idle";
  const url = currentSprite?.[spriteState]?.url ?? "";

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
        {url && (
          <Image
            id={`character-${id}-sprite`}
            src={url}
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
