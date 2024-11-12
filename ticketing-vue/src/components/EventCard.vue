<template>
  <router-link :to="{ name: 'EventDetail', params: { event_name: event.slug } }"
    class="event-card relative flex flex-col items-stretch justify-end rounded-xl overflow-hidden ">
    <img
      :src="event.image_banner"
      :alt="event.name"
      class="absolute inset-0 h-full w-full object-cover"
      :loading="shouldEagerLoad(index) ? 'eager' : 'lazy'"
    />
    <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
    <div class="relative flex w-full items-end justify-between gap-4 p-4 pt-[132px]">
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
    index: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      isMobile: false,
    };
  },
  mounted() {
    this.checkScreenSize();
    window.addEventListener('resize', this.checkScreenSize); 
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.checkScreenSize); 
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
    checkScreenSize() {
      this.isMobile = window.innerWidth <= 600; 
    },
    shouldEagerLoad(index) {
      if (this.isMobile) {
        return index < 2;
      }
      return index < 6;
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
.event-card {
  position: relative;
  border-radius: 1rem;
  overflow: hidden;
}
.line-clamp-1 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>