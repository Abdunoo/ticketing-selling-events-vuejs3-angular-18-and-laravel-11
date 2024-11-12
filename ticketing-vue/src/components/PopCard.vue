<template>
    <div class="flex h-auto flex-1 flex-col gap-4 rounded-xl bg-white shadow-[0_0_4px_rgba(0,0,0,0.1)] min-w-80">
        <img
            :src="event.image_banner"
            :alt="event.name"
            class="w-full aspect-video bg-center bg-no-repeat object-cover bg-cover rounded-xl"
            :loading="shouldEagerLoad(index) ? 'eager' : 'lazy'"
        />
        <div class="flex flex-col p-4 pt-0 gap-4 space-y-6">
            <div>
                <p class="text-textPrimary text-base font-medium leading-normal line-clamp-1">{{ event.name }}</p>
                <p class="text-gray-600 text-sm font-normal leading-normal line-clamp-1">
                    {{ formatDate(event.start_datetime) }} · {{ event.location }}
                </p>
            </div>
            <button @click="goToDetail"
                class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#f0f2f5] text-[#111418] text-sm font-bold leading-normal tracking-[0.015em]">
                <span class="truncate">See details</span>
            </button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        event: {
            type: Object,
            required: true
        },
        index : {
            type: Number,
            required: true
        }
    },
    emits: ['go-to-detail'], 
    data() {
        return {
            isMobile: false,
        }
    },
    mounted() {
        this.checkScreenSize(); 
        window.addEventListener("resize", this.checkScreenSize);
    },
    beforeDestroy() {
        window.removeEventListener("resize", this.checkScreenSize); 
    },
    methods: {
        formatDate(dateTimeString) {
            const date = new Date(dateTimeString);
            const options = {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
            };
            return date.toLocaleString('en-US', options);
        },
        goToDetail() {
            this.$emit('go-to-detail', this.event); 
        },
        checkScreenSize() {
            this.isMobile = window.innerWidth <= 600; 
        },
        shouldEagerLoad(index) {
            if (this.isMobile) {
                return index < 2; 
            }
            return index < 3; 
        }
    }
};
</script>
