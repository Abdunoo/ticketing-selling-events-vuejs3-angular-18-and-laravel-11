<template>
  <div class="min-h-screen bg-gray-100 py-10">
    <div class="max-w-4xl mx-auto px-4">
      <h1 class="text-3xl font-bold text-gray-800 mb-6">Contact Us</h1>
      <form @submit.prevent="handleSubmit" class="bg-white p-6 rounded-lg shadow-md">
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
          <input v-model="name" type="text" id="name"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Your Name" required />
        </div>
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input v-model="email" type="email" id="email"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="you@example.com" required />
        </div>
        <div class="mb-4">
          <label for="message" class="block text-sm font-medium text-gray-700">Message</label>
          <textarea v-model="message" id="message" rows="5"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Write your message here..." required></textarea>
        </div>
        <div class="flex justify-end">
          <button type="submit"
            class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            Send Message
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from 'vue';
import emailjs from 'emailjs-com';

export default {
  name: 'Contact',
  setup() {
    const form = reactive({
      name: '',
      email: '',
      message: ''
    });

    const name = ref('');
    const email = ref('');
    const message = ref('');

    const handleSubmit = () => {
      if (!name.value || !email.value || !message.value) {
        alert('Please fill out all fields.');
        return;
      }

      const templateParams = {
        from_name: name.value,
        user_email: email.value,
        message: message.value,
        to_name: 'Ticketing Application Admin'
      };

      emailjs.send(import.meta.env.VITE_EMAILJS_SERVICE_ID, import.meta.env.VITE_EMAILJS_TEMPLATE_ID, templateParams, import.meta.env.VITE_EMAILJS_USER_ID)
        .then((response) => {
          alert('Message Sent!');
          name.value = '';
          email.value = '';
          message.value = '';
        }, (err) => {
          alert('Failed to send message, please try again later.');
        });
    };

    return {
      form,
      name,
      email,
      message,
      handleSubmit
    };
  }
};
</script>
