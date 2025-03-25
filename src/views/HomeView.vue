<script setup>
import { formatDate } from '../functions/formatDate.js';
</script>

<script>

export default {
  data() {
    return {
      data: null,
      yaourtToBuy: null,
    };
  },
  mounted() {
    this.fetchCurrentStorage();
  },
  methods: {
    async fetchCurrentStorage() {
      try {
        const response = await fetch('http://localhost:8080/api/yaourts/current/1');
        this.data = await response.json();
      } catch (error) {
        console.error('Error fetching current storage:', error);
      }
    },
    async reapprovisionner() {
      const response = await fetch('http://localhost:8080/api/config/1');
      const config = await response.json();

      const weekConsom = config.mondayConsommation
                       + config.tuesdayConsommation
                       + config.wednesdayConsommation
                       + config.thursdayConsommation
                       + config.fridayConsommation
                       + config.saturdayConsommation
                       + config.sundayConsommation;

      let needToBuy = weekConsom - this.data.quantity;
      const moduloYaourtFormat = needToBuy % config.yaourtFormat;
      let stockToBuy = Math.floor(needToBuy / config.yaourtFormat) * config.yaourtFormat;
      if(moduloYaourtFormat > 0) {
        stockToBuy += config.yaourtFormat;
      }
      this.yaourtToBuy = stockToBuy;
    },
  }
};
</script>

<template>
  <main>
    <h1>Home</h1>
    <div v-if="data">
      <h2>Etat actuel au {{ formatDate(data.datetime) }}</h2>
      <h3>Nombre de yaourts dans le frigo : {{ data.quantity }}</h3>
      <button @click="reapprovisionner">Calculer le réapprovisionnement</button>
      <div v-if="yaourtToBuy">
        <h3>Il faut acheter {{ yaourtToBuy }} yaourts</h3>
      </div>
    </div>
    <div v-else>
      Loading...
    </div>
  </main>
</template>
