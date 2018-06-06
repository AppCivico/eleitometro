<template>
  <div :class="`sidebar ${status === 'active' ? 'open' : ''}`">
    <button @click="close" class="sidebar__closeIcon">Close</button>
    <img src="../assets/logo.png">
    <h2><a @click.prevent="closeRoute(`/`)">Resumo</a></h2>
    <h2>Análise</h2>
    <nav>
      <ul>
        <li v-if="panorams.length > 1">
					<a href="#" @click.prevent="toggleSubmenu(1)">Panorama ({{ panorams.length }})</a>
					<ul :class="`${submenu === 1 ? 'open' : ''}`">
						<li v-for="item in panorams" :key="item.id">
							<a @click.prevent="closeRoute(`/panorama/${item.id}`)" >
								{{ item.name }}
							</a>
						</li>
					</ul>
				</li>
				<li v-if="candidates.length > 1">
					<a href="#" @click.prevent="toggleSubmenu(2)">Candidatos ({{ candidates.length }})</a>
					<ul :class="`${submenu === 2 ? 'open' : ''}`">
						<li v-for="item in candidates" :key="item.id">
							<a @click.prevent="closeRoute(`/candidate/${item.id}`)" >
								{{ item.name }}
							</a>
						</li>
					</ul>
				</li>
				<li v-if="themes.length > 1">
					<a href="#" @click.prevent="toggleSubmenu(3)">Temas ({{ themes.length }})</a>
					<ul :class="`${submenu === 3 ? 'open' : ''}`">
						<li v-for="item in themes" :key="item.id">
							<a @click.prevent="closeRoute(`/theme/${item.id}`)" >
								{{ item.name }}
							</a>
						</li>
					</ul>
				</li>
      </ul>
    </nav>
    <ul class="secundary">
      <li><a href="#" @click.prevent="closeRoute(`/about`)">Sobre a FVG DAPP</a></li>
      <li><a href="#" @click.prevent="closeRoute(`/metodology`)">Metodologia</a></li>
      <li><a href="#footer" @click="close()">Assinar Newsletter</a></li>
    </ul>
    <ul class="social">
      <li class="facebook"><a href="https://www.facebook.com/FGV.DAPP" target="_blank">Facebook</a></li>
      <li class="twitter"><a href="https://twitter.com/fgvdapp " target="_blank">Twitter</a></li>
      <li class="instagram"><a href="#">Instagram</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  props: {
    status: String,
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
    this.handleTouch();
    this.$store.dispatch('LOAD_ANALYSIS');
  },
  methods: {
    close() {
      this.$emit('closeSidebar', '');
    },
    closeRoute(route) {
      this.$emit('closeSidebar', '');
      this.$router.push(route);
    },
    handleTouch() {
      let touchstartX = 0;
      let touchendX = 0;

      const gestureZone = document.querySelector('.sidebar');

      gestureZone.addEventListener('touchstart', (event) => {
        this.touchStart = event.changedTouches[0].screenX;
      }, false);

      gestureZone.addEventListener('touchend', (event) => {
        this.touchEnd = event.changedTouches[0].screenX;
        this.handleGesture(this.touchStart, this.touchEnd);
      }, false);
    },
    handleGesture(start, end) {
      const handleWidth = Math.abs(end - start);
      if (handleWidth > 100) {
        if (end > start) {
          this.close();
        }
      }
    },
    toggleSubmenu(item) {
      if (this.submenu === item) {
        this.submenu = 0;
      } else {
        this.submenu = item;
      }
    }
  }
};
</script>

<style lang="scss">
.sidebar {
  position: absolute;
  top: 0;
  right: -100%;
  width: 90%;
  height: 100%;
  background: $grayLight;
  opacity: 1;
  overflow: hidden;
  padding: 50px 30px;
  text-align: left;
  transition: right 500ms;
  z-index: 5;

  &.open {
    right: 0;
  }
}

.sidebar img {
  max-width: 50px;
  height: auto;
  margin-bottom: 15px;
}

.sidebar h2 {
  font-weight: 400;
  font-size: 2.4em;
}

.sidebar h2 a {
  color: inherit;
  text-decoration: none;
}

.sidebar ul {
  list-style: none;
}

.sidebar nav {
  padding-left: 30px;
}

.sidebar nav > ul {
  margin-bottom: 10px;
}

.sidebar nav > ul > li > a {
  display: block;
  background-image: url('../assets/icon-menuarrow.png');
  background-repeat: no-repeat;
  background-position: center right;
  background-size: auto 30%;
}

.sidebar nav li {
  margin-bottom: 5px;
}
.sidebar nav li ul {
  padding-left: 30px;
  max-height: 0;
  overflow: hidden;
  transition: max-height 300ms;

  &.open {
    max-height: 1000px;
  }
}

.sidebar nav li a {
  font-weight: 300;
  font-size: 2em;
  color: inherit;
  text-decoration: none;
}

.sidebar .secundary {
  margin: 40px 0;
}

.sidebar .secundary li {
  margin-bottom: 5px;
}

.sidebar .secundary a {
  font-weight: 400;
  font-size: 1.6em;
  color: inherit;
  text-decoration: none;
}

.social li {
  display: inline-block;
  margin-right: 10px;

  &.facebook a {
    background-image: url('../assets/icon-facebook.png');
  }
  &.twitter a {
    background-image: url('../assets/icon-twitter.png');
  }
  &.instagram a {
    background-image: url('../assets/icon-instagram.png');
  }
}

.social li a {
  display: block;
  width: 50px;
  height: 50px;
  background-color: $white;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 50%;
  text-indent: -9999px;
  transition: background-color 250ms;

  &:hover {
    background-color: $grayLight;
  }
}

.sidebar__closeIcon {
  position: absolute;
  top: 35px;
  right: 15px;
  width: 16px;
  height: 16px;
  background-color: transparent;
  background-image: url('../assets/icon-close.png');
  border: 0;
  text-indent: -9999px;
}
</style>
