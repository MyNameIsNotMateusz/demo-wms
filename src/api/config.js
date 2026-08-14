export const BASE_API_URL = process.env.REACT_APP_API_URL;

export const DEFAULT_HEADERS = (token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  return headers;
};
