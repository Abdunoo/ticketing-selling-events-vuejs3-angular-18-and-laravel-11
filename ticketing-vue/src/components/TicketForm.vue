<template>
    <form @submit.prevent="submitForm">
      <div class="mb-4">
        <label class="block text-gray-700">Name</label>
        <input type="text" v-model="name" class="mt-1 block w-full rounded border-gray-300" />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700">Email</label>
        <input type="email" v-model="email" class="mt-1 block w-full rounded border-gray-300" />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700">Quantity</label>
        <input type="number" v-model="quantity" class="mt-1 block w-full rounded border-gray-300" />
      </div>
      <button type="submit" class="bg-blue-500 text-white py-2 px-4 rounded">Buy Ticket</button>
    </form>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  const name = ref('');
  const email = ref('');
  const quantity = ref(1);
  
  function submitForm() {
    // Handle ticket purchase logic
    alert(`Ticket purchased for ${name.value} (${quantity.value} tickets)`);
  }
  </script>
  