import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import CardView from './views/CardView.vue';
import Analyze from './views/Analyze.vue';

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
  ],
});
