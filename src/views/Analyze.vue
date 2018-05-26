<template>
  <main class="analyze">
    <template v-if="analyze.length > 0">
      <template v-for="(item, i) in analyze">
        <Description :content="item" :type="type" v-if="item.type === 'description'" :key="i"/>
        <Dashboard :content="item" v-if="item.type === 'dashboard'" :key="item.type+i"/>
        <Card :content="item" v-if="item.type === 'card'" :key="item.type+i"/>
        <Media :content="item" v-if="item.type === 'media'" :key="item.type+i"/>
        <Article :content="item" v-if="item.type === 'media'" :key="item.type+i"/>
        <Cloud :content="item" v-if="item.type === 'cloud'" :key="item.type+i"/>
      </template>
    </template>
    <template v-else><h3 class="analyze__message">{{ emptyMessage }}</h3></template>
  </main>
</template>

<script>
import Description from '../components/analyze/Description';
import Dashboard from '../components/analyze/Dashboard';
import Card from '../components/Card';
import Media from '../components/analyze/Media';
import Article from '../components/analyze/Article';
import Cloud from '../components/analyze/Cloud';

export default {
  name: 'Analyze',
  components: {
    Description,
    Dashboard,
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
      console.log('mudou', val);
      this.$store.dispatch('CLEAN_ANALYZE');
      this.emptyMessage = 'Carregando informações';
      this.getData(this.id);
    }
  },
  mounted() {
    this.getData(this.id);
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
  padding: 0 10%;
  background-color: $grayLight;
}

.analyze > section,
.analyze > div {
  padding-bottom: 30px;
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
