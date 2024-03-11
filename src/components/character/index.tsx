"use client";

import { templateProjectiles } from "@/templates/projectiles";
import { CharacterData, SpriteDataType } from "@/types";
import Image from "next/image";
import { useSprites } from "@/stores/useSprite";

const Character = ({ attributes, position }: any) => {
  const { id, name, sprite } = attributes;
  const sprites = useSprites((state: any) => state?.sprites);

  const projectilesData = templateProjectiles;

  const currentSprite = sprites.find((item: any) => item.attributes.name === sprite?.name) as SpriteDataType;

  // const spriteState = currentSprite?.state ?? "idle";
  const spriteState = "idle";
  const spriteUrl = currentSprite?.attributes?.[spriteState]?.data.attributes.url ?? "";

  return (
    <div id={`character-${position}`} className="relative flex flex-col items-start justify-center w-auto h-auto">
      <div
        style={{
          transform: position === "right" ? "scaleX(-1)" : "scaleX(1)",
        }}
      >
        {spriteUrl && <Image id={`character-${position}-sprite`} src={`http://localhost:1337${spriteUrl}`} alt={name} width={position === "right" ? 150 : 200} height={200} className="h-auto" />}
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
