<template>
  <section class="bg-gray-50 dark:bg-gray-900">
    <div
      class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
    >
      <div
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <a href="/main">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="white"
              class="w-8 h-8"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </a>

          <h1
            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
          >
            Register
          </h1>
          <div class="space-y-12 md:space-y-6" action="#">
            <div>
              <span
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Your in game name</span
              >
              <input
                v-model="userData.displayName"
                type="text"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Name"
              />
            </div>
            <div>
              <span
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Your email</span
              >
              <input
                v-model="userData.email"
                type="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Name@company.com"
              />
            </div>
            <div>
              <span
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Password</span
              >
              <input
                v-model="userData.password"
                type="password"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>

            <div>
              <input
                v-model="userData.repeatPassword"
                type="password"
                placeholder="Confirm your password"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>

            <button
              @click="register"
              class="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Register
            </button>
            <p
              class="text-sm font-light text-gray-500 dark:text-gray-400 text-center flex flex-col items-center justify-center"
            >
              <span>
                Already have an account?
                <a
                  href="/login"
                  class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >Login</a
                >
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { userModule } from "@/stores/userModule";

interface UserData {
  email: string;
  password: string;
  repeatPassword: string;
  displayName: string;
}

const userData: UserData = reactive({
  email: "",
  password: "",
  repeatPassword: "",
  displayName: "",
});

async function register() {
  if (!userData.password) {
    window.alert("Please enter your password to register");
    return;
  }

  if (!userData.repeatPassword) {
    window.alert("Please confirm your password");
    return;
  }

  if (userData.password.length < 6) {
    window.alert("A password must contain at least 6 characters");
    return;
  }

  if (userData.password === userData.repeatPassword) {
    await userModule().register(
      userData.email,
      userData.password,
      userData.displayName
    );
  } else {
    window.alert("Passwords do not match");
    return;
  }
}
</script>
