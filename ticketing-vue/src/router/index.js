import { createRouter, createWebHistory } from "vue-router";
const routes = [
  // Route
  { 
    path: "/", 
    name: "Dashboard", 
    component: () => import('@/views/Dashboard.vue')
  },
  { 
    path: "/all-for-you", 
    name: "Events", 
    component: () => import('@/views/EventCategory.vue')
  },
  { 
    path: "/:event_name", 
    name: "EventDetail", 
    component: () => import('@/views/EventDetail.vue')
  },
  { 
    path: "/checkout", 
    name: "Checkout", 
    component: () => import('@/views/Checkout.vue')
  },
  // Route auth
  { 
    path: "/sign_up", 
    name: "SignUp", 
    component: () => import('@/views/auth/Register.vue')
  },
  { 
    path: "/otp", 
    name: "Otp", 
    component: () => import('@/views/auth/Otp.vue')
  },
  { 
    path: "/login", 
    name: "Login", 
    component: () => import('@/views/auth/Login.vue')
  },
  // Route Form
  { 
    path: "/events_create", 
    name: "CreateEvent", 
    component: () => import('@/views/form/CreateEvent.vue')
  },
  // Other
  { 
    path: "/mytickets", 
    name: "Mytickets", 
    component: () => import('@/views/Mytickets.vue')
  },
  { 
    path: "/mytickets/:id", 
    name: "MyticketsDetail", 
    component: () => import('@/views/DetailOrder.vue')
  },
  { 
    path: "/account", 
    name: "Account", 
    component: () => import('@/views/Account.vue')
  },
  { 
    path: "/pricing", 
    name: "Pricing", 
    component: () => import('@/views/Pricing.vue')
  },
  // Other again
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/footer/About.vue')
  },
  {
    path: '/terms',
    name: 'Terms',
    component: () => import('@/views/footer/Terms.vue')
  },
  {
    path: '/privacy',
    name: 'Privacy',
    component: () => import('@/views/footer/Privacy.vue')
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('@/views/footer/Contact.vue')
  },
  {
    path: '/admin',
    beforeEnter() {
      window.location.href = 'https://sandbox2.panemu.com/ticketing/admin/index.html';
    }
  }
];

const router = createRouter({
  history: createWebHistory("/ticketing"), 
  routes,
});

router.afterEach((to, from) => {
  // Log navigation
  if (from.path == '/login' && to.path == '/') {
    // window.location.reload();
  } else if (from.path == '/account' && to.path == '/login') {
    // window.location.reload();
  }

  console.log("Navigated to:", to.path);
});

export default router;
