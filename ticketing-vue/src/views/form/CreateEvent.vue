<template>
    <loading :isLoading="isLoading" />
    <form @submit.prevent="handleSubmit" class="space-y-6 py-4">
        <!-- Event Details Section -->
        <div class="px-4 md:px-8 flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
            <!-- Main Content -->
            <div class="flex-1">
                <h2 class="text-[#0d141c] text-2xl font-bold leading-tight mb-6">Create an Event</h2>

                <!-- Event Name -->
                <div class="flex flex-col space-y-4 mb-4">
                    <label for="name" class="text-[#0d141c] text-base font-medium">Event name*</label>
                    <input v-model="newEvent.name" type="text" id="name" placeholder="Enter event name" required
                        class="form-input w-full border border-[#cedbe8] rounded-xl bg-slate-50 text-[#0d141c] h-14 px-4 py-2 placeholder:text-[#49719c]" />
                </div>

                <!-- Category -->
                <div class="flex flex-col space-y-4 mb-4">
                    <label for="category" class="text-[#0d141c] text-base font-medium">Category*</label>
                    <select v-model="newEvent.category" id="category" required
                        class="form-input w-full border border-[#cedbe8] rounded-xl bg-slate-50 text-[#0d141c] h-14 px-4 py-2 bg-[image:--select-button-svg] placeholder:text-[#49719c]">
                        <option value="">Select category</option>
                        <option class="rounded-lg" v-for="category in categories" :key="category.id" :value="category.id">
                            {{ category.name }}
                        </option>
                    </select>
                </div>

                <!-- Start Date and End Date -->
                <div class="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-4">
                    <div class="flex-1">
                        <label for="start_datetime" class="text-[#0d141c] text-base font-medium">Start date*</label>
                        <input v-model="newEvent.start_datetime" type="datetime-local" id="start_datetime" required
                            class="form-input w-full border border-[#cedbe8] rounded-xl bg-slate-50 text-[#0d141c] h-14 px-4 py-2 placeholder:text-[#49719c]" />
                    </div>
                    <div class="flex-1">
                        <label for="end_datetime" class="text-[#0d141c] text-base font-medium">End date*</label>
                        <input v-model="newEvent.end_datetime" type="datetime-local" id="end_datetime" required
                            class="form-input w-full border border-[#cedbe8] rounded-xl bg-slate-50 text-[#0d141c] h-14 px-4 py-2 placeholder:text-[#49719c]" />
                    </div>
                </div>

                <!-- Location -->
                <div class="flex flex-col space-y-4 mb-4">
                    <label for="location" class="text-[#0d141c] text-base font-medium">Location (Venue or Online
                        URL)*</label>
                    <input v-model="newEvent.location" type="text" id="location" placeholder="Enter location" required
                        class="form-input w-full border border-[#cedbe8] rounded-xl bg-slate-50 text-[#0d141c] h-14 px-4 py-2 placeholder:text-[#49719c]" />
                </div>

                <!-- Description -->
                <div class="flex flex-col space-y-4 mb-4">
                    <label for="description" class="text-[#0d141c] text-base font-medium">Description*</label>
                    <textarea v-model="newEvent.description" id="description" placeholder="Enter description" required
                        class="form-input w-full border border-[#cedbe8] rounded-xl bg-slate-50 text-[#0d141c] min-h-36 px-4 py-2 placeholder:text-[#49719c]"></textarea>
                </div>
            </div>

            <!-- Ticket Types Section -->
            <div class="flex-1">
                <h3 class="text-[#0d141c] text-lg font-bold leading-tight mb-4">Ticket Types</h3>
                <div v-for="(ticket, index) in ticketTypes" :key="index" class="flex flex-col space-y-4 mb-4">
                    <div class="flex flex-col space-y-4">
                        <label class="text-[#0d141c] text-base font-medium">Ticket name*</label>
                        <input v-model="ticket.name" placeholder="Enter ticket name"
                            class="form-input w-full border border-[#cedbe8] rounded-xl bg-slate-50 text-[#0d141c] h-14 px-4 py-2 placeholder:text-[#49719c]" />
                    </div>
                    <div class="flex flex-col space-y-4">
                        <label class="text-[#0d141c] text-base font-medium">Price*</label>
                        <input v-model="ticket.price" placeholder="Enter price" type="number"
                            class="form-input w-full border border-[#cedbe8] rounded-xl bg-slate-50 text-[#0d141c] h-14 px-4 py-2 placeholder:text-[#49719c]" />
                    </div>
                    <div class="flex flex-col space-y-4">
                        <label class="text-[#0d141c] text-base font-medium">Quantity*</label>
                        <input v-model="ticket.available_quantity" placeholder="Enter quantity" type="number"
                            class="form-input w-full border border-[#cedbe8] rounded-xl bg-slate-50 text-[#0d141c] h-14 px-4 py-2 placeholder:text-[#49719c]" />
                    </div>
                    <button type="button" @click="removeTicketType(index)" class="text-red-600 hover:underline">
                        Remove
                    </button>
                </div>
                <button type="button" @click="addTicketType" class="bg-[#007bff] text-white px-4 py-2 rounded-xl">
                    Add Ticket Type
                </button>
            </div>
        </div>

        <!-- Image Banner Section -->
        <div class="px-4 md:px-8 mt-6 flex flex-col items-center justify-center">
            <label class="flex flex-col space-y-4 items-center justify-center mb-16">
                <p class="text-[#0d141c] text-base font-medium">Image Banner*</p>
                <p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>
                <div
                    class="max-w-sm mx-auto bg-white border-dashed border-2 border-gray-400 rounded-lg p-6 text-center">
                    <input ref="uploadInput" id="upload" type="file" class="hidden" accept="image/*"
                        @change="handleFileChange" />
                    <label for="upload" class="cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-8 h-8 text-gray-700 mx-auto mb-4">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                        </svg>
                        <h5 class="text-xl font-bold text-gray-700 mb-2">Upload Picture</h5>
                        <p class="text-sm text-gray-400">Choose photo size should be less than <b
                                class="text-gray-600">2MB</b></p>
                        <p class="text-sm text-gray-400">and should be in <b class="text-gray-600">JPG, PNG, or GIF</b>
                            format.</p>
                        <span id="filename" class="text-gray-500 bg-gray-200 z-50">{{ filename }}</span>
                    </label>
                    <img v-if="imageUrl" :src="imageUrl" class="w-full h-auto mt-4" alt="Image preview" loading="lazy" />
                </div>
            </label>

            <!-- Submit Button -->
            <div class="w-full">
                <button type="submit"
                    class="bg-[#2589f4] text-slate-50 w-full px-5 py-3 rounded-xl text-base font-bold hover:bg-[#1a6bd8]">
                    Create
                </button>
            </div>
        </div>
    </form>
