<template>
  <main class="post">
    <h3>Sobre a FGV-DAPP</h3>
    <p>A FGV/DAPP Busca qualificar o debate público por meio da transparência de dados, da participação social e do diálogo na sociedade em rede.</p>

    <h4>A EQUIPE</h4>
    <p>A DAPP produz análises de políticas públicas com uma equipe interdisciplinar e diversificada, de sólida formação em áreas como Sociologia, Ciência Política, Antropologia, Linguística, Economia, Administração Pública, Relações Internacionais, Estatística, Matemática, Filosofia e Comunicação Social, aliadas às áreas de Tecnologia da Informação e Design.</p>

    <h4>LINHAS DE PESQUISA APLICADA</h4>
    <p>A DAPP desenvolve pesquisa social aplicada com o objetivo de promover a inovação para políticas públicas, produzindo análises qualificadas e disponibilizando diversas ferramentas de visualização e análise de dados. Suas metodologias de pesquisa reúnem métodos quantitativos e qualitativos em integração com a análise de redes sociais e interface com áreas de tecnologia e design. <a href="http://dapp.fgv.br/wp-content/themes/Dapp/downloads/livro-site-BR-web.pdf" target="_blank">[saiba mais]</a></p>
  </main>
</template>

<script>
export default {
    name: 'About'
}
</script>

<style lang="scss">
.post {
  padding: 0 15%;
  color: $gray;
  text-align: left;
}

.post h3 {
  color: $black;
  font-size: 2.4em;
  font-weight: 700;
  margin-bottom: 30px;
}

.post h4 {
  font-size: 1.8em;
  font-weight: 700;
  margin-bottom: 10px;
  margin-top: 20px;
}

.post p,
.post ul,
.post ol {
  font-size: 1.2em;
  margin-bottom: 10px;
}
</style>
