<template>
 <section class="bg-gray-50">
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
    <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900">
      <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo">
      Flowbite
    </a>
    <div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
      <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
          Create an account
        </h1>
        <form class="space-y-4 md:space-y-6" @submit.prevent="register">
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
                class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary"
                required>
            </div>
            <div class="ml-3 text-sm">
              <label for="terms" class="font-light text-gray-500">I accept the <a
                  class="font-medium text-primary hover:underline" href="#">Terms and Conditions</a></label>
            </div>
          </div>
          <button type="submit"
            class="w-full text-white bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Create
            an account</button>
          <p class="text-sm font-light text-gray-500">
            Already have an account? <a href="login" class="font-medium text-primary hover:underline">Login here</a>
          </p>
        </form>
      </div>
    </div>
  </div>
</section>

</template>

<script>
import { reactive, ref, toRefs } from 'vue';
export default {



  setup(props) {
    const state = reactive({
      email: '',
      password1: '',
      password2: '',

    })

    const register = () => {
      console.log(state)
    }

    return {
      ...toRefs(state),
      register
    }
  }

}
</script>