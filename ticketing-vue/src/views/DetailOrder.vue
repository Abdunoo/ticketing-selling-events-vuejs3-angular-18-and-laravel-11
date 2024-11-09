<template>
  <section>
    <div class="layout-container flex h-full grow flex-col p-4 lg:p-0">
      <div class="lg:px-40 flex flex-1 justify-center py-5">
        <div class="layout-content-container flex flex-col w-full lg:w-[512px] max-w-full lg:max-w-[960px] flex-1">
          <!-- Banner Section -->
          <div>
            <div
              class="w-full bg-center bg-no-repeat bg-cover flex flex-col justify-end overflow-hidden bg-[#f8f8fc] rounded-lg lg:rounded-xl min-h-[150px] lg:min-h-[200px]"
              :style="{ backgroundImage: `url(${order?.events?.image_banner})` }">
            </div>
          </div>

          <!-- Order Info -->
          <h2
            class="text-[#0e0e1b] text-base sm:text-lg font-bold leading-tight tracking-[-0.015em] px-4 text-center pb-2 pt-4">
            Order Number: {{ order.order_no }}
          </h2>

          <!-- Ticket Info -->
          <div
            class="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-[#f8f8fc] px-4 min-h-[60px] sm:min-h-[72px] py-2 justify-between">
            <div class="flex flex-col justify-center">
              <p class="text-[#0e0e1b] text-sm sm:text-base font-medium leading-normal">{{ order.ticket_type }}</p>
              <p class="text-[#4e4e97] text-xs sm:text-sm font-normal leading-normal">{{ order.quantity }} tickets x {{
                formatCurrency(order.price) }}</p>
            </div>
            <div class="shrink-0">
              <p class="text-[#0e0e1b] text-sm sm:text-base font-normal leading-normal">{{
                formatCurrency(order.total_price) }}</p>
            </div>
          </div>

          <!-- Discount Info (Hidden if no discount applied) -->
          <div v-if="order.discount_amount > 0"
            class="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-[#f8f8fc] px-4 min-h-[60px] sm:min-h-[72px] py-2 justify-between">
            <div class="flex flex-col justify-center">
              <p class="text-[#0e0e1b] text-sm sm:text-base font-medium leading-normal">Discount</p>
              <p class="text-[#4e4e97] text-xs sm:text-sm font-normal leading-normal">{{
                formatCurrency(order.discount_amount) }}</p>
            </div>
          </div>

          <!-- Event Details -->
          <div class="p-4 grid grid-cols-[30%_1fr] gap-x-6 sm:grid-cols-[20%_1fr]">
            <div class="col-span-2 grid grid-cols-subgrid border-t border-t-[#d0d0e7] py-5">
              <p class="text-[#4e4e97] text-xs sm:text-sm font-normal leading-normal">Event Name</p>
              <p class="text-[#0e0e1b] text-xs sm:text-sm font-normal leading-normal">{{ order?.events?.name }}</p>
            </div>
            <div class="col-span-2 grid grid-cols-subgrid border-t border-t-[#d0d0e7] py-5">
              <p class="text-[#4e4e97] text-xs sm:text-sm font-normal leading-normal">Location</p>
              <p class="text-[#0e0e1b] text-xs sm:text-sm font-normal leading-normal">{{ order?.events?.location }}</p>
            </div>
            <div class="col-span-2 grid grid-cols-subgrid border-t border-t-[#d0d0e7] py-5">
              <p class="text-[#4e4e97] text-xs sm:text-sm font-normal leading-normal">Date & Time</p>
              <p class="text-[#0e0e1b] text-xs sm:text-sm font-normal leading-normal">{{
                formatDateTime(order?.events?.start_datetime) }}</p>
            </div>
          </div>

          <!-- Payment Status -->
          <h3 class="text-[#0e0e1b] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Payment Status
          </h3>
          <div class="flex flex-col gap-3 p-4">
            <div class="flex gap-6 justify-between">
              <p :class="paymentStatusClass(order.payment_status)">{{ capitalize(order.payment_status) }}</p>
            </div>
            <div class="rounded bg-[#d0d0e7]">
              <div class="h-2 rounded bg-primary" :style="{ width: order.payment_status === 'paid' ? '100%' : '0%' }">
              </div>
            </div>
            <p class="text-[#4e4e97] text-sm font-normal leading-normal">
              {{ formatCurrency(order.total_price) }} {{ order.payment_status === 'paid' ? 'paid on ' +
                formatDateTime(order.pay_date) : '' }}
            </p>
          </div>

          <!-- Invoice Button -->
          <div class="flex px-4 py-3">
            <button v-if="order.payment_status == 'paid'" @click="showModal=true"
              class="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 flex-1 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em]">
              <span class="truncate">Download Ticket</span>
            </button>
            <button v-else @click="toPay"
              class="flex w-full cursor-pointer items-center justify-center overflow-hidden border-4 border-primary rounded-xl h-10 px-4 flex-1 bg-white text-primary text-sm font-bold leading-normal tracking-[0.015em]">
              <span class="truncate">View Invoice</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="xenditInvoice" class="fixed inset-0 z-40 bg-black bg-opacity-70"></div>
    <div v-if="xenditInvoice" class="fixed inset-0 md:inset-20 z-50  items-center justify-center bg-white">
      <iframe :src="xenditInvoice" frameborder="0" class="w-full h-full"></iframe>
    </div>

    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div class="relative w-full max-w-3xl p-4">
        <!-- Ticket component as popup -->
        <Ticket
          :event="order.events"
          :ticketCode="order.order_no"
          :ticketType="order.ticket_type"
          :ticketQuantity="order.quantity"
        />
        <!-- Close button -->
        <button @click="showModal = false"
          class="absolute top-5 right-2 bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded">
          Close
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import { onMounted, reactive, toRefs } from 'vue';
import { useRoute } from 'vue-router';
import apiClient from '@/helpers/axios';
import { useToast } from 'vue-toastification';
import Ticket from './Ticket.vue';
import { useHead } from '@vueuse/head';

