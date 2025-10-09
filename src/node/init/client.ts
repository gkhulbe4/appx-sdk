import axios, { type AxiosInstance } from "axios";

export function createClient(
  baseUrl: string,
  getToken?: () => string | null
): AxiosInstance {
  const client = axios.create({
    baseURL: baseUrl,
    // withCredentials: true,
    headers: {
      "auth-key": "appxapi",
      "client-service": "Appx",
      source: "website",
    },
  });

  if (getToken) {
    client.interceptors.request.use((config) => {
      const currentUser = localStorage.getItem("current_user");
      if (currentUser) {
        const parsed = JSON.parse(currentUser);
        if (parsed.token) {
          config.headers.Authorization = parsed.token;
        }
      }
      return config;
    });
  }
  return client;
}
