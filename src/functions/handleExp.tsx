import { CharacterData } from "@/types";

const handleExp = async (exp: number, charId: number, characters: CharacterData[]) => {
  const findChar = characters.find((char: any) => char.id === charId);
  const newExp = Number(exp) + Number(findChar?.attributes?.experience);
  const data = await fetch(`http://localhost:1337/api/characters/${charId}`, {
    method: "PUT",
    mode: "cors",
    body: JSON.stringify({ data: { experience: newExp } }),
    headers: { "Content-Type": "application/json", Authorization: `bearer ${process.env.NEXT_PUBLIC_API_TOKEN_SALT}` },
  })
    .then((response) => response.json())
    .catch((error) => console.error(error));
};

export default handleExp;
