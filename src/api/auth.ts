import { API_URL } from "@env";

interface AuthResponse {
  token?: string;
  message?: string;
}

export const authenticate = async (
  username: string,
  password: string,
  isLogin: boolean,
): Promise<string> => {
  const endpoint = isLogin ? "auth/sign-in" : "auth/sign-up";
  try {
    const response = await fetch(`${API_URL}/api/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data: AuthResponse = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Unknown error");
    }

    if (data.token) {
      return data.token;
    }

    throw new Error(data.message || "Unknown error");
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
