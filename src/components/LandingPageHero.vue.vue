<template>
  <section class="bg-gray-900 text-white">
    <div class="h-[calc(100vh-64px)] grid items-center">
      <div class="text-center">
        <h1
          class="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl"
        >
          Snake snake snake
        </h1>

        <p class="mx-auto mt-4 max-w-xl sm:text-xl sm:leading-relaxed">
          Time to snake
        </p>

        <div
          v-if="!userStore.currentUser.email"
          class="mt-8 flex flex-wrap justify-center gap-4"
        >
          <a
            class="block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
            href="/login"
          >
            Login
          </a>

          <a
            class="block w-full rounded border border-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
            href="/register"
          >
            Register
          </a>
        </div>
        <div v-else class="mt-8 flex flex-wrap justify-center gap-4">
          <a
            class="block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
            href="/garden"
          >
            Play
          </a>
          <a
            class="block w-full rounded border border-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
            href="/garden"
          >
            Leaderboard
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { userModule } from "@/stores/userModule";

const userStore = userModule();
</script>
