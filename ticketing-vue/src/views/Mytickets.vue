<template>
  <loading :isLoading="isLoading" />
    <div class="h-full w-full px-4 sm:px-10 md:px-20 flex flex-1 justify-center py-5">
        <div class="layout-content-container flex flex-col max-w-full sm:max-w-[960px] flex-1">
            <div class="px-4 py-3 w-full h-full">
                <div class="flex items-center justify-between pb-6">
                    <div>
                        <h2 class="text-gray-600 font-semibold">Event Ticket Orders</h2>
                        <span class="text-xs">All event ticket orders</span>
                    </div>
                    <div class="flex items-center">
                        <div class="flex border border-borderColor items-center p-2 rounded-md">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
                                fill="currentColor">
                                <path fill-rule="evenodd"
                                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                    clip-rule="evenodd" />
                            </svg>
                            <input class="text-gray-700 outline-none ml-1 block" type="text" placeholder="Search...">
                        </div>
                    </div>
                </div>
    
                <div v-for="item in myTickets" :key="item.id" class="w-full mb-4">
                    <router-link class="flex w-full bg-white shadow-md rounded-lg p-4 space-x-4"
                        :to="{ name: 'MyticketsDetail', params: { id: item.id } }">
                        <!-- Image Section -->
                        <div class="w-1/4 h-32">
                            <img class="w-full h-full object-cover rounded-lg" :src="item.events.image_banner"
                                alt="Event Image" />
                        </div>
    
                        <!-- Content Section -->
                        <div class="w-3/4 flex flex-col justify-between">
                            <!-- Upper Content (Event Details) -->
                            <div class="flex flex-col space-y-2">
                                <div class="flex justify-between items-start space-x-2 ">
                                    <h3 class="text-lg font-semibold text-gray-900">{{ item.events.name }}</h3>
                                    <p :class="paymentStatusClass(item.payment_status)">{{ capitalize(item.payment_status) }}</p>
                                </div>
                                <p class="text-gray-500">Ticket {{ item.ticket_type }}</p>
                            </div>
    
                            <!-- Bottom Content (Total Price) -->
                            <div class="mt-4 flex items-center justify-between">
                                <p class="text-lg font-semibold text-gray-900">
                                    <span class="text-green-600">${{ item.total_price }}</span>
                                </p>
                                <button class="text-white bg-primary rounded-md px-2 py-1 text-base">Detail</button>
                            </div>
                        </div>
                    </router-link>
    
                </div>
    
            </div>
        </div>
    </div>
</template>

<script>
import { onMounted, reactive, toRefs } from 'vue';
import apiClient from '@/helpers/axios';
import Loading from '@/components/Loading.vue';

export default {
  components: {
    Loading
  },
  name: 'Orders',
  setup(props) {
    const state = reactive({
      myTickets: [],
      currentPage: 1,
      totalPages: 1,
      isLoading: false,
      hasMore: true,
    });

    const fetchMyTickets = async (page = 1) => {
      state.isLoading = true;
      try {
        const response = await apiClient.get(`/api/orders/list?page=${page}&limit=6`);
        state.myTickets = page === 1 ? response.data.data : state.myTickets.concat(response.data.data);
        state.totalPages = response.data.last_page;
        state.hasMore = page < state.totalPages;
      } catch (error) {
        console.error(error);
      } finally {
        state.isLoading = false;
      }
    };

    const handleScroll = () => {
      const bottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight;
      if (bottom) {
        state.currentPage += 1;
        fetchMyTickets(state.currentPage);
      }
    };

    const paymentStatusClass = (status) => status === 'pending' ? 'text-yellow-500 font-medium' : status === 'paid' ? 'text-green-500 font-bold' : 'text-red-500 font-medium';
    const capitalize = (str) => {
      if (!str || typeof str !== 'string') return '';
      return str.charAt(0).toUpperCase() + str.slice(1);
    };

    onMounted(() => {
      fetchMyTickets();
      window.addEventListener('scroll', handleScroll); 
    });

    return {
      ...toRefs(state),
      fetchMyTickets,
      paymentStatusClass,
      capitalize,
    };
  }
};
</script>

<style scoped>
/* Add any custom styles here */
</style>