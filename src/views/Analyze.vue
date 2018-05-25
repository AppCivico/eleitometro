<template>
  <main class="analyze">
    <template v-if="analyze.length > 0" v-for="(item, i) in analyze">
      <Description :content="item" :type="type" v-if="item.type === 'description'" :key="i"/>
    </template>
    <template v-else>{{ emptyMessage }}</template>
  </main>
</template>

<script>
import Description from '../components/analyze/Description';

export default {
  name: 'Analyze',
  components: {
    Description,
  },
  data() {
    return {
      emptyMessage: 'Carregando',
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
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
    id(val) {
      this.getData(val);
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
        })
    },
  },
}
</script>
