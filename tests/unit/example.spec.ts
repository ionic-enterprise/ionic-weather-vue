import { mount } from '@vue/test-utils';
import CurrentWeather from '@/views/CurrentWeatherPage.vue';

describe('Tab1Page.vue', () => {
  it('renders tab 1 Tab1Page', () => {
    const wrapper = mount(CurrentWeather);
    expect(wrapper.text()).toMatch('Tab 1 page');
  });
});
