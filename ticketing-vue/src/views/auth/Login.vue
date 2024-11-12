<template>
  <section>
    <loading :isLoading="isLoading" />
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center justify-center">
        <router-link to="/" class="flex items-center justify-center bg-gray-400 rounded-md p-1">
          <img v-lazy="logo" alt="ticket promotion image"
            class="object-cover h-10" />
        </router-link>
        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form class="space-y-6" @submit.prevent="login">
          <div>
            <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
            <div class="mt-2">
              <input v-model="email" id="email" name="email" type="email" autocomplete="email" required
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5" />
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between">
              <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
            </div>
            <div class="mt-2">
              <input v-model="password" id="password" name="password" type="password" autocomplete="current-password"
                required
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5" />
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox" v-model="rememberMe"
                class="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
              <label for="remember-me" class="ml-2 block text-sm text-gray-900">Remember me</label>
            </div>
            <div class="text-sm">
              <a href="#" class="font-semibold text-primary hover:text-primary">Forgot password?</a>
            </div>
          </div>

          <div>
            <button type="submit"
              class="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
              Sign in
            </button>
          </div>
        </form>

        <div class="mt-6 flex items-center justify-center space-x-4">
          <div class="w-full border-t border-gray-300"></div>
          <div class="px-4 text-sm text-gray-500 whitespace-nowrap">Or continue with</div>
          <div class="w-full border-t border-gray-300"></div>
        </div>

        <div class="flex items-center justify-center space-x-4 mt-6">
          <a href="#" @click="loginWithGoogle"
            class="flex items-center justify-center w-full space-x-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
            <svg viewBox="0 0 24 24" aria-hidden="true" class="h-5 w-5">
              <path
                d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
                fill="#EA4335"></path>
              <path
                d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
                fill="#4285F4"></path>
              <path
                d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
                fill="#FBBC05"></path>
              <path
                d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z"
                fill="#34A853"></path>
            </svg>
            <span class="font-medium">Google</span>
          </a>

          <a href="" @click="loginWithGithub()"
            class="flex items-center justify-center w-full space-x-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
            <svg fill="currentColor" viewBox="0 0 20 20" aria-hidden="true" class="h-5 w-5">
              <path
                d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                clip-rule="evenodd" fill-rule="evenodd"></path>
            </svg>
            <span class="font-medium">GitHub</span>
          </a>
        </div>

        <p class="cursor-pointer mt-10 text-center text-sm text-gray-500">
          Don’t have an account yet?
          <router-link to="/sign_up" class="font-semibold leading-6 text-primary hover:text-blue-800">Sign
            up</router-link>
        </p>
      </div>
    </div>
  </section>
</template>

<script>
import { CLIENT_ID } from "@/config";
import apiClient from "@/helpers/axios";
import router from "@/router";
import { useAuthStore } from "@/stores/auth";
import { defineAsyncComponent, reactive, toRefs } from "vue";
import { useToast } from "vue-toastification";
import { googleSdkLoaded } from "vue3-google-login";
import logo from '@/assets/image/logo.webp';

const Loading = defineAsyncComponent(() => import("@/components/Loading.vue"));

export default {
  name: "LoginForm",
  components: {
    Loading,
  },
  setup() {
    const state = reactive({
      email: "",
      password: "",
      rememberMe: false,
      isLoading: false,
      error: null,
      logo,
    });

    const toast = useToast();
    const authStore = useAuthStore();

    const login = async () => {
      state.isLoading = true;
      await apiClient
        .post(
          "/api/login",
          {
            email: state.email,
            password: state.password,
          },
          {
            headers: {
              skipToken: true,
            },
          }
        )
        .then((response) => {
          if (response.code == 200) {
            localStorage.setItem("token", response.data.access_token);
            localStorage.setItem("_usr", JSON.stringify(response.data.user));
            localStorage.setItem("isLogin", true);
            authStore.setLoginState(true);
            toast.success("Login Success");
            if (response.data.user.role == "admin") {
              router.push("/admin/login");
              return;
            }
            const redirectPath = authStore.getRedirectPath();
            authStore.clearRedirectPath();
            router.push(redirectPath);
          }
        })
        .catch((error) => {
          console.error(error);
          toast.error("Login failed");
        });
      state.isLoading = false;
    };

    const loginWithGoogle = () => {
      googleSdkLoaded((google) => {
        google.accounts.oauth2
          .initCodeClient({
            client_id: CLIENT_ID,
            scope: "email profile openid",
            callback: (response) => {
              if (response.code) {
                sendCodeToBackend(response.code);
              }
            },
          })
          .requestCode();
      });
    };

    const sendCodeToBackend = async (code) => {
      let formData = new FormData();
      formData.append("code", code);
      try {
        const response = await apiClient.post("/api/google-callback", formData);
        if (response.code == 200) {
          localStorage.setItem("token", response.data.access_token);
          localStorage.setItem("_usr", JSON.stringify(response.data.user));
          localStorage.setItem("isLogin", true);
          authStore.setLoginState(true);
          toast.success("Login Success");
          if (response.data.user.role == "admin") {
            router.push("/admin/login");
            return;
          }
          const redirectPath = authStore.getRedirectPath();
          authStore.clearRedirectPath();
          router.push(redirectPath);
        }
      } catch (error) {
        toast.error("Login failed");
        console.error("Failed to send code to backend:", error);
      }
    };

    const loginWithGithub = () => {
      window.alert("Login Use Github Still In Progress, Please Use Google");
    };

    return {
      ...toRefs(state),
      login,
      loginWithGoogle,
      loginWithGithub,
    };
  },
};
</script>
