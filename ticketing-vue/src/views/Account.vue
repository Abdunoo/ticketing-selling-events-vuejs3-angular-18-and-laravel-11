<template>
  <section>
    <loading :isLoading="isLoading" />
    <div class="px-4 sm:px-10 md:px-20 flex flex-1 justify-center py-5">
      <div class="layout-content-container flex flex-col max-w-full sm:max-w-[960px] flex-1">
        <h2 class="text-2xl font-bold text-gray-900 sm:text-3xl">Account Settings</h2>

        <div class="mt-6 grid grid-cols-1 gap-y-8 sm:grid-cols-3 sm:gap-x-6">
          <!-- Profile Picture Section -->
          <div class="sm:col-span-1 flex flex-col items-center">
            <img :src="user.picture || defaultPicture"
              class="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-blue-300 dark:ring-blue-500" alt="User Profile"
            />
            <div class="mt-4 space-y-2 w-full sm:w-auto">
              <button type="button" @click="toCreateEvent"
                class="w-full py-3 px-6 text-white bg-primary rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-indigo-300">
                Create Event
              </button>
              <button type="button" @click="toMyEvents"
                class="w-full py-3 px-6 text-primary bg-white border border-blue-300 rounded-lg hover:bg-blue-200 hover:text-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-200">
                My Events
              </button>
            </div>
          </div>

          <!-- Account Info Section -->
          <div class="sm:col-span-2 space-y-6">
            <!-- Form fields for profile update -->
            <div class="flex flex-col sm:flex-row sm:space-x-6 space-y-4 sm:space-y-0">
              <div class="w-full">
                <label for="first_name" class="block text-sm font-medium text-gray-900">First Name</label>
                <input v-model="user.first_name" type="text" id="first_name"
                  class="mt-1 block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  required />
              </div>
              <div class="w-full">
                <label for="last_name" class="block text-sm font-medium text-gray-900">Last Name</label>
                <input v-model="user.last_name" type="text" id="last_name"
                  class="mt-1 block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  required />
              </div>
            </div>

            <!-- Email -->
            <div class="w-full">
              <label for="email" class="block text-sm font-medium text-gray-900">Email</label>
              <input v-model="user.email" type="email" id="email"
                class="mt-1 block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required />
            </div>

            <!-- Profession and Bio -->
            <div class="w-full">
              <label for="profession" class="block text-sm font-medium text-gray-900">Profession</label>
              <input v-model="user.profession" type="text" id="profession"
                class="mt-1 block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required />
            </div>
            <div class="w-full">
              <label for="bio" class="block text-sm font-medium text-gray-900">Bio</label>
              <textarea v-model="user.bio" id="bio" rows="4"
                class="mt-1 block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Write your bio here..."></textarea>
            </div>

            <!-- Save and Logout Buttons -->
            <div class="w-full flex justify-between">
              <button @click="toLogout"
                class="py-2.5 px-6 text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300">Logout
              </button>
              <button @click="saveProfile"
                class="py-2.5 px-6 text-white bg-primary rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import apiClient from '@/helpers/axios';
import router from '@/router';
import { useAuthStore } from '@/stores/auth';
import { defineAsyncComponent, onMounted, reactive, toRefs } from 'vue';
import { useHead } from '@vueuse/head';

const Loading = defineAsyncComponent(() => import('@/components/Loading.vue'));

export default {
  components: {
    Loading,
  },
  name: 'Account',
  setup() {
    const state = reactive({
      isLoading: false,
      user: {
        first_name: '',
        last_name: '',
        email: '',
        profession: '',
        bio: '',
        picture: '',
      },
      defaultPicture: 'https://via.placeholder.com/150',
    });

    const authStore = useAuthStore();

    // Split full name
    const splitName = (fullName) => {
      const nameParts = fullName.split(' ');
      const firstName = nameParts[0];
      const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';
      return { firstName, lastName };
    };

    // Fetch user data
    const me = async () => {
      try {
        state.isLoading = true;
        const response = await apiClient.get('/api/me');
        if (response.code === 200) {
          const userData = response.data;
          const { firstName, lastName } = splitName(userData.name);
          state.user = {
            first_name: firstName,
            last_name: lastName,
            email: userData.email,
            profession: userData.profession ?? '',
            bio: userData.bio ?? '',
            picture: userData.avatar ?? state.defaultPicture,
          };
        }
      } catch (error) {
        console.error('Failed to get user information', error);
      }
      state.isLoading = false;
    };

    // Save profile updates
    const saveProfile = async () => {
      try {
        state.isLoading = true;
        const response = await apiClient.put('/api/me/update', state.user);
        if (response.code === 200) {
          console.log('Profile updated successfully');
        }
      } catch (error) {
        console.error('Failed to update profile', error);
      }
      state.isLoading = false;
    };

    // Navigation functions
    const toMyEvents = () => router.push('/my_events');
    const toCreateEvent = () => router.push('/pricing');
    const toLogout = () => {
      state.isLoading = true;
      router.push('/login');
      localStorage.removeItem('token');
      localStorage.removeItem('_usr');
      localStorage.setItem('isLogin', 'false');
      authStore.setLoginState(false);
      state.isLoading = false;
    };

    onMounted(me);

    // Meta tags setup
    useHead({
      title: 'Account Settings',
      meta: [
        { name: 'description', content: 'Manage your account settings, update your profile, and view event options.' },
        { name: 'keywords', content: 'account settings, profile management, user profile' },
      ],
    });

    return {
      ...toRefs(state),
      saveProfile,
      toLogout,
      toMyEvents,
      toCreateEvent,
    };
  },
};
</script>

<style>
/* Custom styles, if necessary */
</style>
