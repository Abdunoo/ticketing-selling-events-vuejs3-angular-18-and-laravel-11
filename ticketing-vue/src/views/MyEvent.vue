<template>
    <loading :isLoading="isLoading" />
    <div class="px-4 sm:px-10 md:px-20 flex flex-1 justify-center py-5">
        <div class="layout-content-container flex flex-col max-w-[960px] flex-1">
            <h2 class="text-[#111418] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Your
                events
            </h2>
            <div class="flex items-center gap-4 bg-white px-4 min-h-[72px] py-2 justify-between">
                <div class="flex items-center gap-4">
                    <div class="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-14"
                        style='background-image: url("https://cdn.usegalileo.ai/sdxl10/9c0269b9-ea3c-45ae-9553-fa25cb0ba09d.png");'>
                    </div>
                    <div class="flex flex-col justify-center">
                        <p class="text-[#111418] text-base font-medium leading-normal line-clamp-1">Design sprint
                            workshop
                        </p>
                        <p class="text-[#60758a] text-sm font-normal leading-normal line-clamp-2">Mar 21, 2023</p>
                    </div>
                </div>
                <div class="shrink-0"><button class="text-base font-medium leading-normal">Edit</button></div>
            </div>
            <div class="flex items-center gap-4 bg-white px-4 min-h-[72px] py-2 justify-between">
                <div class="flex items-center gap-4">
                    <div class="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-14"
                        style='background-image: url("https://cdn.usegalileo.ai/stability/eed5d9cc-c6bd-4e6c-96fc-f0bf651c1f9e.png");'>
                    </div>
                    <div class="flex flex-col justify-center">
                        <p class="text-[#111418] text-base font-medium leading-normal line-clamp-1">Product launch party
                        </p>
                        <p class="text-[#60758a] text-sm font-normal leading-normal line-clamp-2">Mar 24, 2023</p>
                    </div>
                </div>
                <div class="shrink-0"><button class="text-base font-medium leading-normal">Edit</button></div>
            </div>
            <div class="flex items-center gap-4 bg-white px-4 min-h-[72px] py-2 justify-between">
                <div class="flex items-center gap-4">
                    <div class="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-14"
                        style='background-image: url("https://cdn.usegalileo.ai/sdxl10/c5eb26bb-47b7-4529-95f6-b347010d8062.png");'>
                    </div>
                    <div class="flex flex-col justify-center">
                        <p class="text-[#111418] text-base font-medium leading-normal line-clamp-1">Team offsite retreat
                        </p>
                        <p class="text-[#60758a] text-sm font-normal leading-normal line-clamp-2">Mar 28, 2023</p>
                    </div>
                </div>
                <div class="shrink-0"><button class="text-base font-medium leading-normal">Edit</button></div>
            </div>
            <div class="flex items-center gap-4 bg-white px-4 min-h-[72px] py-2 justify-between">
                <div class="flex items-center gap-4">
                    <div class="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-14"
                        style='background-image: url("https://cdn.usegalileo.ai/stability/14e7c413-fa4d-4611-ac37-0e8aaa28e186.png");'>
                    </div>
                    <div class="flex flex-col justify-center">
                        <p class="text-[#111418] text-base font-medium leading-normal line-clamp-1">Company all-hands
                            meeting</p>
                        <p class="text-[#60758a] text-sm font-normal leading-normal line-clamp-2">Apr 2, 2023</p>
                    </div>
                </div>
                <div class="shrink-0"><button class="text-base font-medium leading-normal">Edit</button></div>
            </div>
            
        </div>
    </div>
</template>

<script>
export default {

}
</script>