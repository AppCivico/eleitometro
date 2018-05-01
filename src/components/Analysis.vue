<template>
	<div class="analysis">
		<h2>Análise</h2>
		<h3>Os principais temas e candidatos da corrida eleitoral analisados em tempo real</h3>
		<p>Escolha uma editoria:</p>
		<hr>
		<nav>
			<ul>
				<li>
					<a href="#" @click.prevent="toggleSubmenu(1)">Panoarama (3)</a>
					<ul :class="submenu === 1 ? 'open' : ''">
						<li><a href="#">Debate Geral</a></li>
						<li><a href="#">Robôs na Rede</a></li>
						<li><a href="#">Civilidade</a></li>
					</ul>
				</li>
				<li>
					<a href="#" @click.prevent="toggleSubmenu(2)">Candidatos (3)</a>
					<ul :class="submenu === 2 ? 'open' : ''">
						<li><a href="#">Lula</a></li>
						<li><a href="#">Marina</a></li>
						<li><a href="#">Manuela</a></li>
					</ul>
				</li>
				<li>
					<a href="#" @click.prevent="toggleSubmenu(3)">Temas (3)</a>
					<ul :class="submenu === 3 ? 'open' : ''">
						<li><a href="#">Economia</a></li>
						<li><a href="#">Educação</a></li>
						<li><a href="#">Segurança</a></li>
					</ul>
				</li>
			</ul>
		</nav>
	</div>
</template>

<script>
export default {
	name: 'Analysis',
	data() {
    return {
      submenu: 0,
    }
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
