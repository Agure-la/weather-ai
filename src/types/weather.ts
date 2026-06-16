export interface WeatherRequest {
  city?: string
  cityName?: string
  days?: number
  ai?: boolean
  units?: string
  lang?: string
}

export interface ForecastRequest {
  city: string
  days?: number
  ai?: boolean
}

export interface CurrentWeather {
  city?: string
  temperature?: number
  temp?: number
  feelsLike?: number
  humidity?: number
  windSpeed?: number
  description?: string
  condition?: string
  icon?: string
  pressure?: number
  visibility?: number
  uvIndex?: number
  sunrise?: string
  sunset?: string
  [key: string]: unknown
}

export interface ForecastDay {
  date?: string
  day?: string
  high?: number
  low?: number
  maxTemp?: number
  minTemp?: number
  temperature?: number
  description?: string
  condition?: string
  icon?: string
  precipitation?: number
  humidity?: number
  [key: string]: unknown
}

export interface HourlyForecast {
  condition_code: string
  feels_like: number
  humidity: number
  icon: string
  icon_path: string
  precipitation_probability: number
  temperature: number
  time: string
  uv_index: number
  wind_gust: number
  wind_speed: number
}


export interface ForecastWeather {
  current?: HourlyForecast
  hourly?: HourlyForecast[]
  location?: {
    country: string
    lat: number
    lon: number
    timezone: string
  }
  aiSummary?: string
}

export interface DailyWeather {
  city?: string
  days?: ForecastDay[]
  daily?: ForecastDay[]
  [key: string]: unknown
}

export interface HourlyWeather {
  city?: string
  hours?: HourlyForecast[]
  hourly?: HourlyForecast[]
  [key: string]: unknown
}
