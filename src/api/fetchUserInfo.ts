import { API_URL } from "@env";

export interface FetchUserInfoResponse {
  username?: string;
  registeredAt?: string;
  role?: string;
  message?: string;
}

export const fetchUserInfo = async (token: string) => {
  try {
    const response = await fetch(`${API_URL}/api/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data: FetchUserInfoResponse = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Unknown error");
    }

    return data;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
