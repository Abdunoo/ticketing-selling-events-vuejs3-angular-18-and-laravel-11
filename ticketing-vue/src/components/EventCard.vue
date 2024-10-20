<template>
  <router-link :to="{ name: 'EventDetail', params: { event_name: event.slug }}" class="event-card">
    <img
      :src="event.image_banner"
      :alt="event.name"
      class="event-image w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl"
      loading="lazy"
    />
    <div class="p-2">
      <p class="text-textPrimary text-base font-medium leading-normal line-clamp-1">{{ event.name }}</p>
      <p class="text-textSecondary text-sm font-normal leading-normal line-clamp-1">{{ formatDate(event.start_datetime) }}</p>
      <p class="text-textSecondary text-sm font-normal leading-normal line-clamp-1">${{ event.price }}</p>
    </div>
  </router-link>
</template>

<style scoped>
.event-card {
  display: block;
  text-decoration: none;
}

.event-image {
  transition: transform 0.2s ease-in-out;
}

.event-image:hover {
  transform: scale(1.03); /* Slight zoom on hover */
}
</style>

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