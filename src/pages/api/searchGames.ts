import { NextApiRequest, NextApiResponse } from "next";
import { axiosInstance } from "@/utils/axiosConfig";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === "POST") {
      const { genres, languages }= req.body;

      const query = verifyArrays(genres, languages);
  
      try {
        const response = await axiosInstance.post('https://api.igdb.com/v4/games', query);
        res.status(200).json(response.data);
      } catch {
        res.status(500).json({ error: "Erro ao buscar jogos" });
      }
    } else {
      res.status(405).json({ error: "Método não permitido" });
    }
  }
  
function verifyArrays(genres: string[], languages: string[]){

  if (genres.length > 0 && languages.length > 0) {
    return `fields name, cover.image_id, language_supports.language, summary; where cover.image_id != null & language_supports.language != null & summary != null & language_supports.language = (${languages.join(', ')}) & genres = (${genres.join(', ')}); limit: 120;`;
  } else if (genres.length === 0 && languages.length > 0) {
    return `fields name, cover.image_id, language_supports.language, summary; where cover.image_id != null & language_supports.language != null & summary != null & language_supports.language = (${languages.join(', ')}); limit: 120;`;
  } else if (genres.length > 0 && languages.length === 0) {
    return `fields name, cover.image_id, language_supports.language, summary; where cover.image_id != null & language_supports.language != null & summary != null & genres = (${genres.join(', ')}); limit: 120;`;
  } else {
    return ` fields name, cover.image_id, language_supports.language, summary; where cover.image_id != null & language_supports.language != null & summary != null; limit 120;`;
  }
  
}