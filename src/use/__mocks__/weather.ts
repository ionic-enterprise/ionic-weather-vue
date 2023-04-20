import { vi } from 'vitest';

export const useWeather = vi.fn().mockReturnValue({
  currentWeather: vi.fn().mockResolvedValue([]),
  getUVAdvice: vi.fn().mockResolvedValue({}),
});
