<template>
  <div class="register">
    <h1>register</h1>
    <div class="register-form">
      Please register, or continue as guest
      <input type="email" placeholder="Email" v-model="user.email" />
      <input type="text" placeholder="In-game name" v-model="user.name" />

      <input type="password" placeholder="Password" v-model="user.password" />
      <button @click="userRegistration">Register</button>
      <p>or</p>
      <button>Continue as guest</button>
    </div>
  </div>
</template>

<script lang="ts">
import firebase from "firebase";
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

  methods: {
    userRegistration() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.user.email, this.user.password)
        .then((res) => {
          res.user
            .updateProfile({
              displayName: this.user.name,
            })
            .then(() => {
              this.$router.push("/login");
            });
        })
        .catch((error) => {
          alert(error.message);
        });
    },
  },
});
</script>

<style lang="scss" scoped>
.register {
  width: 500px;
  height: 500px;
  background: grey;
  .register-form {
    display: flex;
    flex-direction: column;
  }
}
</style>
