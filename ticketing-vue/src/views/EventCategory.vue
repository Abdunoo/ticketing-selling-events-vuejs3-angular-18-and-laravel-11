<template>
  <section>
    <loading :isLoading="isLoading" />
    <div class="px-4 sm:px-10 md:px-20 flex flex-1 justify-center py-5">
      <div class="layout-content-container flex flex-col max-w-full sm:max-w-[960px] flex-1">
        <div class="px-4 py-3">
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

        <div class="flex gap-3 p-3 overflow-x-auto no-scrollbar" style="min-height: 50px;">
          <div v-for="category in categories" :key="category.id"
            :class="{
              'bg-primary': category.name === cat,
              'bg-[#f0f2f5]': category.name !== cat,
            }" @click="handleCat(category?.name)"
            class="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-xl px-4 text-sm font-medium leading-normal text-[#111418] cursor-pointer transition-all duration-300">
            <p
              :class="{
                'text-white': category.name === cat,
                'text-[#111418]': category.name !== cat
              }"
              class="h-full w-full flex items-center justify-center rounded-xl transition-all duration-300">
              {{ category?.name }}
            </p>
          </div>
        </div>

        <h2 v-show="!searchQuery" class="text-textPrimary text-2xl font-bold leading-tight max-w-md">Popular</h2>
        <p v-show="!searchQuery" class="text-textSecondary text-base font-medium leading-normal mb-4">Only new for you</p>
        <div v-show="!searchQuery" class="overflow-x-auto no-scrollbar" style="min-height: 180px;">
          <div class="flex items-stretch gap-3">
            <div v-if="isLoading" class="placeholder-content">
              <div class="w-full aspect-video bg-gray-200 rounded-xl mb-4"></div>
              <div class="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div class="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
            <PopCard
              v-for="(event, index) in popular"
              :key="event.id"
              :event="event"
              :index="index"
              @go-to-detail="toDetail"
            />
          </div>
        </div>

        <h2 class="text-textPrimary text-2xl font-bold leading-tight max-w-md">Trending</h2>
        <p class="text-textSecondary text-base font-medium leading-normal mb-4">Hot deals and discounts</p>
        <div v-if="!isLoading && events.length === 0" class="flex justify-center py-5">
          <p class="text-lg font-medium text-gray-500">Data Not Found</p>
        </div>
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" style="min-height: 300px;">
          <EventCard
            v-for="(event, index) in events" 
            :key="event.id" 
            :event="event"
            :index="index"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { reactive, onMounted, onBeforeUnmount, defineAsyncComponent, toRefs } from 'vue';
import apiClient from '@/helpers/axios';
import router from '@/router';
import { useHead } from '@vueuse/head';

const Loading = defineAsyncComponent(() => import('@/components/Loading.vue'));
const EventCard = defineAsyncComponent(() => import('@/components/EventCard.vue'));
const PopCard = defineAsyncComponent(() => import('@/components/PopCard.vue'));

export default {
  name: 'EventCategoryPage',
  components: {
    Loading,
    EventCard,
    PopCard,
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
      popular: [],
      cat: 'All',
    });

    const debouncedSearch = async (query) => {
      state.currentPage = 1;
      state.hasMoreEvents = true;
      await fetchEvents(1, query, state.cat);
    }

    const fetchEvents = async (page = 1, query = '', cat = '') => {
      if (state.isLoading || (!state.hasMoreEvents && !cat)) return;
      if (cat === 'All') cat = '';
      state.isLoading = true;
      try {
        const response = await apiClient.get(`/api/events/list`, {
          params: { page, limit: 6, search: query || undefined, cat }
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

    const fetchPopularEvent = async () => {
      if (state.popular.length > 0) return; 
      try {
        const response = await apiClient.get('/api/events/get_popular_events');
        state.popular = response.data;
      } catch (error) {
        console.error('Error fetching popular event:', error);
      }
    };

    const getCategories = async () => {
      if (state.categories.length > 0) return; 
      try {
        const response = await apiClient.get('/api/categories/list');
        state.categories = response.data;
        state.categories.unshift({ name: 'All', id: 0 });
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    const handleSearch = () => {
      const trimmedQuery = state.searchQuery.trim();
      debouncedSearch(trimmedQuery || '');
    };

    const handleCat = (cat) => {
      state.cat = cat;
      const trimmedQuery = state.searchQuery.trim();
      fetchEvents(1, trimmedQuery || '', cat);
    };

    const handleScroll = () => {
      const bottomOfWindow = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 10;
      if (bottomOfWindow && state.hasMoreEvents && !state.isLoading) {
        state.currentPage += 1;
        fetchEvents(state.currentPage, state.searchQuery, state.cat);
      }
    };

    const toDetail = (event) => {
      router.push(`/${event.slug}`);
    };

    const formatDate = (dateTimeString) => {
      const date = new Date(dateTimeString);
      const options = {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      };
      return date.toLocaleString('en-US', options);
    };

    useHead({
      title: 'Event Categories - Ticketku Web Application',
      meta: [
        { name: 'description', content: 'Browse events by category and find what interests you the most.' },
        { name: 'keywords', content: 'events, categories, entertainment, listings' },
      ],
    });

    onMounted(() => {
      getCategories();
      fetchPopularEvent();
      fetchEvents();
      window.addEventListener('scroll', handleScroll);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('scroll', handleScroll);
    });

    return {
      ...toRefs(state),
      handleSearch,
      handleCat,
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

.placeholder-content .bg-gray-200 {
  background-color: #e2e8f0;
}
</style>
