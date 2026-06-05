export interface CreateLocationRequest {
  city: string;
  latitude: number;
  longitude: number;
}

export interface LocationResponse {
  id: string;
  city: string;
  latitude: number;
  longitude: number;
}