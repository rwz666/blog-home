import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router"
import Home from '@/views/Home.vue'


const routes: RouteRecordRaw[] = [
  {
    name: '首页',
    path: "/",
    redirect: '/home'
  },
  {
    path: "/home",
    component: Home,
  },
  {
    name: '关于',
    path: "/about",
    component: () => import("@/views/About.vue"),
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})



export default router