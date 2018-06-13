<template>
  <main class="cardView">
    <div class="cardView__wrapper">
      <template v-if="status !== 'loading'">
        <Card v-if="card.id" :content="card" :width="100"/>
        <p v-else class="warning">Esse card não foi encontrado :(</p>
      </template>
      <p v-else class="warning">Carregando informações</p>
    </div>
    <router-link to="/" class="cardView__button">Acessar #observa2018</router-link>
  </main>
</template>

<script>
import Card from '../components/Card.vue';

export default {
  name: 'CardView',
  components: {
    Card,
  },
  data() {
    return {
      status: 'loading',
    }
  },
  mounted() {
    const payload = {
      id: this.$route.params.id,
      source: this.$route.query.source,
    }
    this.$store.dispatch('LOAD_CARD', payload)
      .then(() => {
        this.status = 'done';
      });
  },
  computed: {
    card() {
      return this.$store.state.card;
    },
  },
}
</script>

<style lang="scss" scoped>
.cardView__wrapper {
  padding: 0 2%;
}

.cardView__wrapper .warning {
  font-size: 2em;
}

.cardView__wrapper .card {
  float: none;
  max-width: 470px;
  margin: 0 auto;
}

.cardView__button {
  font-size: 2em;
  color: $white;
  text-decoration: none;
  text-align: left;
  background-color: $gray;
  background-image: url('../assets/icon-arrow-right.png');
  background-repeat: no-repeat;
  background-position: center right 20px;
  display: block;
  padding: 20px;
  margin-top: 20px;
}
</style>

