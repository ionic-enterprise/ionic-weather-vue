import { useHttp } from '@/use/http-client';
import keys from '@/use/keys.json';
import { useLocation } from '@/use/location';
import { Geolocation } from '@capacitor/geolocation';
import { Mock, beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@capacitor/geolocation');
vi.mock('@/use/http-client');

describe('useLocation', () => {
  const { client } = useHttp();
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('get location name', () => {
    const { getLocationName } = useLocation();

    it('sends the location to the API', async () => {
      await getLocationName({ latitude: 43.45993, longitude: -76.2435 });
      expect(client.get).toHaveBeenCalledTimes(1);
      expect(client.get).toHaveBeenCalledWith(
        `/geo/1.0/reverse?lat=43.45993&lon=-76.2435&appid=${keys.openWeatherMap}`
      );
    });

    it('returns the city with the postal abbreviation', async () => {
      (client.get as Mock).mockResolvedValue({
        data: [{ name: 'Bismark', state: 'South Dakota', country: 'United States' }],
      });
      const res = await getLocationName({ latitude: 43.45993, longitude: -76.2435 });
      expect(res).toEqual('Bismark, SD');
    });

    it('return the city and the country if there is no state', async () => {
      (client.get as Mock).mockResolvedValue({ data: [{ name: 'London', country: 'England' }] });
      const res = await getLocationName({ latitude: 43.45993, longitude: -76.2435 });
      expect(res).toEqual('London, England');
    });

    it('returns unknown if there is no useful information', async () => {
      (client.get as Mock).mockResolvedValue({ data: [] });
      const res = await getLocationName({ latitude: 43.45993, longitude: -76.2435 });
      expect(res).toEqual('Unknown');
    });
  });

  describe('current location', () => {
    const { getCurrentLocation } = useLocation();

    it('queries for the current position', async () => {
      await getCurrentLocation();
      expect(Geolocation.getCurrentPosition).toHaveBeenCalledTimes(1);
    });

    it('resolves the coordinates of the position', async () => {
      (Geolocation.getCurrentPosition as Mock).mockResolvedValue({
        timestamp: 1657819201229,
        coords: {
          accuracy: 328,
          altitude: null,
          altitudeAccuracy: null,
          heading: null,
          latitude: 19.29404,
          longitude: -76.9934,
        },
      });
      const loc = await getCurrentLocation();
      expect(loc).toEqual({
        latitude: 19.29404,
        longitude: -76.9934,
      });
    });

    it('returns the default position if the plugin rejects', async () => {
      (Geolocation.getCurrentPosition as Mock).mockRejectedValue(null);
      const loc = await getCurrentLocation();
      expect(loc).toEqual({
        latitude: 43.074085,
        longitude: -89.381027,
      });
    });
  });
});
