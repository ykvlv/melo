import { API_URL } from "@env";

export interface MusicServiceResponse {
  connected: boolean;
  login: string;
  artists: Artist[];
  message?: string;
}

interface Artist {
  id: number;
  name: string;
  photoUrl?: string; // опциональное поле, так как photo_url может быть null
}

export const fetchMusicService = async (token: string, uri: string) => {
  try {
    const response = await fetch(`${API_URL}/api/user/${uri}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data: MusicServiceResponse = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Unknown error");
    }

    return data;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
