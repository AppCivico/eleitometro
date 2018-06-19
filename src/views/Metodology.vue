<template>
  <main class="post">
    <h4>Sobre</h4>
    <p>O WebApp #observa2018 exibe de forma prática e interativa detalhes sobre o debate público no Twitter em tempo real, explicitando informações sobre temas e atores em destaque, presença de interferências ilegítimas e casos de discursos de ódio (homofobia, machismo, racismo, regionalismo, xenofobia, entre outros). As análises são resultado de uma sequência de procedimentos metodológicos desenvolvidos pela FGV DAPP.</p>

    <h4>Procedimentos metodológicos</h4>
    <p>Os dados são obtidos através de coleta feita em tempo real na API do Twitter e armazenados em um banco de dados interno para processamento. O processamento inclui cálculos como acúmulo do volume de menções, percentuais e variações percentuais diárias dos dados. Por fim, a análise dos resultados é realizada pela equipe de pesquisadores através da criação de cards com textos explicativos. Para mais informações, acesse aqui.</p>

    <h4>Cards</h4>
    <p>Os cards buscam apresentar de forma objetiva o panorama resumido sobre os principais temas, candidatos e palavras de ódio citadas no debate nas redes. Para isso, contam com análises gráficas de evolução temporal por hora e por dia, volume acumulado de menções por categoria no dia, percentual de participação de robôs na semana e contribuição de cada palavra nos discursos de ódio gerados nas redes no contexto eleitoral naquela semana.</p>
  </main>
</template>

<script>
export default {
  name: 'Metodology'
}
</script>

<style lang="scss">
.post {
  padding: 0 5%;
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
}

.post p,
.post ul,
.post ol {
  font-size: 1.2em;
  margin-bottom: 10px;
}
</style>


