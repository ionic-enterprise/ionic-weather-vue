import { mount } from '@vue/test-utils';
import CurrentWeather from '@/views/CurrentWeatherPage.vue';

describe('CurrentWeatherPage.vue', () => {
  it('renders tab 1 CurrentWeatherPage', () => {
    const wrapper = mount(CurrentWeather);
    expect(wrapper.text()).toContain('Current Weather');
  });
});
