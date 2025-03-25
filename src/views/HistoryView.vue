<script setup>
import GraphicComponent from '../components/GraphicComponent.vue';
import { formatDate } from '../functions/formatDate.js';
</script>

<script>

export default {
  data() {
    return {
      graphicView: false,
      historyData: [],
      historyDataFormatted: {labels: [], datasets: [{ label: 'Quantity', data: [] }]},
      options: { responsive: true, maintainAspectRatio: true }
    };
  },
  mounted() {
    this.fetchHistoryData();
  },
  methods: {
    async fetchHistoryData() {
      try {
        const response = await fetch('http://localhost:8080/api/yaourts/1');
        let data = await response.json();
        this.historyData = data;
        this.historyDataFormatted = this.formatDataForChart(data.slice().reverse());
      } catch (error) {
        console.error('Error fetching history data:', error);
      }
    },
    formatDataForChart(data) {
      let dataFormatted = {labels: [], datasets: [{ label: 'Quantity', data: [] }]};
      data.forEach((item, index) => {
        dataFormatted.labels.push(formatDate(item.datetime));
        dataFormatted.datasets[0].data.push(item.quantity);
      });
      return dataFormatted;
    }
  },
};
</script>

<template>
  <main>
    <div v-if="historyData.length">
    <nav>
      <h1 @click="graphicView = false" :class="['', graphicView ? '' : 'active']">Historique</h1>
      <h1 @click="graphicView = true" :class="['', graphicView ? 'active' : '']">Graphique</h1>
    </nav>
    <table v-if="!graphicView">
      <thead>
        <tr>
          <th>Date</th>
          <th>Nombre de yaourts</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in historyData" :key="item.date">
          <td>{{ formatDate(item.datetime) }}</td>
          <td>{{ item.quantity }}</td>
        </tr>
      </tbody>
    </table>

    <v-container class="chart-container" v-else>
      <GraphicComponent :data="historyDataFormatted" :options="options" />
    </v-container>

    </div>
    <div v-else>
      Loading...
    </div>
  </main>
</template>

<style scoped>

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
}

nav h1.router-link-exact-active {
  color: var(--color-text);
}

nav h1 {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
  color: hsla(160, 100%, 37%, 1);
}

nav h1.active {
  color: var(--color-text);
}

nav h1:first-of-type {
  border: 0;
}

nav h1:hover {
  cursor: pointer;
}

nav h1.active:hover {
  cursor: default;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid var(--color-border);
  padding: 0.5rem;
}

.chart-container {
  flex-grow: 1;
  min-height: 0;

  > div {
    position: relative;
    height: 100%;
  }
}
</style>
