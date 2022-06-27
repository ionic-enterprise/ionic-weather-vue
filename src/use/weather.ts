import { ref } from 'vue';
import { CurrentWeather, Forecast } from '../models';
import keys from './keys.json';
import useHttpClient from './http-client';
import useLocation from './location';

interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}
interface RawForecast {
  dt: number;
  weather: [WeatherCondition];
  temp: {
    min: number;
    max: number;
  };
}
interface OneCallResponse {
  current: {
    dt: number;
    temp: number;
    uvi: number;
    weather: [WeatherCondition];
  };
  daily: [RawForecast];
}

const { client } = useHttpClient();
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
  const res = await client.get(
    `/data/2.5/onecall?lat=${location.latitude}&lon=${location.longitude}&exclude=minutely,hourly&appid=${keys.openWeatherMap}`
  );
  currentWeather.value = convert(res.data, locationName);
};

const convertForecast = (daily: Array<RawForecast>): Array<Forecast> => {
  const result: Array<Forecast> = [];
  daily.forEach((day: RawForecast) => {
    result.push({
      date: new Date(day.dt * 1000),
      condition: day.weather[0].id,
      low: day.temp.min,
      high: day.temp.max,
    });
  });
  return result;
};

const convert = (data: OneCallResponse, location: string): CurrentWeather => {
  return {
    location,
    condition: data.current.weather[0].id,
    temperature: data.current.temp,
    uvIndex: data.current.uvi,
    forecasts: convertForecast(data.daily),
  };
};
const currentWeather = ref<CurrentWeather | undefined>();

fetchData();
setInterval(fetchData, 1000 * 60 * 5);

export default () => ({
  currentWeather,
  getUVAdvice,
});
