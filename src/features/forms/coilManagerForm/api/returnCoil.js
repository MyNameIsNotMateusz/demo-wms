import { BASE_API_URL, DEFAULT_HEADERS } from "../../../../api/config";

export const returnCoil = async (payload, accessToken) => {
  return fetch(`${BASE_API_URL}warehouse/coils/return/`, {
    method: "POST",
    headers: DEFAULT_HEADERS(accessToken),
    body: JSON.stringify(payload),
  });
};
