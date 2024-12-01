import axios from "axios";

export const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'text/plain',
    'Authorization': process.env.IGDB_ACCESS_TOKEN,
    'Client-ID': process.env.IGDB_CLIENT_ID
  }
})