<template>
  <div class="home">
    <LaunchScreen :status="status"/>
    <Summary />
    <Analysis />
  </div>
</template>

<script>
// @ is an alias to /src
import LaunchScreen from '@/components/LaunchScreen.vue';
import Summary from '@/components/Summary.vue';
import Analysis from '@/components/Analysis.vue';

export default {
  name: 'home',
  components: {
    LaunchScreen,
    Summary,
    Analysis,
  },
  data() {
    return {
      status: 'start',
    }
  },
  mounted() {
    if (window.matchMedia('(display-mode: standalone)').matches) {
      this.status = 'done';
      this.$store.dispatch('LOAD_CARDS');
    } else {
      setTimeout(() => {
        this.status = 'loading';
        this.$store.dispatch('LOAD_CARDS')
          .then(() => {
            setTimeout(() => {
              this.status = 'done';
            }, 1000);
          });
      }, 1000);
    }
  }
};
</script>
