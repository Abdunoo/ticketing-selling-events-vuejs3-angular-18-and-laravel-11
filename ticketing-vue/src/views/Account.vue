<template>
    <loading :isLoading="isLoading" />
    <div class="px-4 sm:px-10 md:px-20 flex flex-1 justify-center py-5">
        <div class="layout-content-container flex flex-col max-w-full sm:max-w-[960px] flex-1">
            <h2 class="text-2xl font-bold text-gray-900 sm:text-3xl">Account Settings</h2>
    
            <div class="mt-6 grid grid-cols-1 gap-y-8 sm:grid-cols-3 sm:gap-x-6">
                <!-- Profile Picture Section -->
                <div class="sm:col-span-1 flex flex-col items-center">
                    <img :src="user.picture || defaultPicture"
                        class="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
                        alt="User Profile" />
    
                    <div class="mt-4 space-y-2 w-full sm:w-auto">
                        <button type="button"
                            class="w-full py-3 px-6 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300">
                            Change picture
                        </button>
                        <button type="button"
                            class="w-full py-3 px-6 text-indigo-900 bg-white border border-indigo-300 rounded-lg hover:bg-indigo-100 hover:text-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-200">
                            Delete picture
                        </button>
                    </div>
                </div>
    
                <!-- Account Info Section -->
                <div class="sm:col-span-2 space-y-6">
                    <div class="flex flex-col sm:flex-row sm:space-x-6 space-y-4 sm:space-y-0">
                        <!-- First Name -->
                        <div class="w-full">
                            <label for="first_name" class="block text-sm font-medium text-gray-900">First Name</label>
                            <input v-model="user.first_name" type="text" id="first_name"
                                class="mt-1 block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                                required />
                        </div>
    
                        <!-- Last Name -->
                        <div class="w-full">
                            <label for="last_name" class="block text-sm font-medium text-gray-900">Last Name</label>
                            <input v-model="user.last_name" type="text" id="last_name"
                                class="mt-1 block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                                required />
                        </div>
                    </div>
    
                    <!-- Email -->
                    <div class="w-full">
                        <label for="email" class="block text-sm font-medium text-gray-900">Email</label>
                        <input v-model="user.email" type="email" id="email"
                            class="mt-1 block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                            required />
                    </div>
    
                    <!-- Profession -->
                    <div class="w-full">
                        <label for="profession" class="block text-sm font-medium text-gray-900">Profession</label>
                        <input v-model="user.profession" type="text" id="profession"
                            class="mt-1 block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                            required />
                    </div>
    
                    <!-- Bio -->
                    <div class="w-full">
                        <label for="bio" class="block text-sm font-medium text-gray-900">Bio</label>
                        <textarea v-model="user.bio" id="bio" rows="4"
                            class="mt-1 block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Write your bio here..."></textarea>
                    </div>
    
                    <!-- Save Button -->
                    <div class="w-full flex justify-between">
                        <button @click="toLogout"
                            class="py-2.5 px-6 text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300">Logout
                        </button>
                        <button @click="saveProfile"
                            class="py-2.5 px-6 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300">
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Loading from '@/components/Loading.vue';
import apiClient from '@/helpers/axios';
import { onMounted, reactive, toRefs } from 'vue';

export default {
  components: {
    Loading
  },
  name: 'Account',
  setup(props) {
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

    const splitName = (fullName) => {
      const nameParts = fullName.split(' ');
      const firstName = nameParts[0];
      const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';
      return { firstName, lastName };
    };

    const me = async () => {
      try {
        state.isLoading = true;
        const response = await apiClient.get('/api/me');
        if (response.code == 200) {
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

    const toLogout = () => {
      state.isLoading = true;
      window.location.href = '/login';
      localStorage.removeItem('token');
      localStorage.removeItem('_usr');
      localStorage.setItem('isLogin', 'false');
      state.isLoading = false;
    };

    onMounted(() => {
      me();
    });

    return {
      ...toRefs(state),
      saveProfile,
      toLogout,
    };
  },
};
</script>


<style>
/* Custom styles, if necessary */
</style>
