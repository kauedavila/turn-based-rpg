import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL + "/api";

export const calculateExperience = (enemyLevel: CharacterData) => {
  const experience = enemyLevel;
  return experience;
};

const handleExp = async (exp: number, expAdd: number, charId: number) => {
  const newExp = exp + expAdd;
  const data = await axios.put(`${API_URL}/characters/${charId}`, {
    experience: newExp,
  });
  return data;
};

export default handleExp;
