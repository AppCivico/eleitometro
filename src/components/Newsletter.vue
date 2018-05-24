<template>
  <form>
    <input type="email" name="email" v-model="email" required>
    <p class="error" v-if="errorMessage !== ''">{{ errorMessage }}</p>
  </form>
</template>

<script>
export default {
  name: 'Newsletter',
  data() {
    return {
      loading: false,
      email: '',
      errorMessage: '',
    };
  },
  methods: {
    validateForm() {
      if (this.email === '') {
        this.errorMessage = 'Campo obrigatório';
      }
    },
  }
}
</script>

