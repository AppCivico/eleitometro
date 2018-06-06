<template>
  <form @submit.prevent="validateForm" class="newsletter">
    <input type="email" name="email" v-model="email" placeholder="Seu email" class="newsletter__input">
    <button type="submit" class="newsletter__button" :disabled="loading">subscribe</button>
    <div class="g-recaptcha" id="g-recaptcha" data-sitekey="6LeykV0UAAAAABov2kUF8C-okpFRwhHpi0qlcGcZ"></div>
    <p class="error">{{ errorMessage }}</p>
    <p class="success">{{ successMessage }}</p>
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
      successMessage: '',
    };
  },
  methods: {
    toggleLoading() {
      this.loading = !this.loading;
    },
    validateForm() {
      this.toggleLoading();

      const { email } = this;
      if (email === '') {
        this.errorMessage = 'Campo obrigatório';
        this.toggleLoading();
      } else {
        this.subscribe(email);
      }
    },
    subscribe(email) {
      const data = {
        mail: email,
      };

      const captcha = grecaptcha.getResponse();
      if (captcha !== '') {
        this.$store.dispatch('SUBSCRIBE', data)
          .then(() => {
            this.email = '';
            this.errorMessage = '';
            this.successMessage = 'E-mail cadastrado com sucesso';
          }).catch((err) => {
            this.toggleLoading();

            if (err.data.error) {
              this.errorMessage = err.data.error;
            } else {
              this.errorMessage = 'Ocorreu um erro inesperado, tente novamente';
            }
          });
      } else {
        this.toggleLoading();
        this.errorMessage = 'É obrigatório confirmar o checkbox acima';
      }
    }
  }
}
</script>

<style lang="scss">
.newsletter {
  position: relative;
}

.newsletter__input {
  width: 100%;
  background-color: transparent;
  border: 0;
  border-bottom: 2px solid $white;
  padding: 10px 30px 10px 0;
  color: $white;
  font-size: 1.4em;
  font-weight: 300;

  &::placeholder {
    color: inherit;
  }
}

.newsletter__button {
  position: absolute;
  right: 0;
  top: 10px;
  width: 22px;
  height: 16px;
  border: none;
  cursor: pointer;
  text-indent: -9999px;
  background-color: transparent;
	background-image: url('../assets/icon-arrow-right.png');
	background-repeat: no-repeat;
	background-position: center;
}

p.error {
  margin-top: 10px;
  color: $orange;
}

p.success {
  margin-top: 10px;
  color: $green;
}

.g-recaptcha {
  margin-top: 10px;
  transform: scale(0.85);
  transform-origin: 0 0;
}
</style>
