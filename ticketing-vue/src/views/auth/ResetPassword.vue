<template>
    <loading :isLoading="isLoading" />
    <div class="min-h-screen flex items-center justify-center bg-gray-100 p-6">
        <div class="w-full max-w-md bg-white rounded-lg shadow-md p-8">
            <h2 class="text-2xl font-bold mb-6 text-gray-800">Reset Password</h2>
            <form @submit.prevent="submitResetPassword">
                <label for="otp" class="block text-sm font-medium text-gray-600 mb-2">
                    OTP
                </label>
                <input type="text" id="otp" v-model="otp" required
                    class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                    placeholder="Enter your OTP" />

                <label for="password" class="block text-sm font-medium text-gray-600 mt-4 mb-2">
                    New Password
                </label>
                <input type="password" id="password" v-model="password" required
                    class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                    placeholder="Enter new password" />

                <label for="confirmPassword" class="block text-sm font-medium text-gray-600 mt-4 mb-2">
                    Confirm Password
                </label>
                <input type="password" id="confirmPassword" v-model="confirmPassword" required
                    class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                    placeholder="Confirm new password" />

                <button type="submit"
                    class="w-full mt-6 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
                    Reset Password
                </button>
            </form>
            <p v-if="message" class="text-sm text-green-600 mt-4">{{ message }}</p>
            <p v-if="error" class="text-sm text-red-600 mt-4">{{ error }}</p>
        </div>
    </div>
</template>

<script>
import { defineAsyncComponent, ref } from "vue";
import { useRoute } from "vue-router";
import apiClient from "@/helpers/axios";
import router from "@/router";
const Loading = defineAsyncComponent(() => import('@/components/Loading.vue'));

export default {
    name: "ResetPassword",
    components: {
        Loading
    },
    setup() {
        const route = useRoute();
        const email = ref(route.query.email || "");
        const otp = ref("");
        const password = ref("");
        const confirmPassword = ref("");
        const message = ref("");
        const error = ref("");
        const isLoading= ref(false);

        const submitResetPassword = async () => {
            message.value = "";
            error.value = "";

            if (password.value !== confirmPassword.value) {
                error.value = "Passwords do not match!";
                return;
            }
            isLoading.value = true;
            try {
                const payload = {
                    email: email.value,
                    otp: Number(otp.value),
                    password: password.value,
                    password_confirmation: confirmPassword.value,
                };
                const response = await apiClient.post("api/reset-password", payload);
                if (response.code === 200) {
                    router.push('/login');
                }
            } catch (err) {
                error.value = err.response?.data?.message || "An error occurred. Please try again.";
            } finally {
                isLoading.value = false;
            }
        };

        return {
            email,
            otp,
            password,
            confirmPassword,
            message,
            error,
            submitResetPassword,
            isLoading,
        };
    },
};
</script>