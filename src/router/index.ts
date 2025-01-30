import { createWebHashHistory, createRouter } from 'vue-router'

import SearchView from '../modules/search/views/SearchView.vue'

const routes = [
  { path: '/', component: SearchView },
  { path: '/country/:countryCode', component: () => import('../modules/country/views/CountryView.vue') },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router;