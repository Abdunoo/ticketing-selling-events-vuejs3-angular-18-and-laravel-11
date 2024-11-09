import { APP_URL } from "@/config";
import { useAuthStore } from "@/stores/auth";
import { createRouter, createWebHistory } from "vue-router";
const routes = [
  // Route
  {
    path: "/",
    name: "Dashboard",
    component: () => import("@/views/Dashboard.vue"),
  },
  {
    path: "/all-for-you",
    name: "Events",
    component: () => import("@/views/EventCategory.vue"),
  },
  {
    path: "/:event_name",
    name: "EventDetail",
    component: () => import("@/views/EventDetail.vue"),
  },
  {
    path: "/checkout",
    name: "Checkout",
    component: () => import("@/views/Checkout.vue"),
    meta: { requiresAuth: true },
  },
  // Route auth
  {
    path: "/sign_up",
    name: "SignUp",
    component: () => import("@/views/auth/Register.vue"),
  },
  {
    path: "/otp",
    name: "Otp",
    component: () => import("@/views/auth/Otp.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/auth/Login.vue"),
  },
  // Route Form
  {
    path: "/events_create",
    name: "CreateEvent",
    component: () => import("@/views/form/CreateEvent.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/edit-event/:id",
    name: "EditEvent",
    component: () => import("@/views/form/EditEvent.vue"),
    meta: { requiresAuth: true },
  },
  // Other
  {
    path: "/my_tickets",
    name: "Mytickets",
    component: () => import("@/views/Mytickets.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/my_tickets/:id",
    name: "MyticketsDetail",
    component: () => import("@/views/DetailOrder.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/account",
    name: "Account",
    component: () => import("@/views/Account.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/my_events",
    name: "MyEvents",
    component: () => import("@/views/MyEvent.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/pricing",
    name: "Pricing",
    component: () => import("@/views/Pricing.vue"),
  },
  // Other again
  {
    path: "/about",
    name: "About",
    component: () => import("@/views/footer/About.vue"),
  },
  {
    path: "/terms",
    name: "Terms",
    component: () => import("@/views/footer/Terms.vue"),
  },
  {
    path: "/privacy",
    name: "Privacy",
    component: () => import("@/views/footer/Privacy.vue"),
  },
  {
    path: "/contact",
    name: "Contact",
    component: () => import("@/views/footer/Contact.vue"),
  },
];

const router = createRouter({
  history: createWebHistory("/ticketing"),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.path === '/admin' || to.path === '/admin/') {
    window.location.href = APP_URL + '/admin/index.html';
  }

  if (to.meta.requiresAuth && !authStore.isLogin) {
    let info = localStorage.getItem("isLogin");
    info = JSON.parse(info);
    if (!info) {
      authStore.setRedirectPath(to.fullPath); // Save the intended path
      next({ name: "Login" });
    }
    next();
  } else {
    next();
  }
});

export default router;
