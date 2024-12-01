import { NextApiRequest, NextApiResponse } from "next";

import { axiosInstance } from "@/utils/axiosConfig";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if(req.method === "GET"){
        const { id } = req.body;

        try {
            const response = await axiosInstance.get(`https://images.igdb.com/igdb/image/upload/t_screenshot_med/${id}.jpg`);

            console.log(response)

            res.status(200).json(response.data);
        } 
        catch (e){
            res.status(500).json(e)
        }
    } else {
        res.status(405).json({error: "Metodo não permitido"})
    }

}