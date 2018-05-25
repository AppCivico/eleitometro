<template>
  <footer class="footer" id="footer">
    <section class="footer__section section--border">
      <ul class="secundary">
        <li><router-link to="/about">Sobre a FVG DAPP</router-link></li>
        <li><router-link to="/metodology">Metodologia</router-link></li>
        <li><a href="#">Assinar Newsletter</a></li>
        <Newsletter />
      </ul>
      <ul class="social">
        <li class="facebook"><a href="#">Facebook</a></li>
        <li class="twitter"><a href="#">Twitter</a></li>
        <li class="instagram"><a href="#">Instagram</a></li>
      </ul>
    </section>
    <section class="footer__section">
      <img src="../assets/logo-white.png">
      <p class="footer__disclaimer">
        <strong>Eleitômetro 2018</strong><br>
        FGV DAPP – Todos os direitos reservados®
      </p>
    </section>
  </footer>
</template>

<script>
import Newsletter from './Newsletter';

export default {
  name: 'Footer',
  components: {
    Newsletter,
  }
}
</script>

<style scoped>
.footer {
  background-color: #66757f;
  color: #fff;
  text-align: left;
  margin-top: 30px;
}

.footer .footer__section {
  padding: 10%;
}

.section--border {
  border-bottom: 2px solid rgba(255, 255, 255, 0.3);
}

.footer .secundary {
  margin: 0 0 40px 0;
  list-style: none;
}

.footer .secundary li {
  margin-bottom: 15px;
}

.footer .secundary a {
  font-weight: 300;
  font-size: 2em;
  color: inherit;
  text-decoration: none;
}

.footer .footer__disclaimer {
  font-weight: 300;
  font-size: 1.4em;
}
</style>
