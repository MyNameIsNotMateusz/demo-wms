import { BASE_API_URL, DEFAULT_HEADERS } from "../../../../api/config";

export const getCoilDetails = async (coilId, accessToken) => {
  if (!coilId?.trim()) {
    return null;
  }

  const response = await fetch(`${BASE_API_URL}warehouse/coils/detail/`, {
    method: "POST",
    headers: DEFAULT_HEADERS(accessToken),
    body: JSON.stringify({
      coil_id: coilId,
    }),
  });

  if (!response.ok) {
    console.error("Błąd przy pobieraniu szczegółów coila.", response.status);

    return null;
  }

  const data = await response.json();

  return data;
};
