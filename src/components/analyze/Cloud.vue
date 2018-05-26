<template>
  <section class="cloud" v-if="content">
    <h3>{{ content.title }}</h3>
    <div class="cloud__description" v-html="content.description"></div>
    <div class="cloud__words">
      <span
        v-for="(item, i) in content.words"
        :key="i"
      >
        {{ item.word }}
      </span>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Cloud',
  props: {
    content: Object,
  },
  computed: {
    types() {
      const types = [];
      if (this.content) {
        this.content.words.map(item => {
          console.log(item.label);
          if (types.findIndex((typesItem) => typesItem.title === item.label) === -1) {
            const data = {
              title: item.label,
              name: this.cleanLabel(item.label),
            }
            types.push(data);
          }
        })
      }
      return types
    }
  },
  methods: {
    cleanLabel(label) {
      return label.toLowerCase().replace(/\s/g, '');
    },
  },
}
</script>

