import { API_URL } from "@env";

export interface FetchEventResponse {
  id: number;
  artistName: string;
  cityName: string;
  date: Date;
  createdAt: Date;
  stageName: string;
  photoUrl?: string;
  afishaUrl?: string;
  artistPhotoUrl?: string;
  latitude?: number;
  longitude?: number;
  message?: string;
}

export const fetchEvent = async (token: string, id: string) => {
  try {
    const response = await fetch(`${API_URL}/api/event/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data: FetchEventResponse = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Unknown error");
    }

    return data;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
