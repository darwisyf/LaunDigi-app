import { createRouter, createWebHistory } from "vue-router";

const AuthLayout = import("../layouts/AuthLayout.vue");
const DefaultLayout = import("../layouts/DefaultLayout.vue");

const Transaction = import("../pages/Transaction.vue");
const Dashboard = import("../pages/Dashboard.vue");
const Laundries = import("../pages/Laundries.vue");
const ServicePrice = import("../pages/ServicePrice.vue");
const Login = import("../pages/Login.vue");
const Register = import("../pages/Register.vue");
const History = import("../pages/History.vue");

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
        meta: { requiresAuth: true },
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
      {
        path: "history",
        name: "History",
        component: History,
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
