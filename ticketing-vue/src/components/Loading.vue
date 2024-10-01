<!-- src/components/LoadingComponent.vue -->
<template>
  <loading v-if="isLoading" :active="isLoading" :can-cancel="true" :is-full-page="true" class="bg-gray-500 bg-opacity-60" />
</template>

<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import { reactive, toRefs } from 'vue';

export default {
  name: 'LoadingComponent',
  props: {
    isLoading: {
      type: Boolean,
      required: true, // Controls the loading state
    },
  },
  components: {
    Loading,
  },
  setup(props) {
    const state = reactive({
      isLoading: props.isLoading,
    })

    const onCancel = () => {
      // Implement your custom logic for canceling the loading state
      console.log('Loading canceled');
    }

    return {
      ...toRefs(state),
      onCancel,
    }

  }
};
</script>

<style scoped>
/* No additional styles are needed since vue-loading-overlay comes with its own styling */
</style>
