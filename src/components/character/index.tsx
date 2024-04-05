"use client";

import { templateProjectiles } from "@/templates/projectiles";
import Image from "next/image";

type BattleCharProps = {
  id: number;
  name: string;
  sprite: string | undefined;
  position: string;
};

const Character = ({ id, name, sprite, position }: BattleCharProps) => {
  const projectilesData = templateProjectiles;

  return (
    <div id={`character-${position}`} className="relative flex flex-col items-start justify-center w-auto h-auto">
      <div
        style={{
          transform: position === "right" ? "scaleX(-1)" : "scaleX(1)",
        }}
      >
        {sprite && (
          <Image
            id={`character-${position}-sprite`}
            src={`${process.env.NEXT_PUBLIC_API_URL}/public/uploads/classes/${sprite}`}
            alt={name}
            width={position === "right" ? 150 : 200}
            height={200}
            className="h-auto"
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
