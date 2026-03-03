import { BASE_API_URL } from "./config";
import { handleError } from "../utils/alerts";

export const login = async (loginPayload) => {
  try {
    const response = await fetch(`${BASE_API_URL}auth/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginPayload),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.errors?.[0] || "Invalid email or password");
    }

    return data;
  } catch (error) {
    handleError(error.message || "Please try again.");
    return null;
  }
};

export const logout = async (setAccessToken, clearAuthData, dispatch) => {
  setAccessToken(null);
  dispatch(clearAuthData());
};
