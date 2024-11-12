<template>
  <header
    class="sticky top-0 bg-gray-50 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f0f2f5] px-10 py-2 shadow-sm">
    <div class="flex space-x-2 items-center cursor-pointer">
      <router-link to="/" class="flex items-center justify-center bg-gray-400 rounded-md p-1">
        <img v-lazy="logo" alt="ticket promotion image" class="object-cover h-[30px] w-[40px]">
      </router-link>
      <span v-if="currentPath && currentPath !== 'Dashboard'"
        class="flex items-center justify-center space-x-1 italic text-primary text-sm">
        <router-link :to="{ name: 'Dashboard' }" class="underline ">
          Dashboard
        </router-link>
        <span>></span>
        <router-link :to="{ name: currentPath }" class="underline ">
          {{ currentPath }}
        </router-link>
      </span>


    </div>
    <div class="flex flex-1 justify-end gap-8">
      <div class="flex items-center gap-9">
        <button class="text-textPrimary text-sm font-medium leading-normal" @click="toDashboard">Dashboard</button>
        <button class="text-textPrimary text-sm font-medium leading-normal" @click="toEvents">Events</button>
        <button class="text-textPrimary text-sm font-medium leading-normal" @click="toMyTickets">My Tickets</button>
      </div>
      <button
        class="text-white bg-primary hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
        @click="toPricing">Create Events</button>
      <div v-if="isLogin == true"
        class="rounded-full size-10 ring-1 ring-blue-300 dark:ring-blue-500"
        @click="toAccount">
        <img v-lazy="user.avatar" class="bg-center bg-no-repeat aspect-square bg-cover  size-10 object-cover rounded-full" :alt="user.name">
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
import { computed, onMounted, reactive, ref, toRefs, watch } from 'vue';
import { useRoute } from 'vue-router';
import defaultPicture from '@/assets/image/not_found.webp';
import logo from '@/assets/image/logo.webp';

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
      },
      currentPath: ref(null),
      logo,
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
      router.push({ name: 'Login' })
    }

    const route = useRoute();

    state.currentPath = ref(route.name);

    watch(route, (newRoute) => {
      state.currentPath = newRoute.name;
    });

    onMounted(() => {
      authStore.checkLogin();
      if (!state.isLogin || !state.user.avatar) state.user.avatar = defaultPicture;
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
  background-color: #fff;
  border-bottom: 1px solid #f0f2f5;
}
</style>