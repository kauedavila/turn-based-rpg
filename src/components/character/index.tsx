"use client";

import { templateProjectiles } from "@/templates/projectiles";
import templateSprites from "@/templates/sprites";
import { CharacterData, SpriteDataType } from "@/types";
import Image from "next/image";
import CharacterImage from "./characterImage";
import { useSprites } from "@/stores/useSprite";

const Character = ({ data, position }: CharacterData & { position: string }) => {
  const { id, name, sprite } = data;
  const sprites = useSprites((state: any) => state?.sprites);

  const projectilesData = templateProjectiles;

  const currentSprite = sprites.find((item) => item.attributes.name === sprite?.name) as SpriteDataType;
  console.log(sprite?.name);

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
        {spriteUrl && <Image id={`character-${position}-sprite`} src={`http://localhost:1337${spriteUrl}`} alt={name} width={400} height={400} className="w-auto" />}
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
