import { Forecast } from './Forecast';

export interface CurrentWeather {
  location: string;
  condition: number;
  temperature: number;
  uvIndex: number;
  forecasts: Array<Forecast>;
}
