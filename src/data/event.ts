export interface EventData {
  id: number;
  artistName: string;
  cityName: string;
  date: Date;
  createdAt: Date;
  stageName: string;
  photoUrl?: string;
  afishaUrl?: string;
  artistPhotoUrl?: string;
}

export interface FetchEventsResponse {
  events?: EventData[];
  message?: string;
}
