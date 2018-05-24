<template>
  <main class="analyze">
    <template v-if="analyze.length > 0">
      <section class="analyze__description">
        <svg class="svg-icon">
          <use :xlink:href="`#${description.emojiSymbolId}`"></use>
        </svg>
        <h2>{{ description.name }}</h2>
        <h3 v-if="type === 'candidate'">{{ description.politicalParty }}</h3>
        <div v-html="description.description"></div>
      </section>
    </template>
    <template>{{ emptyMessage }}</template>
  </main>
</template>

<script>
export default {
  name: 'Analyze',
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
    description() {
      if(this.analyze.length > 0) {
        return this.analyze.find(item => item.type === 'description');
      }
    }
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
