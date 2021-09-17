import { createRouter, createWebHistory } from 'vue-router';

import Home from '../views/HomeView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
  },
  {
    path: '/accounts',
    name: 'accounts-pass-through',
    component: () => import('../views/RouterPassThrough.vue'),
    children: [
      {
        path: '',
        name: 'accounts',
        component: () => import('../views/AccountsView.vue'),
      },
      {
        path: ':address',
        name: 'account',
        component: () => import('../views/AccountView.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  tag: 'button',
  linkActiveClass: 'router-link--active',
});

export default router;
