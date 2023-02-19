import { createRouter, createWebHistory } from "vue-router";
import { userModule } from "@/stores/userModule";

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

router.beforeEach((to, from, next) => {
  if (!userModule().$state.isLoggedIn) {
    router.push("login");
  }
  if (
    userModule().$state.isLoggedIn &&
    (to.name === "Login" || to.name === "Register")
  ) {
    router.push("garden");
  }

  next();
});

export default router;
