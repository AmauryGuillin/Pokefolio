import { createRouter, createWebHistory } from 'vue-router'
import Landing from '@/views/Landing.vue'
import About from '@/views/About.vue'
import GameScene from '@/views/GameScene.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: Landing },
    { path: '/game', name: 'game', component: GameScene },
    { path: '/about', name: 'about', component: About },
  ],
})

export default router
