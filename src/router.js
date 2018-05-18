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
      path: '/candidates/:id',
      name: 'Candidatos',
      component: Analyze,
    },
    {
      path: '/themes/:id',
      name: 'Temas',
      component: Analyze,
    },
    {
      path: '/panorams/:id',
      name: 'Panoramas',
      component: Analyze,
    },
  ],
});
