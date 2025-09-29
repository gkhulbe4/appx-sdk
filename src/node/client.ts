import axios, { type AxiosInstance } from "axios";

export function createClient(
  baseUrl: string,
  getToken?: () => string | null
): AxiosInstance {
  const client = axios.create({
    baseURL: baseUrl,
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (getToken) {
    client.interceptors.request.use((config) => {
      const token = getToken();
      if (token) config.headers.Authorization = `Bearer ${token}`;
      return config;
    });
  }
  return client;
}
