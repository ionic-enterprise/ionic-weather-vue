import axios from 'axios';
import { ref } from 'vue';
import { CurrentWeather, Forecast, IconMap } from '../models';
import keys from './keys.json';

const client = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

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

const icons: IconMap = {
  sunny: 'assets/images/sunny.png',
  cloudy: 'assets/images/cloudy.png',
  lightRain: 'assets/images/light-rain.png',
  shower: 'assets/images/shower.png',
  sunnyThunderStorm: 'assets/images/partial-tstorm.png',
  thunderStorm: 'assets/images/tstorm.png',
  fog: 'assets/images/fog.png',
  snow: 'assets/images/snow.png',
  unknown: 'assets/images/dunno.png',
};

const getData = async (): Promise<any> => {
  const res = await client.get(
    `/onecall?lat=43.074085&lon=-89.381027&exclude=minutely,hourly&appid=${keys.openWeatherMap}`
  );
  return res.data;
};

const convertForecast = (daily: Array<any>): Array<Array<Forecast>> => {
  const result: Array<Array<Forecast>> = [];
  daily.forEach((day: any) => {
    result.push([
      {
        date: new Date(day.dt * 1000),
        condition: day.weather[0].id,
        temperature: day.temp.min,
      },
      {
        date: new Date(day.dt * 1000),
        condition: day.weather[0].id,
        temperature: day.temp.max,
      },
    ]);
  });
  return result;
};

const convert = (data: any): CurrentWeather => {
  return {
    condition: data.current.weather[0].id,
    temperature: data.current.temp,
    uvIndex: data.current.uvi,
    forecasts: convertForecast(data.daily),
  };
};
const currentWeather = ref<CurrentWeather | undefined>();

const refresh = async () => {
  const response = await getData();
  currentWeather.value = convert(response);
};

refresh();
setInterval(refresh, 1000 * 60 * 5);

export default () => ({
  currentWeather,
  getUVAdvice,
  icons,
});
