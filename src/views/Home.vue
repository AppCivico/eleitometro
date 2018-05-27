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
      status: '',
    }
  },
  watch: {
    status(val) {
      if (val === 'start') {
        this.animateLauchScreen();
      } else  {
        this.$store.dispatch('LOAD_CARDS');
      }
    },
  },
  beforeRouteEnter (to, from, next) {
    if (from.name !== null) {
      next((vm) => {
        vm.status = 'done';
      });
      return;
    } else {
      next((vm) => {
        if (window.matchMedia('(display-mode: standalone)').matches) {
          vm.status = 'done';
        } else {
          vm.status = 'start';
        }
      });
    }    
  },
  methods: {
    animateLauchScreen() {
      setTimeout(() => {
        this.status = 'loading';
        this.$store.dispatch('LOAD_CARDS')
          .then(() => {
            setTimeout(() => {
              this.status = 'done';
            }, 1000);
          });
      }, 1000);
    },
  }
};
</script>
