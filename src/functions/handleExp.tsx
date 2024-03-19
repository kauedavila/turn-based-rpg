import { CharacterData } from "@/types";

const handleExp = async (exp: number, charId: number, characters: any[]) => {
  const findChar = characters.find((char) => char.id === charId)?.attributes;
  const newExp = exp + Number(findChar?.experience);
  const data = await fetch(`http://localhost:3000/api/characters/${charId}`, {
    method: "PUT",
    mode: "cors",
    body: JSON.stringify({ data: { experience: newExp } }),
    headers: { "Content-Type": "application/json", Authorization: `bearer ${process.env.NEXT_PUBLIC_API_TOKEN_SALT}` },
  })
    .then((response) => response.json())
    .catch((error) => console.error(error));
};

export default handleExp;
