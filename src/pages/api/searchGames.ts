import { NextApiRequest, NextApiResponse } from "next";
import { axiosInstance } from "@/utils/axiosConfig";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
      const { genres, languages } = req.body;
  
      const query = `fields name; where language_supports.language = (${languages.join(', ')}) & genres = (${genres.join(', ')}); limit: 120;`;
  
      try {
        const response = await axiosInstance.post('/games', query);
        res.status(200).json(response.data);
      } catch (error) {
        res.status(500).json({ error: "Erro ao buscar jogos" });
      }
    } else {
      res.status(405).json({ error: "Método não permitido" });
    }
  }
  
