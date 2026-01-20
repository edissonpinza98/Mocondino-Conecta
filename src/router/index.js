import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/juntas/:id',
            name: 'board-detail',
            component: () => import('../views/BoardDetailView.vue'),
            props: true
        },
        {
            path: '/talento',
            name: 'talents',
            component: () => import('../views/TalentsView.vue')
        },
        {
            path: '/negocios',
            name: 'businesses',
            component: () => import('../views/BusinessesView.vue')
        },
        {
            path: '/eventos',
            name: 'events',
            component: () => import('../views/EventsView.vue')
        },
        {
            path: '/participar',
            name: 'participate',
            component: () => import('../views/ParticipateView.vue')
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/LoginView.vue')
        }
    ],
    scrollBehavior() {
        return { top: 0 }
    }
})

export default router
