import { createRouter, createWebHistory } from "vue-router";

import Transaction from "../pages/Transaction.vue";
import Dashboard from "../pages/Dashboard.vue";
import Laundries from "../pages/Laundries.vue";
import ServicePrice from "../pages/ServicePrice.vue";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";

const routes = [
  { path: "/login", name: "Login", component: Login },
  { path: "/register", name: "Register", component: Register },
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  { path: "/transaction", name: "Transaction", component: Transaction },
  { path: "/laundries", name: "Laundries", component: Laundries },
  { path: "/serviceprice", name: "ServicePrice", component: ServicePrice },
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
