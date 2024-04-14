import { createMemoryHistory, createRouter } from 'vue-router'

import SearchForm from './SearchForm.vue'
import ResultPage from './ResultPage.vue'

const routes = [
    { path: '/', component: SearchForm, meta: { transition: 'fade' }},
    
    { path: '/result', component: ResultPage, meta: { transition: 'fade' } },
]

const router = createRouter({
    history: createMemoryHistory(), routes,
})

export default router