export const Geolocation = {
  getCurrentPosition: jest.fn().mockResolvedValue({ coords: { latitude: 0, longitude: 0 } }),
};
