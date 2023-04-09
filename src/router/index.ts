import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "",
      redirect: "/snake",
    },
    {
      path: "/:catchAll(.*)",
      redirect: "/snake",
    },
    {
      path: "/snake",
      name: "MainOverview",
      component: () => import("@/views/MainOverview.vue"),
      children: [
        {
          path: "",
          name: "LandingPageHero",
          component: () => import("@/components/LandingPageHero.vue.vue"),
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
    },
  ],
});

// fix routing

router.beforeEach(async (to, from, next) => {
  const user = window.localStorage.getItem("user");

  if (to.meta.requiresAuth && !user) {
    router.push("snake");
    next();
  }

  if ((to.path === "/login" || to.path === "/register") && user) {
    router.push("snake");
  }
  next();
});

export default router;
