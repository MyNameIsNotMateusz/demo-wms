export const BASE_API_URL = "https://dscpltest.pl/api/";

export const DEFAULT_HEADERS = (token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  return headers;
};
