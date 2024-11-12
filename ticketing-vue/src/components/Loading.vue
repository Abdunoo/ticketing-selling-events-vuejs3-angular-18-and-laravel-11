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
      required: true, 
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
      console.log('Loading canceled');
    }

    return {
      ...toRefs(state),
      onCancel,
    }

  }
};
</script>