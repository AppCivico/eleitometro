<template>
  <form @submit.prevent="validateForm">
    <input type="email" name="email" v-model="email">
    <button type="submit">subscribe</button>
    <p class="error">{{ errorMessage }}</p>
  </form>
</template>

<script>
export default {
  name: 'Newsletter',
  data() {
    return {
      loading: false,
      errorMessage: '',
      email: '',
    };
  },
  methods: {
    validateForm() {
      const { email } = this;
      if (email === '') {
        this.errorMessage = 'Campo obrigatório';
      } else {
        this.subscribe(email);
      }
    },
    subscribe(email) {
      console.log(email);
    }
  }
}
</script>

