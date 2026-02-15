import { createRouter, createWebHistory } from "vue-router";

import Transaction from "../pages/Transaction.vue";
import Dashboard from "../pages/Dashboard.vue";
import Laundries from "../pages/Laundries.vue";
import ServicePrice from "../pages/ServicePrice.vue";

const routes = [
  { path: "/", name: "Dashboard", component: Dashboard },
  { path: "/transaction", name: "Transaction", component: Transaction },
  { path: "/laundries", name: "Laundries", component: Laundries },
  { path: "/serviceprice", name: "ServicePrice", component: ServicePrice },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
