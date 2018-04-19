<template>
  <div class="home">
    <LaunchScreen :status="status"/>
    <Summary />
  </div>
</template>

<script>
// @ is an alias to /src
import LaunchScreen from '@/components/LaunchScreen.vue';
import Summary from '@/components/Summary.vue';

export default {
  name: 'home',
  components: {
    LaunchScreen,
    Summary,
  },
  data() {
    return {
      status: 'start',
    }
  },
  mounted() {
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
};
</script>
