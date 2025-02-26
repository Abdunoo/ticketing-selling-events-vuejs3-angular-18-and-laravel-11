<template>
  <section>
    <loading :isLoading="isLoading" />
    <div class="px-4 lg:px-40 flex flex-1 justify-center py-5">
      <div class="layout-content-container flex flex-col py-5 max-w-full lg:max-w-[960px] flex-1">
        <div class="@container">
          <div class="p-4">
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

        <h2 class="text-textPrimary text-lg lg:text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
          Description
        </h2>
        <p class="text-textPrimary text-base font-normal leading-normal pb-3 pt-1 px-4">
          {{ event.description }}
        </p>

        <h2 class="text-textPrimary text-lg lg:text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
          Date and Time
        </h2>
        <p class="text-textPrimary text-base font-normal leading-normal pb-3 pt-1 px-4">
          {{ formatDate(event.start_datetime) }}
        </p>

        <h2 class="text-textPrimary text-lg lg:text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
          Location
        </h2>
        <p class="text-textPrimary text-base font-normal leading-normal pb-3 pt-1 px-4">
          {{ event.location }}
        </p>
      </div>
    </div>
  </section>
</template>

<script>
import apiClient from '@/helpers/axios';
import router from '@/router';
import { defineAsyncComponent, onMounted, reactive, toRefs } from 'vue';
import { useRoute } from 'vue-router';
import { useHead } from '@vueuse/head'; 

const Loading = defineAsyncComponent(() => import('@/components/Loading.vue'));

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
            updateMetaTags(state.event);
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

    const updateMetaTags = (event) => {
      useHead({
        title: `${event.name} - Ticketku Web Application`, 
        meta: [
          { name: 'description', content: event.description },
          { property: 'og:title', content: event.name }, 
          { property: 'og:description', content: event.description }, 
          { property: 'og:image', content: event.image_banner }, 
          { name: 'twitter:title', content: event.name }, 
          { name: 'twitter:description', content: event.description }, 
          { name: 'twitter:image', content: event.image_banner }, 
        ],
      });
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