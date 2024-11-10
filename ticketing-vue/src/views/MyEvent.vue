<template>
    <section>
        <loading :isLoading="isLoading" />
        <div class="px-4 sm:px-10 md:px-20 flex flex-1 justify-center py-5">
            <div class="layout-content-container flex flex-col max-w-[960px] flex-1">
                <h2 class="text-[#111418] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Your
                    events</h2>

                <!-- Search Input -->
                <input v-model="searchQuery" @input="debouncedSearch" type="text"
                    class="mb-4 p-2 border border-gray-300 rounded" placeholder="Search events..." />

                <!-- Event List -->
                <div v-for="event in events" :key="event.id"
                    class="flex items-center gap-4 bg-white px-4 min-h-[72px] py-2 justify-between">
                    <div class="flex items-center gap-4">
                        <div class="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-14"
                            :style="{ backgroundImage: `url(${event.image_banner})` }"></div>
                        <div class="flex flex-col justify-center">
                            <p class="text-[#111418] text-base font-medium leading-normal line-clamp-1">{{ event.name }}
                            </p>
                            <p class="text-[#60758a] text-sm font-normal leading-normal line-clamp-2">{{
                                formatDate(event.start_datetime) }}</p>
                        </div>
                    </div>
                    <div class="flex space-x-2">
                        <!-- Edit Button: Route to event edit page -->
                        <router-link :to="`/edit-event/${event.id}`">
                            <button
                                class="text-base font-medium leading-normal bg-primary hover:bg-blue-600 text-white p-1 rounded">Edit</button>
                        </router-link>

                        <!-- Delete Button: Trigger delete function -->
                        <button @click="deleteEvent(event.id)"
                            class="text-base font-medium leading-normal bg-red-500 hover:bg-red-600 text-white p-1 rounded">Remove</button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { ref, reactive, onMounted, onBeforeUnmount, toRefs, defineAsyncComponent } from 'vue';
import apiClient from '@/helpers/axios';
import { useRouter } from 'vue-router';  // If using Vue Router
import { useHead } from '@vueuse/head';
const Loading = defineAsyncComponent(() => import('@/components/Loading.vue'));

export default {
    name: 'My Events',
    components: {
        Loading,
    },
    setup() {
        const router = useRouter();
        const state = reactive({
            events: [],
            isLoading: false,
            currentPage: 1,
            totalPages: 1,
            hasMoreEvents: true,
            searchQuery: '', // Search query for filtering
        });

        // Fetch events from API
        const fetchEvents = async (page = 1, query = '') => {
            if (state.isLoading || !state.hasMoreEvents) return;

            state.isLoading = true;
            try {
                const response = await apiClient.get('/api/events/my_events', {
                    params: {
                        page,
                        limit: 6,
                        search: query || undefined,
                    },
                });

                if (response.code === 200) {
                    const newEvents = response.data.data;
                    state.events = page === 1 ? newEvents : [...state.events, ...newEvents];
                    state.totalPages = response.data.last_page;
                    state.hasMoreEvents = page < state.totalPages;
                }
            } catch (error) {
                console.error('Error fetching events:', error);
            } finally {
                state.isLoading = false;
            }
        };

        // Handle scroll for infinite loading
        const handleScroll = () => {
            const bottomOfWindow = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 200;
            if (bottomOfWindow && state.hasMoreEvents && !state.isLoading) {
                state.currentPage += 1;
                fetchEvents(state.currentPage, state.searchQuery);
            }
        };

        // Debounced search input handler
        const debouncedSearch = () => {
            state.currentPage = 1;
            state.hasMoreEvents = true;
            setTimeout(() => {
                fetchEvents(1, state.searchQuery.trim());
            }, 500);
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

        // Delete event function
        const deleteEvent = async (eventId) => {
            if (confirm('Are you sure you want to delete this event?')) {
                state.isLoading = true;
                try {
                    const response = await apiClient.delete(`/api/events/${eventId}`);
                    if (response.code === 200) {
                        // Remove the deleted event from the list
                        state.events = state.events.filter(event => event.id !== eventId);
                    }
                } catch (error) {
                    console.error('Error deleting event:', error);
                } finally {
                    state.isLoading = false;
                }
            }
        };

        useHead({
            title: 'My Events - Ticketku Web Application',
            meta: [
                { name: 'description', content: 'Manage your events and explore upcoming events in your list.' },
                { name: 'keywords', content: 'my events, manage events, personal events, event list' },
            ],
        });

        onMounted(() => {
            fetchEvents();
            window.addEventListener('scroll', handleScroll);
        });

        onBeforeUnmount(() => {
            window.removeEventListener('scroll', handleScroll);
        });

        return {
            ...toRefs(state),
            debouncedSearch,
            formatDate,
            deleteEvent,
        };
    },
};
</script>

<style scoped>
/* Add any custom styles here */
</style>
