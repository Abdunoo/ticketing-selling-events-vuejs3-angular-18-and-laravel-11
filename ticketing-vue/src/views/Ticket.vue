<template>
  <div class="flex flex-col items-center justify-center min-h-screen rotate-90 md:rotate-0">
    <!-- Ticket container -->
    <div ref="ticket"
      class="flex w-[800px] h-[275px] bg-transparent">
      
      <!-- Left section: Event details -->
      <div class="flex flex-col justify-center w-2/3 px-6  pb-6 bg-gray-950 rounded-lg">
        <h1 class="text-white text-5xl font-bold tracking-widest mb-1">{{ event.name }}</h1>
        <p class="text-primary text-2xl font-semibold tracking-wide mb-4">{{ ticketType }} TICKET</p>
        <p class="text-white text-lg mb-6">AT {{ eventTime }}</p>

        <!-- Date boxes -->
        <div class="flex space-x-2">
          <div class="flex items-center justify-center bg-white text-black font-bold py-1 px-4 rounded">{{ eventDate.day }}</div>
          <div class="flex items-center justify-center bg-white text-black font-bold py-1 px-4 rounded">{{ eventDate.month }}</div>
          <div class="flex items-center justify-center bg-white text-black font-bold py-1 px-4 rounded">{{ eventDate.year }}</div>
        </div>

        <!-- Location text -->
        <p class="text-white mt-6 text-sm tracking-widest">{{ event.location }}</p>
      </div>
      <p class="border-r-2 my-3 bg-gray-950 border-dashed"></p>

      <!-- Right section: Barcode and ticket code rotated 90 degrees to the left -->
      <div class="flex flex-col items-center justify-center w-1/3 bg-gray-950 rounded-lg text-white p-4">
        <!-- Ticket code text -->
        <p class="text-xs tracking-widest my-2">TICKET CODE: {{ ticketCode }}</p>

        <!-- Barcode -->
        <svg ref="barcode" class="w-[80%] h-10 bg-white mt-2"></svg> <!-- Barcode SVG container -->

        <!-- Right date boxes for ticket stub -->
        <div class="flex justify-center space-x-2 items-center tracking-widest mt-4">
          <div class="flex items-center justify-center bg-white text-black font-bold py-1 px-4 rounded">{{ eventDate.day }}</div>
          <div class="flex items-center justify-center bg-white text-black font-bold py-1 px-4 rounded">{{ eventDate.month }}</div>
          <div class="flex items-center justify-center bg-white text-black font-bold py-1 px-4 rounded">{{ eventDate.year }}</div>
        </div>
        <p class="text-primary text-2xl font-extralight tracking-wide mt-4">{{ ticketType }} TICKET</p>
      </div>
    </div>

    <!-- Download button -->
    <button @click="downloadTicket" class="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Download Ticket as PDF
    </button>
  </div>
</template>

<script>
import html2pdf from 'html2pdf.js';
import JsBarcode from 'jsbarcode';
import { defineComponent, ref, onMounted } from 'vue';

export default defineComponent({
  name: 'TicketComponent',
  props: {
    event: { type: Object, required: true },
    ticketCode: { type: String, required: true },
    ticketType: { type: String, required: true }
  },
  computed: {
    eventDate() {
      const startDate = new Date(this.event.start_datetime);
      return {
        day: startDate.getDate().toString().padStart(2, '0') + 'TH',
        month: startDate.toLocaleString('default', { month: 'short' }).toUpperCase(),
        year: startDate.getFullYear().toString()
      };
    },
    eventTime() {
      const startDate = new Date(this.event.start_datetime);
      return startDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    }
  },
  methods: {
    downloadTicket() {
      const ticketElement = this.$refs.ticket;

      // PDF options with adjusted width and height
      const options = {
        margin: 0,
        filename: 'concert_ticket.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 1.5, width: 800, height: 275 }, // Reduced height
        jsPDF: { unit: 'px', format: [800, 275], orientation: 'landscape' },
      };

      html2pdf().set(options).from(ticketElement).save();
    },
    generateBarcode() {
      const barcodeElement = this.$refs.barcode;
      JsBarcode(barcodeElement, this.ticketCode, {
        format: 'CODE128', // Barcode format
        displayValue: false, // Show the code below the barcode
        fontSize: 16, // Font size for the code text
        width: 2, // Width of each barcode bar
        height: 50, // Height of the barcode
      });
    }
  },
  mounted() {
    this.generateBarcode(); // Call barcode generation on mount
  }
});
</script>