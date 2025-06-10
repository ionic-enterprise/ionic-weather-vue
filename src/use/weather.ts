import { ref } from 'vue';
import { CurrentWeather, Forecast } from '../models';
import keys from './keys.json';
import { useHttp } from './http-client';
import { useLocation } from './location';

interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}
interface ForecastResponse {
  list: [
    {
      dt: number;
      weather: [WeatherCondition];
      main: {
        temp_min: number;
        temp_max: number;
      };
    },
  ];
}
interface WeatherResponse {
  dt: number;
  main: {
    temp: number;
  };
  weather: [WeatherCondition];
}

const { client } = useHttp();
const { getCurrentLocation, getLocationName } = useLocation();

const getUVAdvice = (uvIndex: number): string => {
  const risk = riskLevel(uvIndex);
  return [
    'Wear sunglasses on bright days. If you burn easily, cover up and use broad spectrum SPF 30+ sunscreen. ' +
      'Bright surfaces, such as sand, water and snow, will increase UV exposure.',
    'Stay in the shade near midday when the sun is strongest. If outdoors, wear sun protective clothing, ' +
      'a wide-brimmed hat, and UV-blocking sunglasses. Generously apply broad spectrum SPF 30+ sunscreen every ' +
      '2 hours, even on cloudy days, and after swimming or sweating. Bright surfaces, such as sand, water and ' +
      'snow, will increase UV exposure.',
    'Reduce time in the sun between 10 a.m. and 4 p.m. If outdoors, seek shade and wear sun protective clothing, ' +
      'a wide-brimmed hat, and UV-blocking sunglasses. Generously apply broad spectrum SPF 30+ sunscreen every 2 ' +
      'hours, even on cloudy days, and after swimming or sweating. Bright surfaces, such sand, water and snow, will ' +
      'increase UV exposure.',
    'Minimize sun exposure between 10 a.m. and 4 p.m. If outdoors, seek shade and wear sun protective clothing, ' +
      'a wide-brimmed hat, and UV-blocking sunglasses. Generously apply broad spectrum SPF 30+ sunscreen every 2 ' +
      'hours, even on cloudy days, and after swimming or sweating. Bright surfaces, such as sand, water and snow, ' +
      'will increase UV exposure.',
    'Try to avoid sun exposure between 10 a.m. and 4 p.m. If outdoors, seek shade and wear sun protective clothing, ' +
      'a wide-brimmed hat, and UV-blocking sunglasses. Generously apply broad spectrum SPF 30+ sunscreen every ' +
      '2 hours, even on cloudy days, and after swimming or sweating. Bright surfaces, such as sand, water and snow, ' +
      'will increase UV exposure.',
  ][risk];
};

const riskLevel = (value: number): number => {
  if (value < 3) {
    return 0;
  }
  if (value < 6) {
    return 1;
  }
  if (value < 8) {
    return 2;
  }
  if (value < 11) {
    return 3;
  }
  return 4;
};

const fetchData = async (): Promise<void> => {
  const location = await getCurrentLocation();
  const locationName = await getLocationName(location);
  const weather = await client.get(
    `/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${keys.openWeatherMap}`,
  );
  const forecast = await client.get(
    `/data/2.5/forecast?lat=${location.latitude}&lon=${location.longitude}&appid=${keys.openWeatherMap}`,
  );
  currentWeather.value = convert(weather.data, forecast.data, locationName);
};

const convertForecast = (forecast: ForecastResponse): Array<Forecast> => {
  const result: Array<Forecast> = [];
  forecast.list.forEach((day) => {
    result.push({
      date: new Date(day.dt * 1000),
      condition: day.weather[0].id,
      low: day.main.temp_min,
      high: day.main.temp_max,
    });
  });
  return result;
};

const convert = (weather: WeatherResponse, forecast: ForecastResponse, location: string): CurrentWeather => {
  return {
    location,
    condition: weather.weather[0].id,
    temperature: weather.main.temp,
    uvIndex: Math.floor(Math.random() * 14) + 1,
    forecasts: convertForecast(forecast),
  };
};
const currentWeather = ref<CurrentWeather | undefined>();

fetchData();
setInterval(fetchData, 1000 * 60 * 5);

export const useWeather = () => ({
  currentWeather,
  getUVAdvice,
});
