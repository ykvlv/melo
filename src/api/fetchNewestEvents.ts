import { API_URL } from "@env";

import { FetchEventsResponse } from "@/data/event";

export const fetchNewestEvents = async (token: string) => {
  try {
    const response = await fetch(`${API_URL}/api/event/search`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // onlyActual: true,
        pagingOptions: {
          pageNumber: 0,
          pageSize: 10,
          sortingOptions: [
            {
              attributeName: "createdAt",
              descending: false,
            },
          ],
        },
      }),
    });

    const data: FetchEventsResponse = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Unknown error");
    }

    return data;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
