<template>
  <router-link :to="{ name: 'EventDetail', params: { event_name: event.slug }}" class="">
    <link rel="preload" :href="event.image_banner" as="image">
    <div class="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl"
      :style="{ backgroundImage: `url(${event.image_banner})` }">
    </div>
    <div class="p-2">
      <p class="text-textPrimary text-base font-medium leading-normal line-clamp-1">{{ event.name }}</p>
      <p class="text-textSecondary text-sm font-normal leading-normal line-clamp-1">{{ formatDate(event.start_datetime) }}</p>
      <p class="text-textSecondary text-sm font-normal leading-normal line-clamp-1">${{ event.price }}</p>
    </div>
  </router-link>

</template>

<script>
import { reactive, toRefs } from 'vue';

export default {
  name: 'EventCard',
  props: {
    event: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const state = reactive({

    })

    const formatDate = (dateTimeString)=> {
      const date = new Date(dateTimeString);

      // Format options
      const options = {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      };

      // Convert the date to the desired format
      return date.toLocaleString('en-US', options);
    }

    return {
      ...toRefs(state),
      formatDate,
    }
  },
}

</script>