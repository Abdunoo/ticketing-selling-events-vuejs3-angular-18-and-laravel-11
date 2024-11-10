<template>
  <section>
    <loading :isLoading="isLoading" />
    <div class="px-4 sm:px-10 md:px-20 flex flex-1 justify-center py-5">
      <div class="layout-content-container flex flex-col max-w-full sm:max-w-[960px] flex-1">
        <h1 class="text-center text-2xl sm:text-3xl font-semibold mb-8 text-gray-800">Review and Purchase</h1>

        <!-- Event Info -->
        <div class="flex flex-col items-center justify-center mb-8 text-center">
          <img v-lazy="event.image_banner" :alt="event.name" class="bg-gray-200 w-24 h-24 rounded-full">
          <div class="mt-4">
            <h2 class="text-xl sm:text-2xl font-bold text-gray-700">{{ event.name }}</h2>
            <p class="text-gray-600 text-sm sm:text-base">{{ event.location }} | {{ formatDate(event.start_datetime) }}
            </p>
          </div>
        </div>

        <!-- Ticket Types -->
        <div class="mb-8">
          <p class="text-lg font-semibold text-gray-700 mb-4">Select Ticket Type and Quantity</p>
          <div class="space-y-4" v-for="type in ticketType" :key="type.id">
            <!-- Ticket -->
            <label
              class="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm hover:bg-gray-100 cursor-pointer"
              :class="{ 'bg-gray-100': selectedTicket == type.name }">
              <input type="radio" :value="type.name" v-model="selectedTicket" required class="hidden">
              <div>
                <p class="font-medium text-gray-800">{{ type.name }}</p>
                <p class="text-gray-500">{{ formatCurrency(type.price) }}</p>
              </div>
              <div class="flex items-center space-x-2">
                <p class="text-sm text-gray-600">Qty:</p>
                <input type="number" v-if="selectedTicket === type.name"
                  v-model.number="quantity[type.name.toLowerCase()]" :min="1" :max="type.available_quantity" required
                  class="w-16 p-1 border rounded-lg text-center bg-gray-50" />
              </div>
            </label>
          </div>
        </div>

        <!-- ID Required Notice
      <div class="text-center mb-8">
        <a href="#" class="text-blue-500 text-sm hover:underline">ID Required for R-Rated Movies</a>
      </div>
   -->
        <!-- Total and Continue Button -->
        <div class="text-center">
          <p class="text-xl font-semibold mb-6 text-gray-800">Total: {{ formatCurrency(countTotalPrice()) }}</p>
          <button class="bg-blue-600 text-white py-3 px-8 rounded-lg w-full hover:bg-blue-700" @click="toStore()">
            Continue
          </button>
        </div>
      </div>
    </div>
    <div v-if="xenditInvoice" class="fixed inset-0 z-40 bg-black bg-opacity-70"></div>
    <div v-if="xenditInvoice" class="fixed inset-0 md:inset-20 z-50  items-center justify-center bg-white">
      <iframe :src="xenditInvoice" frameborder="0" class="w-full h-full"></iframe>
    </div>
  </section>
</template>

<script>
import { defineAsyncComponent, onMounted, reactive, toRefs } from 'vue';
import apiClient from '@/helpers/axios';
import { useToast } from 'vue-toastification';
import router from '@/router';
import { useHead } from '@vueuse/head'; // Import useHead to manage dynamic meta tags

const Loading = defineAsyncComponent(() => import('@/components/Loading.vue'));

export default {
  name: 'Checkout',
  components: { Loading },
  setup() {
    const state = reactive({
      event: {},
      ticketType: [],
      selectedTicket: '',
      quantity: {},
      totalPrice: 0,
      price: 0,
      xenditInvoice: null,
      isLoading: false,
    });

    const toast = useToast();

    const formatCurrency = (value) => new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);

    const formatDate = (datetime) => {
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
      return new Date(datetime).toLocaleDateString('en-US', options);
    };

    const countTotalPrice = () => {
      const selectedTicketType = state.ticketType.find(
        (type) => type.name === state.selectedTicket
      );
      if (selectedTicketType) {
        const quantity = state.quantity[state.selectedTicket.toLowerCase()] || 0;
        state.totalPrice = quantity * parseFloat(selectedTicketType.price);
        state.price = parseFloat(selectedTicketType.price);
      }
      return state.totalPrice;
    };

    const fetchEvent = () => {
      state.isLoading = true;
      const event = JSON.parse(localStorage.getItem('event'));
      if (!event) {
        toast.error('Failed to retrieve event data. Please try again.');
        router.push('/')
      }
      state.event = event;
      state.ticketType = event.ticket_types || [];
      // Set dynamic meta tags after event data is fetched
      updateMetaTags(event);

      state.isLoading = false;
    };

    const toStore = async () => {
      state.isLoading = true;
      const selectedQuantity = state.quantity[state.selectedTicket.toLowerCase()] || 0;

      if (!state.selectedTicket || selectedQuantity <= 0) {
        toast.error('Please select a ticket type and enter a valid quantity.');
        state.isLoading = false;
        return;
      }

      let formData = new FormData();
      formData.append('total_price', parseInt(state.totalPrice));
      formData.append('event_id', parseInt(state.event.id));
      formData.append('quantity', parseInt(selectedQuantity));
      formData.append('price', parseInt(state.price));
      formData.append('ticket_type', state.selectedTicket);

      try {
        const response = await apiClient.post('/api/orders', formData);
        if (response.code == 200) {
          state.isLoading = true;
          state.xenditInvoice = response.data.url_invoice;
          state.isLoading = false;
        } else {
          toast.error('Failed to create order. Please try again.');
        }
      } catch (error) {
        console.error('Error creating order:', error);
        toast.error('An error occurred while creating the order. Please try again later.');
      }
      state.isLoading = false;
    };

    const updateMetaTags = (event) => {
      // Use `useHead` to update title and meta tags dynamically
      useHead({
        title: `${event.name} - Checkout - Ticketku Web Application`, // Dynamic title with event name
        meta: [
          { name: 'description', content: `Purchase tickets for ${event.name}` }, // Meta description
          { property: 'og:title', content: `Checkout - ${event.name}` }, // Open Graph title
          { property: 'og:description', content: `Purchase tickets for ${event.name} and enjoy the event!` }, // Open Graph description
          { property: 'og:image', content: event.image_banner }, // Open Graph image
          { property: 'og:url', content: 'https://sandbox2.panemu.com/ticketing/checkout' }, // Open Graph image
          { name: 'twitter:title', content: `Checkout - ${event.name}` }, // Twitter card title
          { name: 'twitter:description', content: `Purchase tickets for ${event.name} now!` }, // Twitter card description
          { name: 'twitter:image', content: event.image_banner }, // Twitter card image
        ],
      });
    };

    onMounted(() => {
      fetchEvent();
    });

    return {
      ...toRefs(state),
      formatCurrency,
      formatDate,
      countTotalPrice,
      toStore,
    };
  },
};
</script>

<style scoped>
/* Add any custom styles if needed */
</style>
