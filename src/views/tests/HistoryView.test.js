import { shallowMount } from '@vue/test-utils';
import HistoryView from '@/views/HistoryView.vue';
import { describe, it, expect, beforeEach } from 'vitest';

describe('HistoryView.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(HistoryView);
  });

  it('formats date correctly', () => {
    const dateString = '2023-10-01T12:00:00Z';
    const formattedDate = wrapper.vm.formatDate(dateString);
    expect(formattedDate).toBe('01/10/2023');
  });

  it('formats data for chart correctly', () => {
    const data = [
      { datetime: '2023-10-01T12:00:00Z', quantity: 10 },
      { datetime: '2023-10-02T12:00:00Z', quantity: 20 },
    ];
    const formattedData = wrapper.vm.formatDataForChart(data);
    expect(formattedData.labels).toEqual(['01/10/2023', '02/10/2023']);
    expect(formattedData.datasets[0].data).toEqual([10, 20]);
  });
});
