import { vi } from 'vitest';

export const Geolocation = {
  getCurrentPosition: vi.fn().mockResolvedValue({ coords: { latitude: 0, longitude: 0 } }),
};
