<template>
  <footer class="footer" id="footer">
    <section class="footer__section section--border">
      <ul class="secundary">
        <li><router-link to="/about">Sobre a FVG DAPP</router-link></li>
        <li><router-link to="/metodology">Metodologia</router-link></li>
        <li><a href="#" @click.prevent="''">Assinar Newsletter</a></li>
        <li><Newsletter /></li>
      </ul>
      <ul class="social">
        <li class="facebook"><a href="https://www.facebook.com/FGV.DAPP" target="_blank">Facebook</a></li>
        <li class="twitter"><a href="https://twitter.com/fgvdapp" target="_blank">Twitter</a></li>
        <li class="instagram"><a href="#" target="_blank">Instagram</a></li>
        <li class="linkedin"><a href="https://www.linkedin.com/showcase/fgv-dapp/" target="_blank">LinkedIn</a></li>
      </ul>
    </section>
    <section class="footer__section">
      <img src="../assets/logo-white.png" alt="FGV DAPP Logo">
      <p class="footer__disclaimer">
        <strong>Eleitômetro 2018</strong><br>
        <a href="http://www.dapp.fgv.br" target="_blank">FGV DAPP</a> – Todos os direitos reservados®
      </p>
      <p class="footer__copyright">
        Desenvolvido por
        <a href="https://appcivico.com/" target="_blank">
          AppCívico
          <svg class="svg-icon svg-icon--inline">
            <use xlink:href="#logo-appcivico"></use>
          </svg>
        </a>
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

<style scoped lang="scss">
.footer {
  background-color: $gray;
  color: $white;
  text-align: left;
  margin-top: 30px;
}

.footer .footer__section {
  padding: 10% 5%;

  @media (min-width: 769px) {
    padding: 5% 5% 2%;
    width: 100%;
    display: table;
  }
}

.section--border {
  border-bottom: 2px solid rgba(255, 255, 255, 0.3);
}

.footer .secundary {
  margin: 0 0 40px 0;
  list-style: none;

  @media (min-width: 769px) {
    width: 40%;
    float: left;
    margin: 0 3% 0 0;
  }
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
  margin-bottom: 20px;
}

.footer .footer__disclaimer a {
  color: inherit;
}

.footer__copyright .svg-icon--inline{
  max-width: 72px;
  max-height: 17px;
}

.footer__copyright a {
  font-size: 0;
}
</style>
