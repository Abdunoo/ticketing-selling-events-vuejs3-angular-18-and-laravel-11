<template>
    <div class="min-h-screen bg-gray-100 py-10">
      <div class="max-w-4xl mx-auto px-4">
        <h1 class="text-3xl font-bold text-gray-800 mb-6">Contact Us</h1>
        <form @submit.prevent="handleSubmit" class="bg-white p-6 rounded-lg shadow-md">
          <div class="mb-4">
            <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
            <input
              v-model="form.name"
              type="text"
              id="name"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Your Name"
              required
            />
          </div>
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input
              v-model="form.email"
              type="email"
              id="email"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="you@example.com"
              required
            />
          </div>
          <div class="mb-4">
            <label for="message" class="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              v-model="form.message"
              id="message"
              rows="5"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Write your message here..."
              required
            ></textarea>
          </div>
          <div class="flex justify-end">
            <button
              type="submit"
              class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import { reactive } from 'vue';
  
  export default {
    name: 'Contact',
    setup() {
      const form = reactive({
        name: '',
        email: '',
        message: ''
      });
  
      const handleSubmit = () => {
        if (!form.name || !form.email || !form.message) {
          alert('Please fill out all fields.');
          return;
        }
  
        // Replace this with actual form submission logic
        alert(`Message Sent!\n\nName: ${form.name}\nEmail: ${form.email}\nMessage: ${form.message}`);
  
        // Reset form after submission
        form.name = '';
        form.email = '';
        form.message = '';
      };
  
      return {
        form,
        handleSubmit
      };
    }
  };
  </script>
  
  <style scoped>
  /* Add any custom styles specific to Contact.vue here */
  </style>
  