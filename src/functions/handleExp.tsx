const handleExp = async (exp: number, party: CharacterData[], characters: CharacterData[]) => {
  const findChar = characters.find((char) => char.id === party[0].id);
  const newExp = Number(exp) + Number(findChar?.attributes?.experience);
  console.log(newExp);
  const data = await fetch(`http://localhost:1337/api/characters/${party[0].id}`, {
    method: "PUT",
    mode: "cors",
    body: JSON.stringify({ data: { experience: newExp } }),
    headers: { "Content-Type": "application/json", Authorization: `bearer ${process.env.NEXT_PUBLIC_API_TOKEN_SALT}` },
  })
    .then((response) => response.json())
    .catch((error) => console.error(error));
};

export default handleExp;
