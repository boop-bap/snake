<template>
  <div class="shadow bg-white">
    <div class="h-16 flex items-center justify-between">
      <img
        class="w-16 rotate-90"
        src="https://thumb.ac-illust.com/ee/ee0a9cfe444b9c4e3793724915959921_t.jpeg"
        alt="snake logo"
      />
      <span v-if="userStore.currentUser.email" class="ml-5"
        >Snake snake snake</span
      >
      <div v-if="userStore.currentUser.email">
        <div class="flex items-center justify-center relative z-50 mr-5">
          <div class="relative inline-block text-left dropdown">
            <span class="rounded-md shadow-sm"
              ><button
                class="inline-flex justify-center w-full px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
                type="button"
              >
                <span>Menu</span>
                <svg
                  class="w-5 h-5 ml-2 -mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg></button
            ></span>
            <div
              class="opacity-0 invisible dropdown-menu transition-all duration-300 transform origin-top-right -translate-y-2 scale-95"
            >
              <div
                class="absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none"
                aria-labelledby="headlessui-menu-button-1"
                id="headlessui-menu-items-117"
                role="menu"
              >
                <div class="px-4 py-3">
                  <p class="text-sm leading-5">Signed in as</p>
                  <p
                    class="text-sm font-medium leading-5 text-gray-900 truncate"
                  >
                    {{ userStore.currentUser.email }}
                  </p>
                </div>
                <div class="py-1 test">
                  <a
                    href="/user"
                    tabindex="0"
                    class="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left"
                    role="menuitem"
                    >User information</a
                  >
                </div>
                <div class="py-1">
                  <a
                    tabindex="3"
                    class="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left cursor-pointer"
                    role="menuitem"
                    @click="userStore.logOut"
                    >Sign out</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { userModule } from "@/stores/userModule";

const userStore = userModule();
</script>

<style lang="scss">
.dropdown:focus-within .dropdown-menu {
  opacity: 1;
  transform: translate(0) scale(1);
  visibility: visible;
}
</style>
