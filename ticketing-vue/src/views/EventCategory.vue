<template>
  <loading :isLoading="isLoading" />
  <div class="px-4 sm:px-10 md:px-20 flex flex-1 justify-center py-5">
    <div class="layout-content-container flex flex-col max-w-full sm:max-w-[960px] flex-1">
      <div class="px-4 py-3">
        <label class="flex flex-col min-w-40 h-12 w-full">
          <div class="flex w-full flex-1 items-stretch rounded-xl h-full">
            <div
              class="text-textSecondary flex border-none bg-secondary items-center justify-center pl-4 rounded-l-xl border-r-0"
              data-icon="MagnifyingGlass" data-size="24px" data-weight="regular">
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor"
                viewBox="0 0 256 256">
                <path
                  d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z">
                </path>
              </svg>
            </div>
            <input v-model="searchQuery" @input="handleSearch" placeholder="Search events, artists, or venues"
              class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-textPrimary focus:outline-0 focus:ring-0 border-none bg-secondary focus:border-none h-full placeholder:text-textSecondary px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal" />
          </div>
        </label>
      </div>
      <div class="flex gap-3 p-3 flex-wrap pr-4">
        <!-- Categories (can remain the same) -->
      </div>
      <h2 v-if="!searchQuery.trim()"
        class="text-textPrimary text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Popular Near You
      </h2>
      <div class="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] lg:grid-cols-5 gap-3 p-4">
        <EventCard v-for="event in events" :key="event.id" :event="event" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted, onBeforeUnmount, toRefs, watch, defineAsyncComponent } from 'vue';
import apiClient from '@/helpers/axios';
const EventCard = defineAsyncComponent(() => import('@/components/EventCard.vue'));
const Loading = defineAsyncComponent(() => import('@/components/Loading.vue'));

export default {
  name: 'EventCategoryPage',
  components: {
    EventCard,
    Loading,
  },

  setup() {
    const state = reactive({
      events: [],
      isLoading: false,
      currentPage: 1,
      totalPages: 1,
      hasMoreEvents: true,
      searchQuery: '', // New search query state
    });

    const fetchEvents = async (page = 1, query = '') => {
      if (state.isLoading || !state.hasMoreEvents) return;

      state.isLoading = true;
      try {
        const response = await apiClient.get(`/api/events/list`, {
          params: {
            page,
            limit: 6,
            search: query || undefined, // Add the search query to the request
          }
        });

        if (response.code === 200) {
          if (page === 1) {
            state.events = response.data.data;
          } else {
            state.events = [...state.events, ...response.data.data];
          }
          state.totalPages = response.data.last_page;
          state.hasMoreEvents = page < state.totalPages;
        }
      } catch (error) {
        console.error(error);
      } finally {
        state.isLoading = false;
      }
    };

    const handleScroll = () => {
      const bottomOfWindow = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 10;
      if (bottomOfWindow && state.hasMoreEvents && !state.isLoading) {
        state.currentPage += 1;
        fetchEvents(state.currentPage, state.searchQuery);
      }
    };

    const handleSearch = () => {
      state.currentPage = 1;
      state.hasMoreEvents = true;
      const trimmedQuery = state.searchQuery.trim();

      if (trimmedQuery !== '') {
        setTimeout(() => {
          fetchEvents(1, trimmedQuery); 
        }, 500);
      } else {
        fetchEvents(1, '');
      }
    };

    onMounted(() => {
      fetchEvents();
      window.addEventListener('scroll', handleScroll);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('scroll', handleScroll);
    });

    return {
      ...toRefs(state),
      handleSearch,
    };
  }
};
</script>
