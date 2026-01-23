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

    if (!response.ok) {
      const errorData = await response.json();
      handleError(errorData.message || "Invalid email or password");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Login error: ", error);
    handleError("Please try again.");
  }
};

export const logout = async (setAccessToken, clearUser, dispatch) => {
  setAccessToken(null);
  dispatch(clearUser());
};
