import { createRouter, createWebHistory } from 'vue-router';
import Home from './pages/Home.vue';
import PokemonPage from './pages/PokemonPage.vue';

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', name: 'home', component: Home },
        { path: '/pokemon/:name', name: 'pokemon', component: PokemonPage, props: true },
        { path: '/:pathMatch(.*)*', redirect: '/' },
    ],
});
