<template>
    <loading :isLoading="isLoading" />
    <div class="min-h-screen flex items-center justify-center bg-gray-100 p-6">
        <div class="w-full max-w-md bg-white rounded-lg shadow-md p-8">
            <h2 class="text-2xl font-bold mb-6 text-gray-800">Forgot Password</h2>
            <form @submit.prevent="submitForgotPassword">
                <label for="email" class="block text-sm font-medium text-gray-600 mb-2">
                    Email Address
                </label>
                <input type="email" id="email" v-model="email" required
                    class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                    placeholder="Enter your email" />
                <button type="submit"
                    class="w-full mt-6 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
                    Send Reset Link
                </button>
            </form>
            <p v-if="message" class="text-sm text-green-600 mt-4">{{ message }}</p>
            <p v-if="error" class="text-sm text-red-600 mt-4">{{ error }}</p>
        </div>
    </div>
</template>

<script>
import { defineAsyncComponent, ref } from "vue";
import { useRouter } from "vue-router";
import apiClient from "@/helpers/axios";
const Loading = defineAsyncComponent(() => import('@/components/Loading.vue'));

export default {
    name: "ForgotPassword",
    components: {
        Loading
    },
    setup() {
        const email = ref("");
        const message = ref("");
        const error = ref("");
        const router = useRouter();
        const isLoading= ref(false);

        const submitForgotPassword = async () => {
            isLoading.value = true;
            message.value = "";
            error.value = "";
            const payload = { email: email.value };

            try {
                const response = await apiClient.post("api/forgot-password", payload);
                if (response.code === 200) {
                    router.push({
                        path: "/reset-password",
                        query: { email: email.value },
                    });
                }
            } catch (err) {
                error.value = err.response?.data?.message || "An error occurred. Please try again.";
            } finally {
                isLoading.value = false;
            }
        };

        return {
            email,
            message,
            error,
            submitForgotPassword,
            isLoading,
        };
    },
};
</script>