export default {
  name: 'DetailOrder',
  components: {Ticket},
  setup() {
    const state = reactive({
      orderId: null,
      order: {},
      xenditInvoice: null,
      showModal: false,
    });

    const route = useRoute();  // Import and use route here
    const toast = useToast();

    const fetchDetailOrder = async () => {
      try {
        const response = await apiClient.get(`/api/orders/${state.orderId}`);
        state.order = response.data;
      } catch (error) {
        console.error('Error fetching order:', error);
      }
    };

    const getOrderId = () => {
      state.orderId = route.params.id;  // Get orderId from route params
      fetchDetailOrder();  // Fetch order details after setting the orderId
    };

    const toPay = () => {
      state.xenditInvoice = state.order.url_invoice;
    };

    const getTicket = async () => {
      try {
        const response = await apiClient.get(`/api/tickets/download/${state.orderId}`, {
          responseType: 'blob',
        });
        const url = window.URL.createObjectURL(new Blob([response]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `Ticket ${state.order?.events?.name}.pdf`);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);

        toast.success('Ticket downloaded successfully');
      } catch (error) {
        console.error('Error downloading the ticket:', error);
        if (error.response) {
          console.error('Server responded with:', error.response.status, error.response.data);
          toast.error(`Error downloading ticket: ${error.response.data.message || 'Server error'}`);
        } else if (error.request) {
          console.error('No response received from server');
          toast.error('Error downloading ticket: No response from server');
        } else {
          console.error('Error setting up request:', error.message);
          toast.error('Error downloading ticket: ' + error.message);
        }
      }
    }

    const paymentStatusClass = (status) => status === 'pending' ? 'text-yellow-500 font-medium' : status === 'paid' ? 'text-green-500 font-bold' : 'text-red-500 font-medium';
    const formatCurrency = (value) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
    const formatDateTime = (datetime) => {
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
      return new Date(datetime).toLocaleDateString('en-US', options);
    };
    const capitalize = (str) => {
      if (!str || typeof str !== 'string') return '';
      return str.charAt(0).toUpperCase() + str.slice(1);
    };

    useHead({
      title: `Order Details - ${state.order?.events?.name || 'Ticketku Web Application'}`,
      meta: [
        { name: 'description', content: `View details for ${state.order?.events?.name || 'your ticket order'} on our platform.` },
        { property: 'og:title', content: `Order for ${state.order?.events?.name || 'Ticketing'}` },
        { property: 'og:description', content: `Order details and options for ${state.order?.events?.name || 'your ticket order'}.` },
        { property: 'og:url', content: `https://sandbox2.panemu.com/ticketing/my_tickets/${state.orderId}` },
        { property: 'og:image', content: state.order?.events?.image || '/default-event-image.jpg' },
      ],
    });

    onMounted(() => {
      getOrderId();  // Ensure orderId is set and fetch the details when component is mounted
    });

    return {
      ...toRefs(state),
      formatCurrency,
      formatDateTime,
      capitalize,
      paymentStatusClass,
      toPay,
      getTicket,
    };
  }
};
</script>
