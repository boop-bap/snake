import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "",
      redirect: "/main",
    },
    {
      path: "/main",
      name: "MainOverview",
      component: () => import("@/views/MainOverview.vue"),
    },

    {
      path: "/login",
      name: "Login",
      component: () => import("@/views/LoginPage.vue"),
    },
    {
      path: "/register",
      name: "Register",
      component: () => import("@/views/RegisterPage.vue"),
    },
    {
      path: "/user",
      name: "UserPage",
      meta: {
        requiresAuth: true,
      },
      component: () => import("@/views/UserPage.vue"),
    },
    {
      path: "/garden",
      name: "SnakeGarden",
      meta: {
        requiresAuth: true,
      },
      component: () => import("@/components/SnakeGarden.vue"),
    },
  ],
});

export default router;
