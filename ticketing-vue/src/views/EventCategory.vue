<template>
  <loading :isLoading="isLoading" />
  <div class="px-4 sm:px-10 md:px-20 flex flex-1 justify-center py-5">
    <div class="layout-content-container flex flex-col max-w-full sm:max-w-[960px] flex-1">
      <div class="px-4 py-3">
        <!-- Search Bar -->
        <label class="flex flex-col min-w-40 h-12 w-full">
          <div class="flex w-full flex-1 items-stretch rounded-xl h-full">
            <div
              class="text-[#60758a] flex border-none bg-[#f0f2f5] items-center justify-center pl-4 rounded-l-xl border-r-0"
              data-icon="MagnifyingGlass" data-size="24px" data-weight="regular">
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor"
                viewBox="0 0 256 256">
                <path
                  d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z">
                </path>
              </svg>
            </div>
            <input v-model="searchQuery" @input="handleSearch" placeholder="Search for events, artists, teams"
              class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111418] focus:outline-0 focus:ring-0 border-none bg-[#f0f2f5] focus:border-none h-full placeholder:text-[#60758a] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal" />
          </div>
        </label>
      </div>

      <!-- Categories -->
      <div class="flex gap-3 p-3 overflow-x-auto no-scrollbar">
        <div v-for="category in categories" :key="category.id"
          class="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-xl bg-[#f0f2f5] px-4 text-sm font-medium leading-normal text-[#111418]">
          <p>{{ category.name }}</p>
        </div>
      </div>

      <!-- Popular Events Section with Horizontal Scroll -->
      <h2 class="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Popular</h2>
      <div class="p-4 overflow-x-auto no-scrollbar">
        <div class="flex items-stretch p-4 gap-3">
          <div v-for="event in events" :key="event.id">
            <div
              class="flex h-auto flex-1 flex-col gap-4 rounded-xl bg-white shadow-[0_0_4px_rgba(0,0,0,0.1)] min-w-60">
              <div class="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl flex flex-col"
                :style="{ backgroundImage: `url(${event.image_banner})` }"></div>
              <div class="flex flex-col  p-4 pt-0 gap-4 space-y-6">
                <div>
                  <p class="text-[#111418] text-base font-medium leading-normal line-clamp-1">{{ event.name }}</p>
                  <p class="text-[#60758a] text-sm font-normal leading-normal line-clamp-1">{{ formatDate(event.start_datetime) }} · {{ event.location }}</p>
                </div>
                <button @click="toDetail(event)"
                  class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#f0f2f5] text-[#111418] text-sm font-bold leading-normal tracking-[0.015em]">
                  <span class="truncate">See details</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- Trending Section as Vertical Scrollable Grid -->
      <h2 class="text-white text-2xl font-bold leading-tight max-w-[440px]">Trending</h2>
      <p class="text-white text-base font-medium leading-normal mb-4">Hot deals and discounts</p>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <EventCard v-for="event in events" :key="event.id" :event="event" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted, onBeforeUnmount, defineAsyncComponent, toRefs } from 'vue';
import apiClient from '@/helpers/axios';
import router from '@/router';
const Loading = defineAsyncComponent(() => import('@/components/Loading.vue'));
const EventCard = defineAsyncComponent(() => import('@/components/EventCard.vue'));

export default {
  name: 'EventCategoryPage',
  components: {
    Loading,
    EventCard,
  },
  setup() {
    const state = reactive({
      events: [],
      isLoading: false,
      currentPage: 1,
      totalPages: 1,
      hasMoreEvents: true,
      searchQuery: '',
      categories: [],
    });

    const fetchEvents = async (page = 1, query = '') => {
      if (state.isLoading || !state.hasMoreEvents) return;
      state.isLoading = true;
      try {
        const response = await apiClient.get(`/api/events/list`, {
          params: { page, limit: 6, search: query || undefined }
        });
        if (response.code === 200) {
          state.events = page === 1 ? response.data.data : [...state.events, ...response.data.data];
          state.totalPages = response.data.last_page;
          state.hasMoreEvents = page < state.totalPages;
        }
      } catch (error) {
        console.error(error);
      } finally {
        state.isLoading = false;
      }
    };

    const getCategories = async () => {
      try {
        const response = await apiClient.get('/api/categories/list');
        state.categories = response.data;
      } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
      }
    }

    const handleSearch = () => {
      state.currentPage = 1;
      state.hasMoreEvents = true;
      const trimmedQuery = state.searchQuery.trim();
      setTimeout(() => {
        fetchEvents(1, trimmedQuery || '');
      }, 500);
    };

    const handleScroll = () => {
      const bottomOfWindow = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 10;
      if (bottomOfWindow && state.hasMoreEvents && !state.isLoading) {
        state.currentPage += 1;
        fetchEvents(state.currentPage, state.searchQuery);
      }
    };

    const toDetail = (event) => {    
      router.push(`/${event.slug}`);
    };

    const formatDate = (dateTimeString) => {
      const date = new Date(dateTimeString);
      const options = {
        weekday: 'short', // Short day of the week (e.g., Sun)
        month: 'short',   // Short month (e.g., Jan)
        day: 'numeric',   // Numeric day of the month (e.g., 12)
      };
      return date.toLocaleString('en-US', options);
    }

    onMounted(() => {
      fetchEvents();
      getCategories();
      window.addEventListener('scroll', handleScroll);
    });
    onBeforeUnmount(() => {
      window.removeEventListener('scroll', handleScroll);
    });

    return {
      ...toRefs(state),
      handleSearch,
      formatDate,
      toDetail,
    };
  },
};
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
