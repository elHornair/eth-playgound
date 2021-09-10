import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/About.vue'),
  },
  {
    path: '/accounts',
    name: 'accounts',
    component: () => import('../views/Accounts.vue'),
  },
  {
    path: '/accounts/:address',
    name: 'account',
    component: () => import('../views/Account.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  tag: 'button',
  linkActiveClass: 'router-link--active',
});

export default router;
