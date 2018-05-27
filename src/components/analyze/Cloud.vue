<template>
  <section class="cloud" v-if="content">
    <h3>{{ content.title }}</h3>
    <div class="cloud__description" v-html="content.description"></div>
    <div class="cloud__words">
      <span
        v-for="(item, i) in content.words"
        :class="`${getLabelClass(item.label)} weight${item.count}`"
        :key="i"
      >
        {{ item.word }}
      </span>
    </div>
    <ul class="cloud__labels">
      <li
        v-for="(type) in types"
        :key="type.name"
        :class="type.class"
      >
        {{ type.title }}
      </li>
    </ul>
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
      let i = 1;
      if (this.content) {
        this.content.words.map(item => {
          if (types.findIndex((typesItem) => typesItem.title === item.label) === -1) {
            const data = {
              title: item.label,
              name: this.cleanLabel(item.label),
              class: `label${i}`
            }
            i = i + 1;
            types.push(data);
          }
        })
      }
      return types
    }
  },
  methods: {
    getLabelClass(label) {
      const typeIndex = this.types.findIndex(item => item.title === label);
      if (typeIndex !== -1) {
        return this.types[typeIndex].class;
      }

      return '';
    },
    cleanLabel(label) {
      return label.toLowerCase().replace(/\s/g, '');
    },
  },
}
</script>

<style lang="scss">
.cloud h3 {
  font-size: 2.4em;
  font-weight: 400;
  margin-bottom: 20px;
}

.cloud__description {
  font-size: 1.4em;
  margin-bottom: 20px;
}

.cloud__words {
  margin-bottom: 20px;
}

.cloud__words span {
  padding: 5% 5% 6%;
  border-radius: 1rem;
  background-color: $blue;
  display: inline-block;
  color: $white;
  font-size: 1.8em;
  margin-bottom: 5px;
  margin-right: 2px;
  margin-left: 2px;
  
  &.label2 {
    background-color: $gray;
  }
  &.label3 {
    background-color: $orange;
  }
  &.label4 {
    background-color: $green;
  }
  &.label5 {
    background-color: $red;
  }

  &.weight1 {
    font-size: 2em;
  }
  &.weight1 {
    font-size: 2.4em;
  }
  &.weight1 {
    font-size: 2.6em;
  }
}

.cloud__labels {
  list-style: none;
}

.cloud__labels li {
  font-size: 1.4em;
  text-align: left;
  margin-bottom: 5px;

  &:before {
    content: '';
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: $blue;
    display: inline-block;
    vertical-align: bottom;
  }

  &.label2 {
    &:before {
      background-color: $gray;
    }
  }
  &.label3 {
    &:before {
      background-color: $orange;
    }
  }
  &.label4 {
    &:before {
      background-color: $green;
    }
  }
  &.label5 {
    &:before {
      background-color: $red;
    }
  }
}
</style>

