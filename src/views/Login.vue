<template>
  <div>Login page</div>
</template>

<script lang="ts">
import Vue from "vue";

interface ComponentData {
  user: {
    name: string;
    email: string;
    password: string;
  };
}

export default Vue.extend({
  components: {},

  data(): ComponentData {
    return {
      user: {
        name: "",
        email: "",
        password: "",
      },
    };
  },

  computed: {},

  methods: {},
});
</script>

<style lang="scss" scoped></style>
