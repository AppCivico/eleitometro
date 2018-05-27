<template>
	<main class="cardView">
		<div class="cardView__wrapper">
			<Card v-if="card.id" :content="card" :width="100"/>
			<p v-else class="not-found">Esse card não foi encontrado :(</p>
		</div>
		<router-link to="/" class="cardView__button">Acessar Eleitômetro</router-link>
	</main>
</template>

<script>
import Card from '../components/Card.vue';

export default {
	name: 'CardView',
	components: {
    Card,
  },
  mounted() {
	  this.$store.dispatch('LOAD_CARD', this.$route.params.id);
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

.cardView__wrapper .not-found {
	font-size: 2em;
}

.cardView__wrapper .card {
	float: none;
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

