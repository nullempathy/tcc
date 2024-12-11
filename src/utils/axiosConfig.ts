import axios, {AxiosInstance} from "axios";

let accessToken: string | null = null;
let tokenExpiryTime: number | null = null;
let tokenType: string | null = null;

function isTokenExpired(): boolean {
  if(!tokenExpiryTime) {
    return true;
  }
  return Date.now() > tokenExpiryTime;
}

async function getAccessToken() {
  try {
    const response = await axios.post(
      "https://id.twitch.tv/oauth2/token",
      null,
      {
        params: {
          client_id: process.env.CLIENT_ID,
          client_secret: process.env.CLIENT_SECRET,
          grant_type: "client_credentials",
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    accessToken = response.data.access_token;
    tokenExpiryTime = Date.now() + response.data.expires_in * 1000;
    tokenType = response.data.token_type;
    console.log("Novo token obtido:", accessToken);
  } catch (error) {
    console.error("Error fetching access token:", error);
    throw error;
  }
}

async function getAxiosInstance(): Promise<AxiosInstance> {
  if (!accessToken || isTokenExpired()) {
    await getAccessToken();
  }

  return axios.create({
    headers: {
      "Authorization": `${tokenType} ${accessToken}`,
      "Client-ID": process.env.CLIENT_ID || "",
    },
  });
}

export { getAxiosInstance };