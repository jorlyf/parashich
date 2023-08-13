import { BASE_URL_DATA } from "@http/api";

export const getApiUrl = (url?: string) => {
  if (!url) return url;
  return `${BASE_URL_DATA}/${url}`;
}