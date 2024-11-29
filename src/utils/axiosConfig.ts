import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: 'https://api.igdb.com/v4',

  headers: {
    'Accept': 'application/json',
    'Content-Type': 'text/plain',
    'Authorization': `Bearer ${process.env.IGDB_ACCESS_TOKEN}`,
    'Client-ID': `${process.env.IGDB_CLIENT_ID}`
  }
})