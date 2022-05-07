import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/current-weather',
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/current-weather',
      },
      {
        path: 'current-weather',
        component: () => import('@/views/CurrentWeatherPage.vue'),
      },
      {
        path: 'forecast',
        component: () => import('@/views/ForecastPage.vue'),
      },
      {
        path: 'uv-index',
        component: () => import('@/views/UVIndexPage.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
