import { shallowMount } from '@vue/test-utils';
import HomeView from '@/views/HomeView.vue';
import { describe, it, expect, beforeEach, vi } from 'vitest';

global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  })
);

describe('HomeView.vue', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('calculates the correct number of yaourts to buy', async () => {
    const wrapper = shallowMount(HomeView);

    // Mock the fetch responses
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve({ quantity: 10 }),
      })
    );

    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve({
          mondayConsommation: 2,
          tuesdayConsommation: 2,
          wednesdayConsommation: 2,
          thursdayConsommation: 2,
          fridayConsommation: 2,
          saturdayConsommation: 2,
          sundayConsommation: 2,
          yaourtFormat: 6,
        }),
      })
    );

    // Call the method
    await wrapper.vm.fetchCurrentStorage();
    await wrapper.vm.reapprovisionner();

    // Check the result
    expect(wrapper.vm.yaourtToBuy).toBe(6);
  });
});
