export const BASE_API_URL = "http://46.224.34.226/api/";

export const DEFAULT_HEADERS = (token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  return headers;
};
