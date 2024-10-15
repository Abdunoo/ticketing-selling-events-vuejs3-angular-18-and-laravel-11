import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import EventCategory from "../views/EventCategory.vue";
import EventDetail from "../views/EventDetail.vue";
import Checkout from "../views/Checkout.vue";
import Register from "../views/Register.vue";
import Login from "../views/Login.vue";
import Mytickets from "@/views/Mytickets.vue";
import Account from "@/views/Account.vue";
import DetailOrder from "@/views/DetailOrder.vue";
import Pricing from "@/views/Pricing.vue";
import CreateEvent from "@/views/form/CreateEvent.vue";

const routes = [
  { path: "/", name: "Dashboard", component: Dashboard },
  { path: "/all-for-you", name: "Events", component: EventCategory },
  { path: "/:event_name", name: "EventDetail", component: EventDetail },
  { path: "/checkout", name: "Checkout", component: Checkout },
  { path: "/sign_up", name: "SignUp", component: Register },
  { path: "/login", name: "Login", component: Login },
  { path: "/mytickets", name: "Mytickets", component: Mytickets },
  { path: "/mytickets/:id", name: "MyticketsDetail", component: DetailOrder },
  { path: "/account", name: "Account", component: Account },
  { path: "/pricing", name: "Pricing", component: Pricing },
  { path: "/events_create", name: "CreateEvent", component: CreateEvent },
];

const router = createRouter({
  history: createWebHistory("/ticketing"), // Set the base path here
  routes,
});

router.afterEach((to, from) => {
  // Log navigation
  if (from.path == '/login' && to.path == '/') {
    window.location.reload();
  } else if (from.path == '/account' && to.path == '/login') {
    window.location.reload();
  }

  console.log("Navigated to:", to.path);
});

export default router;
