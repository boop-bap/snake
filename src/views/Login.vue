<template>
  <div class="login">
    <h1>Login</h1>
    <div class="login-form">
      Please login, or continue as guest
      <input type="email" placeholder="Email" v-model="user.email" />
      <input type="password" placeholder="Password" v-model="user.password" />
      <button @click="userLogin">Log in</button>
      <p>or</p>
      <button>Continue as guest</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import firebase from "firebase";

interface ComponentData {
  user: {
    email: string;
    password: string;
  };
}

export default Vue.extend({
  components: {},

  data(): ComponentData {
    return {
      user: {
        email: "",
        password: "",
      },
    };
  },

  computed: {},

  methods: {
    userLogin() {
      console.log(this.user.email, this.user.password);
      firebase
        .auth()
        .signInWithEmailAndPassword(this.user.email, this.user.password)
        .then(() => {
          this.$router.push("/");
        })
        .catch((error) => {
          console.log(123);
          alert(error.message);
        });
    },
  },
});
</script>

<style lang="scss" scoped>
.login {
  width: 500px;
  height: 500px;
  background: grey;
  .login-form {
    display: flex;
    flex-direction: column;
  }
}
</style>
