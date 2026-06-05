export interface WeatherRequest {
  cityName: string;
  days?: number;
  ai?: boolean;
  units?: string;
  lang?: string;
}