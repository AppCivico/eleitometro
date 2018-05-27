import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import CardView from './views/CardView.vue';
import Analyze from './views/Analyze.vue';
import Metodology from './views/Metodology.vue';
import About from './views/About.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Resumo',
      component: Home,
    },
    {
      path: '/card/:id',
      name: 'Resumo em',
      component: CardView,
    },
    {
      path: '/candidate/:id',
      name: 'Candidatos',
      component: Analyze,
    },
    {
      path: '/theme/:id',
      name: 'Temas',
      component: Analyze,
    },
    {
      path: '/panorama/:id',
      name: 'Panoramas',
      component: Analyze,
    },
    {
      path: '/metodology',
      name: 'Metodologia',
      component: Metodology,
    },
    {
      path: '/about',
      name: 'Sobre',
      component: About,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }  
    return { x: 0, y: 0 }
  },
});
