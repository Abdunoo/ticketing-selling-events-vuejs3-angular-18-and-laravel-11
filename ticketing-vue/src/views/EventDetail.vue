<template>
  <loading :isLoading="isLoading" />
  <div class="px-4 lg:px-40 flex flex-1 justify-center py-5">
    <div class="layout-content-container flex flex-col py-5 max-w-full lg:max-w-[960px] flex-1">
      <div class="@container">
        <div class="p-4">
          <!-- Event Banner Section -->
          <div
            class="flex min-h-[280px] lg:min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-lg lg:rounded-xl items-start justify-end px-4 pb-10 lg:px-10"
            :style="{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url(${event.image_banner})` }">
            <div class="flex flex-col gap-2 text-left">
              <h1 class="text-white text-3xl lg:text-5xl font-black leading-tight tracking-[-0.033em]">
                {{ event.name }}
              </h1>
              <h2 class="text-white text-sm lg:text-base font-normal leading-normal">
                {{ formatDate(event.start_datetime) }}
              </h2>
            </div>
            <div @click="toCheckout()"
              class="flex min-w-[84px] max-w-full lg:max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 lg:h-12 lg:px-5 bg-primary text-white text-sm lg:text-base font-bold leading-normal tracking-[0.015em]">
              <span class="truncate">Buy Tickets</span>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Event Description Section -->
      <h2 class="text-textPrimary text-lg lg:text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
        Description
      </h2>
      <p class="text-textPrimary text-base font-normal leading-normal pb-3 pt-1 px-4">
        {{ event.description }}
      </p>
  
      <!-- Date and Time Section -->
      <h2 class="text-textPrimary text-lg lg:text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
        Date and Time
      </h2>
      <p class="text-textPrimary text-base font-normal leading-normal pb-3 pt-1 px-4">
        {{ formatDate(event.start_datetime) }}
      </p>
  
      <!-- Location Section -->
      <h2 class="text-textPrimary text-lg lg:text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
        Location
      </h2>
      <p class="text-textPrimary text-base font-normal leading-normal pb-3 pt-1 px-4">
        {{ event.location }}
      </p>
  
      <!-- Pricing Section (Hidden for now) -->
      <!--
          <h2 class="text-textPrimary text-lg lg:text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
            Pricing
          </h2>
          <div v-for="type in ticketype" :key="type.id">
            <div class="flex items-center gap-4 bg-white px-4 min-h-[72px] py-2 justify-between">
              <div class="flex flex-col justify-center">
                <p class="text-textPrimary text-base font-medium leading-normal line-clamp-1">
                  {{ type.name }}
                </p>
                <p class="text-textSecondary text-sm font-normal leading-normal line-clamp-2">${{ type.price }}</p>
              </div>
              <div class="shrink-0">
                <router-link :to="{ name: 'Checkout' }"
                  class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-8 px-4 bg-secondary text-textPrimary text-sm font-medium leading-normal w-fit">
                  <span class="truncate">Buy</span>
                </router-link>
              </div>
            </div>
          </div>
          -->
    </div>
  </div>
</template>
  
  <script>
import Loading from '@/components/Loading.vue';
import apiClient from '@/helpers/axios';
import router from '@/router';
import { onMounted, reactive, toRefs } from 'vue';
import { useRoute } from 'vue-router';

export default {
  components: {
    Loading
  },
  setup() {
    const state = reactive({
      event: {},
      isLoading: false,
    });

    const fetchDetailEvent = async () => {
      state.isLoading = true;
      const route = useRoute();
      const eventName = route.params.event_name;
      await apiClient.get(`/api/events/by-slug/${eventName}`)
        .then(response => {
          if (response.code == 200) {
            state.event = response.data;
            localStorage.setItem('event', JSON.stringify(state.event));
          }
        })
        .catch(error => {
          console.error(error);
        });
        state.isLoading = false;
    };

    const formatDate = (dateTimeString) => {
      const date = new Date(dateTimeString);
      const options = {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      };
      return date.toLocaleString('en-US', options);
    };

    const toCheckout = () => {
      localStorage.setItem('event', JSON.stringify(state.event));
      router.push({ name: 'Checkout' });
    };

    onMounted(() => {
      fetchDetailEvent();
    });

    return {
      ...toRefs(state),
      formatDate,
      toCheckout,
    };
  },
};
  </script>
  
  <style>
/* Custom styles can be added here if necessary */
</style>
  