<template>
  <Line :data="data" :options="options" />
</template>

<script lang="ts">
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line } from 'vue-chartjs'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export default {
  name: 'GraphicComponent',
  components: {
    Line
  },
  props: {
    data: {
      type: Object,
      required: true
    },
    options: {
      type: Object,
      required: true
    }
  }
}
</script>
