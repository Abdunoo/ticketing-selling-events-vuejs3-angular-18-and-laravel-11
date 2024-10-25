<template>
  <router-link :to="{ name: 'EventDetail', params: { event_name: event.slug } }"
    class="event-card bg-cover bg-center flex flex-col items-stretch justify-end rounded-xl pt-[132px]"
    :style="{ backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0) 100%), url(${event.image_banner})` }">
    <div class="flex w-full items-end justify-between gap-4 p-4">
      <div class="flex max-w-[440px] flex-1 flex-col gap-1">
        <p class="text-white text-lg font-bold line-clamp-1">{{ event.name }}</p>
        <p class="text-white text-sm line-clamp-1">{{ formatDate(event.start_datetime) }} · {{ event.location }}</p>
      </div>
      <button
        class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-primary text-white text-sm font-bold leading-normal">
        <span class="truncate">Shop Now</span>
      </button>
    </div>
  </router-link>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'EventCard',
  props: {
    event: {
      type: Object,
      required: true,
    },
  },
  methods: {
    formatDate(dateTimeString) {
      const date = new Date(dateTimeString);
      const options = {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      };
      return date.toLocaleString('en-US', options);
    },
  },
});
</script>

<style scoped>
.event-card {
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
