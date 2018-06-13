<template>
  <main class="post">
    <h4>Sobre</h4>
    <p>A ferramenta exibe de forma rápida, prática e harmoniosa detalhes sobre o debate eleitoral no Twitter em tempo real, explicitando informações sobre temas e candidatos em destaque na corrida eleitoral, presença de interferências ilegítimas e casos de discursos de ódio (homofobia, machismo, racismo, regionalismo, xenofobia, entre outras ofensas). As análises apresentadas são obtidas após uma sequência de procedimentos metodológicos aplicados pela equipe FGV DAPP.</p>
    
    <h4>Procedimentos metodológicos</h4>
    <p>Os dados são adquiridos através de coleta feita em tempo real na API do Twitter e armazenados em um banco de dados interno para que sejam processados. O processamento inclui cálculos como acúmulo do volume de menções, percentuais e variações percentuais diárias dos dados. Por fim, a análise dos resultados é realizada manualmente pela equipe de pesquisadores através da criação de cards com textos explicativos.</p>
    
    <h4>Cards</h4>
    <p>Os cards buscam apresentar de forma transparente o panorama resumido sobre os principais temas, candidatos e palavras de ódio citadas no debate nas redes. Para isso, contam com análises gráficas de evolução temporal por hora e por dia, volume acumulado de menções por categoria no dia, percentual de participação de robôs na semana e contribuição de cada palavra nos discursos de ódio gerados nas redes no contexto eleitoral naquela semana.</p>
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


