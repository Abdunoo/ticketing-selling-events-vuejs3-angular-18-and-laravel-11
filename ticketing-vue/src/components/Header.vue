<template>
  <header
    class="sticky top-0 bg-gray-50 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f0f2f5] px-10 py-2 shadow-sm">
    <router-link to="/" class="flex items-center justify-center bg-gray-400 rounded-md p-1">
      <img src="/src/assets/image/logo.webp" alt="ticket promotion image" loading="lazy" class="object-cover h-10">
    </router-link>
    <div class="flex flex-1 justify-end gap-8">
      <div class="flex items-center gap-9">
        <button class="text-textPrimary text-sm font-medium leading-normal"
          @click="toDashboard" >Dashboard</button>
        <button class="text-textPrimary text-sm font-medium leading-normal"
          @click="toEvents">Events</button>
        <button class="text-textPrimary text-sm font-medium leading-normal"
          @click="toMyTickets">My Tickets</button>
      </div>
      <button 
        class="text-white bg-primary hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
          @click="toPricing">Create Events</button>
      <div v-if="isLogin == true" class="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 ring-1 ring-blue-300 dark:ring-blue-500"
        @click="toAccount" :style="{backgroundImage: `url(${user?.avatar})`}">
      </div>
      <div v-else class="flex gap-2">
        <button @click="toLogin"
          class="text-white bg-primary hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
          <span class="truncate">Sign In</span>
        </button>
      </div>
    </div>
  </header>
</template>
<script>
import router from '@/router';
import { useAuthStore } from '@/stores/auth';
import Pricing from '@/views/Pricing.vue';
import { computed, onMounted, reactive, toRefs } from 'vue';
import { RouterLink } from 'vue-router';

export default {
  setup(props) {
    const state = reactive({
      isLogin: false,
      user: {
        username: '',
        email: '',
        id: '',
        role: '',
        avatar: ''
      }

    });

    const authStore = useAuthStore();

    state.isLogin = computed(() => authStore.isLogin);

    const toDashboard = () => {
      router.push({ name: 'Dashboard' })
    }
    const toMyTickets = () => {
      router.push({ name: 'Mytickets' })
    }
    const toEvents = () => {
      router.push({ name: 'Events' })
    }

    const toPricing = () => {
      router.push({ name: 'Pricing' })
    }

    const toAccount = () => {
      router.push({ name: 'Account' })
    }

    const toLogin = () => {
      router.push({name: 'Login'})
    }

    onMounted(() => {
      authStore.checkLogin();
      if (!state.isLogin || !state.user.avatar) {
        state.user.avatar = 'https://via.placeholder.com/150';
      }
    })

    return {
      ...toRefs(state),
      toDashboard,
      toEvents,
      toPricing,
      toMyTickets,
      toPricing,
      toLogin,
      toAccount,
    }
  }
}
</script>
<style>
.header {
  position: sticky;
  top: 0;
  z-index: 10;
  /* Ensure it's above other content */
  background-color: #fff;
  /* Ensure the background color is set */
  border-bottom: 1px solid #f0f2f5;
  /* Ensure the border color is set */
}
</style>