</template>

<script>
import { ref, onMounted, reactive, toRefs } from 'vue';
import Loading from '@/components/Loading.vue';
import apiClient from '@/helpers/axios';
import router from '@/router';
import { useToast } from 'vue-toastification';

export default {
    name: 'CreateEvent',
    components: {
        Loading
    },
    setup() {
        const state = reactive({
            newEvent: {
                name: '',
                category: '',
                start_datetime: '',
                end_datetime: '',
                location: '',
                description: '',
            },
            ticketTypes: [],
            imageUrl: null,
            filename: '',
            isLoading: false,
            errorMessage: '',
            categories: [],
        });

        const toast = useToast();

        const { newEvent, ticketTypes, imageUrl, filename, isLoading, errorMessage } = toRefs(state);

        const addTicketType = () => {
            ticketTypes.value.push({ name: '', price: '', available_quantity: '' });
        };

        const removeTicketType = (index) => {
            ticketTypes.value.splice(index, 1);
        };

        const handleFileChange = (event) => {
            const file = event.target.files[0];
            if (file) {
                const maxSize = 2 * 1024 * 1024; // 2MB
                if (file.size > maxSize) {
                    errorMessage.value = 'File size exceeds 2MB';
                    return;
                }
                const reader = new FileReader();
                reader.onload = () => {
                    imageUrl.value = reader.result;
                    filename.value = file.name;
                    errorMessage.value = '';
                };
                reader.readAsDataURL(file);
            }
        };

        const getCategories = async () => {
            try {
                const response = await apiClient.get('/api/categories');
                state.categories =  response.data;
            } catch (error) {
                console.error('Error fetching categories:', error);
                return [];
            }
        }

        const handleSubmit = async () => {
            state.isLoading = true;
            try {
                const formData = new FormData();
                for (const key in newEvent.value) {
                    formData.append(key, newEvent.value[key]);
                }
                formData.append('ticket_types', JSON.stringify(ticketTypes.value));
                // Include image file if it exists
                const uploadInput = document.getElementById('upload');
                if (uploadInput.files.length > 0) {
                    formData.append('image_banner', uploadInput.files[0]);
                }

                await apiClient.post('/api/events', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                // Reset state after successful submission
                Object.assign(state.newEvent, {
                    name: '',
                    category: '',
                    start_datetime: '',
                    end_datetime: '',
                    location: '',
                    description: ''
                });
                state.ticketTypes = [];
                imageUrl.value = null;
                filename.value = '';
            } catch (error) {
                console.error('Error creating event:', error);
                toast.error('Create Event Failed');
            } finally {
                state.isLoading = false;
                toast.success('Create Event successfully');
                router.push('/all-for-you')
            }
        };

        onMounted(() => {
            addTicketType();
            getCategories();
        });

        return {
            ...toRefs(state),
            newEvent,
            ticketTypes,
            imageUrl,
            filename,
            isLoading,
            errorMessage,
            addTicketType,
            removeTicketType,
            handleFileChange,
            handleSubmit
        };
    }
};
</script>

<style scoped>
/* Add any additional styles here */
</style>