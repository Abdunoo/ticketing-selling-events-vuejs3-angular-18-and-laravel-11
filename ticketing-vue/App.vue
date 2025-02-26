<template>
  <div class="min-h-screen flex flex-col">
    <Header v-if="showHeader" :role="'user'" class="sticky top-0 z-10" />

    <main class="flex-1 w-full mb-16 md:mb-0">
      <router-view />
    </main>

    <nav
      v-if="!showHeader"
      class="md:hidden fixed bottom-0 left-0 right-0 bg-gray-50 text-textSecondary flex justify-around items-center p-2"
    >
      <router-link
        v-for="item in menuItems"
        :key="item.name"
        class="flex flex-col items-center w-full"
        :to="{ name: item.name }"
      >
        <font-awesome-icon :icon="item.icon" class="h-6 w-6" />
        <span class="text-xs">{{ item.label }}</span>
      </router-link>
    </nav>

    <footer v-if="showHeader" class="w-full bg-gray-200">
      <div class="w-full p-4 grid grid-cols-2 items-center">
        <span class="text-sm w-auto text-gray-500 text-center"
          >© 2024 <a href="https://sandbox2.panemu.com/abdundev/" class="hover:underline">Abdundev™</a>.
          All Rights Reserved.
        </span>
        <ul
          class="w-full flex space-x-4 justify-center bg-red-700 text-sm font-medium text-gray-500"
        >
          <li>
            <a href="about" class="hover:underline mr-4 md:mr-6">About</a>
          </li>
          <li>
            <a href="terms" class="hover:underline mr-4 md:mr-6">Terms</a>
          </li>
          <li>
            <a href="privacy" class="hover:underline mr-4 md:mr-6">Privacy Policy</a>
          </li>
          <li>
            <a href="contact" class="hover:underline">Contact</a>
          </li>
        </ul>
      </div>
    </footer>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faTachometerAlt,
  faCalendarAlt,
  faTicketAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Header from "./src/components/Header.vue";

library.add(faTachometerAlt, faCalendarAlt, faTicketAlt, faUser);

export default {
  components: {
    FontAwesomeIcon,
    Header,
  },
  setup() {
    const isBottomMenuVisible = ref(true);
    const showHeader = ref(false);

    const checkScreenSize = () => {
      showHeader.value = window.innerWidth >= 768;
    };

    const menuItems = [
      { name: "Dashboard", label: "Dashboard", icon: ["fas", "tachometer-alt"] },
      { name: "Events", label: "Events", icon: ["fas", "calendar-alt"] },
      { name: "Mytickets", label: "Mytickets", icon: ["fas", "ticket-alt"] },
      { name: "Account", label: "Account", icon: ["fas", "user"] },
    ];

    onMounted(() => {
      checkScreenSize();
      window.addEventListener("resize", checkScreenSize);
    });

    onBeforeUnmount(() => {
      window.removeEventListener("resize", checkScreenSize);
    });

    return {
      isBottomMenuVisible,
      showHeader,
      menuItems,
    };
  },
};
</script>

<style scoped>
nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
}

main {
  flex-grow: 1;
}

html,
body {
  height: 100%;
}

.min-h-screen {
  min-height: 100vh;
}
</style>
