import { createMemoryHistory, createRouter } from 'vue-router'

import SearchForm from './SearchForm.vue'
import ResultPage from './ResultPage.vue'

const routes = [
    { path: '/', component: SearchForm },
    { path: '/result', component: ResultPage },
]

const router = createRouter({
    history: createMemoryHistory(), routes,
})

export default router