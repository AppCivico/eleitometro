<template>
  <main class="analyze">
    <template v-if="analyze.length > 0">
      <template v-for="item in analyze">
        <Description :content="item" :type="type" v-if="item.type === 'description'" :key="item.type+Math.random()"/>
        <Dashboard :content="item" v-else-if="item.type === 'dashboard'" :key="item.type+Math.random()"/>
        <Ranking :content="item" v-else-if="item.type === 'ranking'" :type="type" :key="item.type+Math.random()"/>
        <Card :content="item" v-else-if="item.type === 'card'" :key="item.type+Math.random()"/>
        <Media :content="item" v-else-if="item.type === 'media'" :key="item.type+Math.random()"/>
        <Article :content="item" v-else-if="item.type === 'article'" :key="item.type+Math.random()"/>
        <Cloud :content="item" v-else-if="item.type === 'cloud'" :key="item.type+Math.random()"/>
      </template>
    </template>
    <template v-else><h3 class="analyze__message">{{ emptyMessage }}</h3></template>
  </main>
</template>

<script>
import Description from '../components/analyze/Description';
import Dashboard from '../components/analyze/Dashboard';
import Ranking from '../components/analyze/Ranking';
import Card from '../components/Card';
import Media from '../components/analyze/Media';
import Article from '../components/analyze/Article';
import Cloud from '../components/analyze/Cloud';

export default {
  name: 'Analyze',
  components: {
    Description,
    Dashboard,
    Ranking,
    Card,
    Media,
    Article,
    Cloud,
  },
  data() {
    return {
      emptyMessage: 'Carregando informações',
    };
  },
  computed: {
    route() {
      return this.$route;
    },
    id() {
      return this.route.params.id;
    },
    analyze() {
      return this.$store.state.analyze;
    },
    type() {
      const arr = this.$route.path.split('/');
      return arr[1];
    },
  },
  watch: {
    route(val) {
      this.$store.dispatch('CLEAN_ANALYZE');
      this.emptyMessage = 'Carregando informações';
      this.getData(this.id);
    }
  },
  mounted() {
    this.getData(this.id);
  },
  beforeRouteLeave (to, from, next) {
    this.$store.dispatch('CLEAN_ANALYZE');
    next();
  },
  methods: {
    getData(id) {
      const payload = {
        id,
        type: this.type,
      }
      this.$store.dispatch('LOAD_ANALYZE', payload)
        .then(() => {
          if (this.analyze.length < 1) {
            this.emptyMessage = 'Sem informações';
          }
        }).catch(() => {
          this.emptyMessage = 'Ocorreu um erro inesperado ao buscar informações, tente recarregar a página';
        });
    },
  },
}
</script>

<style lang="scss">
.analyze {
  padding: 0 5% 30px;
  background-color: $grayLight;

   @media (min-width: 769px) {
    width: 100%;
    display: table;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 0 0;
  }
}

.analyze > section,
.analyze > div {
  padding-bottom: 30px;

  @media (min-width: 769px) {
    float: left;
    width: 48%;
    margin: 0 1% 30px;
  }
}

.analyze .analyze__description,
.analyze .dashboard {
  @media (min-width: 769px) {
    width: auto;
    float: none;
    flex-basis: 100%;
    margin: 0;
  }
}

.analyze .dashboard {
  @media (min-width: 769px) {
    margin-bottom: 30px;
  }
}

.analyze .card {
  float: none;
  padding-left: 0;
  padding-right: 0;
  perspective: unset;
  height: auto;
}

.analyze .card__front {
  position: relative;
  top: auto;
  left: auto;
  font-size: 0.6em;
  min-height: 300px;
}

.analyze .card__share.open {
  padding: 30px;
}

.analyze__message {
  font-size: 1.8em;
  padding: 20px 10%;
  text-align: left;
}
</style>
