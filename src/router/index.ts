import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
import { routes } from './routes';
const router = createRouter({
    // // 指定路由模式
    // history: createWebHistory(),
    // // 路由地址
    // routes: routes
    history: createWebHashHistory(),
    // 路由地址
    routes: routes
})

export { router } 