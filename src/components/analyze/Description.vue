<template>
  <section class="analyze__description" v-if="content">
    <svg class="svg-icon">
      <use :xlink:href="`#${content.emojiSymbolId}`"></use>
    </svg>
    <h2>{{ content.name }}</h2>
    <h3 v-if="type === 'candidate'">{{ content.politicalParty }}</h3>
    <div class="" v-html="content.description"></div>
  </section>
</template>

<script>
export default {
  name: 'Description',
  props: {
    content: Object,
    type: String,
  },
}
</script>

<style lang="scss">
.analyze__description {
  background-color: $white;
  margin-left: -12%;
  margin-right: -12%;
  padding-right: 10%;
  padding-left: 10%;
}

.analyze__description svg {
  width: 100%;
}

.analyze__description h2 {
  font-size: 2.4em;
  font-weight: 400;
}

.analyze__description h3 {
  font-size: 1.6em;
  color: $gray;
}

.analyze__description div {
  font-size: 2em;
  font-weight: 300;
}
</style>
