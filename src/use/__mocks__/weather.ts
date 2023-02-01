export const useWeather = jest.fn().mockReturnValue({
  currentWeather: jest.fn().mockResolvedValue([]),
  getUVAdvice: jest.fn().mockResolvedValue({}),
});
