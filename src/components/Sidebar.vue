<template>
  <div :class="`sidebar ${status === 'active' ? 'open' : ''}`">
    <button @click="close" class="sidebar__closeIcon">Close</button>
    <img src="../assets/logo.png">
    <h2>Resumo</h2>
    <h2>Análise</h2>
    <nav>
      <ul>
        <li>
          <a href="#" @click.prevent="toggleSubmenu(1)">Panorama (3)</a>
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
    <ul class="secundary">
      <li><a href="#">Sobre a FVG DAPP</a></li>
      <li><a href="#">Metodologia</a></li>
      <li><a href="#">Assinar Newsletter</a></li>
    </ul>
    <ul class="social">
      <li class="facebook"><a href="#">Facebook</a></li>
      <li class="twitter"><a href="#">Twitter</a></li>
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
  mounted() {
    this.handleTouch();
  },
  methods: {
    close() {
      this.$emit('closeSidebar', '');
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
  background: #f2f2f2;
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
  background-color: #fff;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 50%;
  text-indent: -9999px;
  transition: background-color 250ms;

  &:hover {
    background-color: #f2f2f2;
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
