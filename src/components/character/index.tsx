"use client";

import { templateProjectiles } from "@/templates/projectiles";
import templateSprites from "@/templates/sprites";
import { CharacterData, SpriteDataType } from "@/types";
import Image from "next/image";

const Character = ({
  data,
  position,
}: CharacterData & { position: string }) => {
  const { id, name, sprite } = data;

  const spritesData = templateSprites as SpriteDataType[];
  const projectilesData = templateProjectiles;

  const currentSprite = spritesData.find(
    (item) => item.name === sprite?.name
  ) as SpriteDataType;

  const spriteState = currentSprite?.state ?? "idle";
  const url = currentSprite?.[spriteState]?.url ?? "";

  return (
    <div
      id={`character-${position}`}
      className="relative flex flex-col items-start justify-center w-auto h-auto"
    >
      <div
        style={{
          transform: position === "right" ? "scaleX(-1)" : "scaleX(1)",
        }}
      >
        {url && (
          <Image
            id={`character-${position}-sprite`}
            src={url}
            alt={name}
            width={200}
            height={200}
            className="w-auto"
          />
        )}
      </div>
      {Array(projectilesData[0].projectiles.length)
        .fill(0)
        .map((_, index) => (
          <Image
            key={`projectile-${projectilesData[0].projectiles[index]?.name}`}
            id={`projectile-${projectilesData[0].projectiles[index]?.name}`}
            src={projectilesData[0].projectiles[index]?.url}
            alt={projectilesData[0].projectiles[index]?.name || ""}
            width={projectilesData[0].projectiles[index].width}
            height={projectilesData[0].projectiles[index].height}
            className={"hidden absolute m-auto"}
          />
        ))}
    </div>
  );
};

export default Character;
