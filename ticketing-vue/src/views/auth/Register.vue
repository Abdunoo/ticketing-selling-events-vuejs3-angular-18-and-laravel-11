<template>
  <loading :isLoading="isLoading" />
  <div class="flex min-h-full flex-col justify-center items-center px-6 py-12 lg:px-8">
    <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900">
      <img :src="logo" alt="Logo" id="logo" class="object-cover h-10">
      Ticketku
    </a>
    <div class="w-full md:mt-0 sm:max-w-md xl:p-0">
      <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
          Create an account
        </h1>
        <form class="space-y-4 md:space-y-6" @submit.prevent="register">
          <div>
            <label for="name" class="block mb-2 text-sm font-medium text-gray-900">Your name</label>
            <input v-model="name" type="text" name="name" id="name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
              placeholder="John Doe" required>
          </div>
          <div>
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Your email</label>
            <input v-model="email" type="email" name="email" id="email"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
              placeholder="name@company.com" required>
          </div>
          <div>
            <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Password</label>
            <input v-model="password1" type="password" name="password" id="password" placeholder="••••••••"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
              required>
          </div>
          <div>
            <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900">Confirm password</label>
            <input v-model="password2" type="password" name="confirm-password" id="confirm-password"
              placeholder="••••••••"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
              required>
          </div>
          <div class="flex items-start">
            <div class="flex items-center h-5">
              <input id="terms" aria-describedby="terms" type="checkbox"
                class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary" required>
            </div>
            <div class="ml-3 text-sm">
              <label for="terms" class="font-light text-gray-500">I accept the <a
                  class="font-medium text-primary hover:underline" href="terms">Terms and Conditions</a></label>
            </div>
          </div>
          <button type="submit"
            class="w-full text-white bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Create
            an account</button>
          <p class="text-sm font-light text-gray-500">
            Already have an account? <router-link :to="{ name: 'Login' }"
              class="font-medium text-primary hover:underline">Login here</router-link>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import apiClient from '@/helpers/axios';
import router from '@/router';
import { defineAsyncComponent, reactive, toRefs } from 'vue';
import logo from '@/assets/image/logo.webp';
const Loading = defineAsyncComponent(() => import('@/components/Loading.vue'));

export default {
  name: 'Register',
  components: {
    Loading
  },
  setup(props) {
    const state = reactive({
      name: '',
      email: '',
      password1: '',
      password2: '',
      logo,
      isLoading: false,

    })

    const register = async () => {
      if (state.password1 != state.password2) {
        alert('Passwords do not match');
        return;
      }
      state.isLoading = true;
      const data = {
        name: state.name,
        email: state.email,
        password: state.password1,
      }
      try {
        const response = await apiClient.post('api/register', data);
        if (response.code == 200) {
          router.push({
            path: '/otp',
            query: { email: data.email }
          });
          console.log('Registration success');
        }
      } catch (error) {
        console.log('Registration failed =>', error);
      } finally {
        state.isLoading = false;
      }
    }

    return {
      ...toRefs(state),
      register
    }
  }

}
</script>