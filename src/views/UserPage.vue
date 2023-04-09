<template>
  <div class="h-[calc(100vh-64px)] user-info">
    <h1>User information</h1>
    <div class="user-info__main">
      <p>Email: {{ userStore.currentUser.email }}</p>
      <p>DisplayName: {{ userStore.currentUser.userName }}</p>
    </div>
    <br />
    <div class="user-statistics">User statistics add later</div>
  </div>
</template>

<script setup lang="ts">
import { userModule } from "@/stores/userModule";

const userStore = userModule();
</script>

<style lang="scss" scoped>
.user-info {
  width: 500px;
  height: 500px;
  background: grey;
  &__main {
    display: flex;
    flex-direction: column;
  }
}
</style>
