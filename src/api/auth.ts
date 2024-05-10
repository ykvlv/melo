import { API_URL } from "@env";

import { storage } from "@/storage/storage";

interface AuthResponse {
  token?: string;
  message?: string;
}

export const authenticate = async (
  username: string,
  password: string,
  isLogin: boolean,
): Promise<string | undefined> => {
  const endpoint = isLogin ? "auth/sign-in" : "auth/sign-up";
  try {
    console.log(`${API_URL}/api/${endpoint}`);
    console.log(`${API_URL}`);
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
      storage.set("jwtToken", data.token);
      return data.token;
    }

    throw new Error(data.message || "Unknown error");
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const logout = (): void => {
  storage.delete("jwtToken"); // Удаление JWT из хранилища
};
