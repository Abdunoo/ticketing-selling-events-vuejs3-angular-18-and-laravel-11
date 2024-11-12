<template>
  <div class="flex flex-col items-center justify-center min-h-screen rotate-90 md:rotate-0">
    <div ref="ticket" class="flex w-[800px] h-[275px] bg-transparent">

      <div class="flex flex-col justify-center w-2/3 px-6 pb-6 bg-gray-950 rounded-lg">
        <h1 class="text-white text-2xl font-bold tracking-widest mb-1">{{ event.name }}</h1>
        <p class="text-primary text-xl font-semibold tracking-wide mb-4">{{ ticketType }} TICKET</p>
        <p class="text-white text-lg mb-6">AT {{ eventTime }}</p>

        <div class="flex space-x-2">
          <div class="flex items-center justify-center bg-white text-black font-bold py-1 px-4 rounded">{{ eventDate.day }}</div>
          <div class="flex items-center justify-center bg-white text-black font-bold py-1 px-4 rounded">{{ eventDate.month }}</div>
          <div class="flex items-center justify-center bg-white text-black font-bold py-1 px-4 rounded">{{ eventDate.year }}</div>
        </div>

        <p class="text-white mt-6 text-sm tracking-widest">{{ event.location }}</p>
      </div>
      <p class="border-r-2 my-3 bg-gray-950 border-dashed"></p>

      <div class="flex flex-col items-center justify-center w-1/3 bg-gray-950 rounded-lg text-white p-4">
        <p class="text-xs tracking-widest my-2">TICKET CODE: {{ ticketCode }}</p>
        <svg ref="barcode" class="w-[80%] h-10 bg-white mt-2"></svg>
        <div class="flex justify-center space-x-2 items-center tracking-widest mt-4">
          <div class="flex items-center justify-center bg-white text-black font-bold py-1 px-4 rounded">{{ eventDate.day }}</div>
          <div class="flex items-center justify-center bg-white text-black font-bold py-1 px-4 rounded">{{ eventDate.month }}</div>
          <div class="flex items-center justify-center bg-white text-black font-bold py-1 px-4 rounded">{{ eventDate.year }}</div>
        </div>
        <p class="text-primary text-2xl font-bold tracking-wide mt-4">{{ ticketType }}</p>
      </div>
    </div>

    <button @click="downloadTicket" class="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Download Ticket as PDF ({{ ticketQuantity }} Ticket)
    </button>
  </div>
</template>

<script>
import { ref, computed, onMounted, defineComponent } from 'vue';
import { useHead } from '@vueuse/head';

// Lazy load barcode and pdf generation libraries when needed
const loadJsBarcode = () => import('jsbarcode');
const loadHtml2pdf = () => import('html2pdf.js');

export default defineComponent({
  name: 'TicketComponent',
  props: {
    event: { type: Object, required: true },
    ticketCode: { type: String, required: true },
    ticketType: { type: String, required: true },
    ticketQuantity: { type: Number, required: true },
  },
  setup(props) {
    const ticket = ref(null);
    const barcode = ref(null);

    useHead({
      title: `${props.event.name} Ticket - ${props.ticketType}`,
      meta: [
        { name: 'description', content: `Download your ${props.ticketType} ticket for ${props.event.name} here.` },
        { name: 'keywords', content: 'event ticket, ticket download, event management' },
      ],
    });

    const eventDate = computed(() => {
      const startDate = new Date(props.event.start_datetime);
      return {
        day: startDate.getDate().toString().padStart(2, '0') + 'TH',
        month: startDate.toLocaleString('default', { month: 'short' }).toUpperCase(),
        year: startDate.getFullYear().toString(),
      };
    });

    const eventTime = computed(() => {
      const startDate = new Date(props.event.start_datetime);
      return startDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    });

    // Dynamically generate barcode after the component is mounted
    const generateBarcode = async () => {
      const JsBarcode = (await loadJsBarcode()).default;
      JsBarcode(barcode.value, props.ticketCode, {
        format: 'CODE128',
        displayValue: false,
        fontSize: 16,
        width: 2,
        height: 50,
      });
    };

    const downloadTicket = async () => {
      const html2pdf = (await loadHtml2pdf()).default;

      const options = {
        margin: 0,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, width: 800, height: 275 },
        jsPDF: { unit: 'px', format: [800, 275], orientation: 'landscape' },
      };

      for (let i = 1; i <= props.ticketQuantity; i++) {
        const ticketNumber = props.ticketQuantity > 1 ? `_${i}` : '';
        const filename = `${props.event.name}_Ticket${ticketNumber}.pdf`;

        const ticketOptions = { ...options, filename };
        await html2pdf().set(ticketOptions).from(ticket.value).save();
      }
    };

    onMounted(generateBarcode);

    return {
      ticket,
      barcode,
      eventDate,
      eventTime,
      downloadTicket,
    };
  },
});
</script>