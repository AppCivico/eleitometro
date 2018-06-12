import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import CardView from './views/CardView.vue';

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
      query: {
        source: String,
      },
    },
    {
      path: '/candidate/:id',
      name: 'Candidatos',
      component: () => import('./views/Analyze.vue'),
    },
    {
      path: '/theme/:id',
      name: 'Temas',
      component: () => import('./views/Analyze.vue'),
    },
    {
      path: '/panorama/:id',
      name: 'Panoramas',
      component: () => import('./views/Analyze.vue'),
    },
    {
      path: '/metodology',
      name: 'Metodologia',
      component: () => import('./views/Metodology.vue'),
    },
    {
      path: '/about',
      name: 'Sobre',
      component: () => import('./views/About.vue'),
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { x: 0, y: 0 };
  },
});
