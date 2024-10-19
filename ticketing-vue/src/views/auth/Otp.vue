<template>
    <section class="bg-gray-50">
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900">
          <img src="/src/assets/image/logo.png" alt="ticket promotion image" class="object-cover h-10">
          Ticketku
        </a>
        <div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Verify Your Account
            </h1>
            <p class="text-sm text-gray-500">Please enter the OTP sent to your email address.</p>
            <form class="space-y-4 md:space-y-6" @submit.prevent="verifyOtp">
              <div>
                <label for="otp" class="block mb-2 text-sm font-medium text-gray-900">Enter OTP</label>
                <input v-model="otp" type="text" name="otp" id="otp"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
                  placeholder="123456" required>
              </div>
              <button type="submit"
                class="w-full text-white bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                Verify Account
              </button>
              <p class="text-sm font-light text-gray-500">
                Didn't receive the OTP? <a @click="resendOtp" class="font-medium text-primary hover:underline cursor-pointer">Resend OTP</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  import apiClient from '@/helpers/axios';
import router from '@/router';
  import { ref } from 'vue';
import { useRoute } from 'vue-router';
  
  export default {
    setup(props) {
      const otp = ref('');
      const route = useRoute();
      const email = route.query.email;
      console.log(email);

      const verifyOtp = async () => {
        const data = {
          otp: otp.value,
          email: email
        };
        try {
          const response = await apiClient.post('api/verify-otp', data);
          console.log(response);
          if (response.code == 200) {
            console.log('OTP verified successfully');
            router.push({ name: 'Dashboard' }); 
          } else {
            alert('Invalid OTP, please try again');
          }
        } catch (error) {
          console.error('Error verifying OTP:', error);
          alert('An error occurred. Please try again.');
        }
      };
  
      const resendOtp = async () => {
        try {
          const response = await apiClient.post('api/resend-otp');
          if (response.status === 200) {
            console.log('OTP resent successfully');
            alert('OTP has been resent to your email.');
          } else {
            console.log('Failed to resend OTP');
          }
        } catch (error) {
          console.error('Error resending OTP:', error);
          alert('An error occurred. Please try again.');
        }
      };
  
      return {
        otp,
        verifyOtp,
        resendOtp
      };
    }
  };
  </script>
  