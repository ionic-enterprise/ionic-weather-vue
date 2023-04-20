import { mount } from '@vue/test-utils';
import CurrentWeather from '@/views/CurrentWeatherPage.vue';
import { describe, it, expect, vi } from 'vitest';

vi.mock('@/use/weather');

describe('CurrentWeatherPage.vue', () => {
  it('renders', () => {
    const wrapper = mount(CurrentWeather);
    expect(wrapper.text()).toContain('Current Weather');
  });
});
