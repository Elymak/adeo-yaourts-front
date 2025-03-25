<script>
export default {
  data() {
    return {
      data: null,
    };
  },
  mounted() {
    this.fetchConfiguration();
  },
  methods: {
    async fetchConfiguration() {
      try {
        const response = await fetch('http://localhost:8080/api/config/1');
        this.data = await response.json();
      } catch (error) {
        console.error('Error fetching current storage:', error);
      }
    },
    submitConfiguration(event) {
      event.preventDefault();
      console.log('submitConfiguration', this.data);
      const requestOptions = {
        mode:  'cors',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.data)
      };
      fetch('http://localhost:8080/api/config', requestOptions)
          .then(response => response.json())
          .then(data => this.data = data);
    },
  },
};
</script>

<template>
  <div class="configuration">
    <h1>Configuration</h1>
    <div v-if="data">
      <form @submit="submitConfiguration">
        <div class="form-group">
          <label for="delivery">Délai de livraison: </label>
          <input name="delivery" type="number" v-model="data.deliveryTime"/>
        </div>

        <div class="form-group">
          <label for="monday">Consomation du lundi: </label>
          <input name="monday" type="number" v-model="data.mondayConsommation"/>
        </div>

        <div class="form-group">
          <label for="tuesday">Consomation du mardi: </label>
          <input name="tuesday" type="number" v-model="data.tuesdayConsommation"/>
        </div>

        <div class="form-group">
          <label for="wednesday">Consomation du mercredi: </label>
          <input name="wednesday" type="number" v-model="data.wednesdayConsommation"/>
        </div>

        <div class="form-group">
          <label for="thursday">Consomation du jeudi: </label>
          <input name="thursday" type="number" v-model="data.thursdayConsommation"/>
        </div>

        <div class="form-group">
          <label for="friday">Consomation du vendredi: </label>
          <input name="friday" type="number" v-model="data.fridayConsommation"/>
        </div>

        <div class="form-group">
          <label for="saturday">Consomation du samedi: </label>
          <input name="saturday" type="number" v-model="data.saturdayConsommation"/>
        </div>

        <div class="form-group">
          <label for="sunday">Consomation du dimanche: </label>
          <input name="sunday" type="number" v-model="data.sundayConsommation"/>
        </div>

        <div class="form-group">
          <label for="yaourtFormat">Format de yaourts: </label>
          <input name="yaourtFormat" type="number" v-model="data.yaourtFormat"/>
        </div>

        <button type="submit">Enregistrer</button>
      </form>
    </div>
    <div v-else>
      Loading...
    </div>
  </div>
</template>

<style scoped>
.form-group {
  display: flex;
  margin-bottom: 0.5rem;
}

label {
  display: block;
  width: 500px;
}

input {
  display: block;
  width: 75%;
  padding: 0.5rem;
  box-sizing: border-box;
}

button {
  display: block;
  margin-top: 1rem;
  padding: 0.5rem 1rem;
}
</style>
