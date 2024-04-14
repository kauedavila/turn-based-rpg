import useClasses from "@/app/hooks/useClasses";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { nameByRace } from "fantasy-name-generator";
import { fetchData as fetchSprites } from "@/app/hooks/useClassSprites";
import useRecruit from "@/app/hooks/useRecruit";

const MenuRecruit = () => {
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      class: "",
      name: "",
      sprite: "",
    },
  });
  const [rolled, setRolled] = useState(false);

  const classes = useClasses();
  const recruit = useRecruit();

  const [selectedClass, setSelectedClass] = useState("random");
  const [selectedClassFolder, setSelectedClassFolder] = useState("");
  const [selectedSprite, setSelectedSprite] = useState("");

  const handleRoll = async () => {
    setRolled(true);

    //Pick Class
    const randomClass = Math.floor(Math.random() * classes.data?.length);
    const className = classes.data?.[randomClass].name;

    if (selectedClass === "random") {
      setValue("class", className);
    } else {
      setValue("class", selectedClass);
    }

    //Pick Name
    const name = nameByRace("human", {
      allowMultipleNames: false,
    }) as string;

    setValue("name", name);

    //Pick Sprite
    const spriteFolder = selectedClass === "random" ? classes.data?.[randomClass].spriteFolder : classes.data?.find((item: any) => item.name === selectedClass)?.spriteFolder;

    const sprites = await fetchSprites(spriteFolder);

    const randomSprite = Math.floor(Math.random() * sprites?.data?.filesResult.length);
    const sprite = sprites?.data?.filesResult[randomSprite];
    setValue("sprite", spriteFolder + "/" + sprite);
    setSelectedSprite(sprite);
    setSelectedClassFolder(spriteFolder);
  };

  return (
    <div
      id="menu-recruit"
      className=" flex items-center justify-center backdrop-filter backdrop-blur-lg bg-opacity-50 bg-gray-900
   z-10 w-full h-full"
    >
      <div className="grid grid-cols-2 w-[50%] h-[50%] bg-gray-900 border-2 border-gray-100 rounded-md">
        <div id="recruit-image" className="flex flex-col items-center justify-center w-full h-full ">
          {selectedSprite && (
            <Image
              src={`
          ${process.env.NEXT_PUBLIC_API_URL}/public/uploads/classes/${selectedClassFolder}/${selectedSprite}
          `}
              alt="sprite"
              width={150}
              height={200}
              className="h-auto"
            />
          )}
        </div>

        {!rolled ? (
          <div className="flex flex-col items-center justify-between w-full h-full ">
            <div id="class-select" className="flex items-center justify-between w-full h-full">
              <label
                htmlFor="random-class"
                className={`flex justify-center w-full text-center text-white border-white items-center h-20  border-2 hover:bg-gray-400 focus:outline-none active:bg-gray-500 rounded-md cursor-pointer
                      ${selectedClass === "random" ? "bg-gray-500" : "bg-gray-900 border-2 "}
                      `}
                onClick={() => {
                  setSelectedClass("random");
                }}
              >
                Random Class
                <input type="radio" name="random-class" value={"random"} className="hidden" />
              </label>
              {classes.data?.length > 0 &&
                classes.data?.map((item: any, index: any) => {
                  return (
                    <label
                      key={index}
                      htmlFor={item.name}
                      className={`flex justify-center w-full text-center text-white border-white items-center h-20  border-2 hover:bg-gray-400 focus:outline-none active:bg-gray-500 rounded-md cursor-pointer
                      ${selectedClass === item.name ? "bg-gray-500" : "bg-gray-900 border-2 "}
                      `}
                      onClick={() => {
                        setSelectedClass(item.name);
                      }}
                    >
                      {item.name}
                      <input type="radio" name="class" value={item.name} className="hidden" />
                    </label>
                  );
                })}
            </div>
            <button
              className="w-full h-20  bg-gray-300 hover:bg-gray-400 focus:outline-none active:bg-gray-500 rounded-md cursor-pointer"
              onClick={() => {
                handleRoll();
              }}
            >
              Roll
            </button>
          </div>
        ) : (
          <form
            id="recruit-select"
            className="flex flex-col items-start justify-between w-full h-full "
            onSubmit={handleSubmit((data) => {
              recruit.mutate(data);
            })}
          >
            <label htmlFor="class" className="text-white flex items-center gap-2 w-full h-20">
              Class
              <input type="text" className="text-black w-full h-10  rounded-md" {...register("class")} readOnly />
            </label>
            <label htmlFor="name" className="text-white flex items-center gap-2 w-full h-20">
              Name
              <input type="text" className="text-black w-full h-10  rounded-md" {...register("name")} readOnly />
            </label>
            <div className="flex items-end justify-center gap-2  w-full h-full">
              <input
                type="button"
                value="Re-roll"
                className="w-full h-20 bg-gray-300 hover:bg-gray-400 focus:outline-none active:bg-gray-500 rounded-md cursor-pointer"
                onClick={() => {
                  handleRoll();
                }}
              />
              <input type="submit" value="Recruit" className="w-full h-20 bg-gray-300 hover:bg-gray-400 focus:outline-none active:bg-gray-500 rounded-md cursor-pointer" />
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default MenuRecruit;
