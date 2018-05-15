<template>
	<div class="analysis">
		<header class="header">
			<h2>Análise</h2>
			<h3>Os principais temas e candidatos da corrida eleitoral analisados em tempo real</h3>
			<p>Escolha uma editoria:</p>
		</header>
		<nav>
			<ul>
				<li v-if="panorams.length > 1">
					<a href="#" @click.prevent="toggleSubmenu(1)">Panorama ({{ panorams.length }})</a>
					<ul :class="`analysis__submenu ${submenu === 1 ? 'open' : ''}`">
						<li v-for="item in panorams" :key="item.id">
							<router-link :to="`/panorams/${item.id}`">
								<img src="../assets/logo.png"> {{ item.name }}
							</router-link>
						</li>
					</ul>
				</li>
				<li v-if="candidates.length > 1">
					<a href="#" @click.prevent="toggleSubmenu(2)">Candidatos ({{ candidates.length }})</a>
					<ul :class="`analysis__submenu ${submenu === 2 ? 'open' : ''}`">
						<li v-for="item in candidates" :key="item.id">
							<router-link :to="`/candidates/${item.id}`">
								<img src="../assets/logo.png"> {{ item.name }}
							</router-link>
						</li>
					</ul>
				</li>
				<li v-if="themes.length > 1">
					<a href="#" @click.prevent="toggleSubmenu(3)">Temas ({{ themes.length }})</a>
					<ul :class="`analysis__submenu ${submenu === 3 ? 'open' : ''}`">
						<li v-for="item in themes" :key="item.id">
							<router-link :to="`/themes/${item.id}`">
								<img src="../assets/logo.png"> {{ item.name }}
							</router-link>
						</li>
					</ul>
				</li>
			</ul>
		</nav>
		<Footer />
	</div>
</template>

<script>
import Footer from './Footer';

export default {
	name: 'Analysis',
	components: {
		Footer,
	},
	data() {
    return {
      submenu: 0,
    }
	},
	computed: {
		candidates() {
			return this.$store.state.candidates
		},
		themes() {
			return this.$store.state.themes
		},
		panorams() {
			return this.$store.state.panorams
		},
	},
	mounted() {
		this.$store.dispatch('LOAD_ANALYSIS');
	},
	methods: {
		toggleSubmenu(item) {
      if (this.submenu === item) {
        this.submenu = 0;
      } else {
        this.submenu = item;
      }
    }
	}
}
</script>

<style lang="scss">
.analysis .header {
	border-bottom: 2px solid #e2e2e2;
}

.analysis nav ul {
  list-style: none;
}

.analysis nav > ul {
  margin-bottom: 0px;
}

.analysis nav > ul > li {
	padding: 20px;
	border-bottom: 2px solid #e2e2e2;
}

.analysis nav > ul > li > a {
  display: block;
  background-image: url('../assets/icon-menuarrow.png');
  background-repeat: no-repeat;
  background-position: center right;
  background-size: auto 30%;
	font-weight: 700;
  font-size: 2em;
  color: inherit;
  text-decoration: none;
}

.analysis nav li {
  margin-bottom: 5px;
}

.analysis .analysis__submenu {
  padding-left: 30px;
  max-height: 0;
  overflow: hidden;
  transition: max-height 300ms, margin-top 300ms;

  &.open {
    max-height: 1000px;
		margin-top: 20px;
  }
}

.analysis .analysis__submenu li {
	float: left;
	width: 49.5%;
	display: block;
	border-radius: 8px;
	background: #f2f2f2;
	padding: 20px;

	&:nth-of-type(2n) {
		float: right;
	}
}

.analysis .analysis__submenu img {
	display: block;
	margin: 0 auto 10px;
}

.analysis .analysis__submenu a {
  font-weight: 400;
  font-size: 1.4em;
  color: inherit;
  text-decoration: none;
}
</style>
