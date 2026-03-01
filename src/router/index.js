import { createRouter, createWebHistory } from "vue-router";

import AuthLayout from "../layouts/AuthLayout.vue";
import DefaultLayout from "../layouts/DefaultLayout.vue";

import Transaction from "../pages/Transaction.vue";
import Dashboard from "../pages/Dashboard.vue";
import Laundries from "../pages/Laundries.vue";
import ServicePrice from "../pages/ServicePrice.vue";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";

const routes = [
  {
    path: "/",
    redirect: () => {
      const token = localStorage.getItem("token");
      return token ? "/dashboard" : "/login";
    },
  },
  {
    path: "/",
    name: "AuthLayout",
    component: AuthLayout,
    children: [
      { path: "login", name: "Login", component: Login },
      { path: "register", name: "Register", component: Register },
    ],
  },
  {
    path: "/",
    name: "DefaultLayout",
    component: DefaultLayout,
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard,
        meta: { requiresAuth: true },
      },
      {
        path: "transaction",
        name: "Transaction",
        component: Transaction,
        // meta: { requiresAuth: true },
      },
      {
        path: "laundries",
        name: "Laundries",
        component: Laundries,
        meta: { requiresAuth: true },
      },
      {
        path: "serviceprice",
        name: "ServicePrice",
        component: ServicePrice,
        meta: { requiresAuth: true },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");

  if (to.meta.requiresAuth && !token) {
    next("/login");
  } else {
    next();
  }
});

export default router;
