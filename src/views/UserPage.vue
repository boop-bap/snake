<!-- <template>
  <div class="user-info">
    <h1>User information</h1>
    <div class="user-form">
      <input type="email" placeholder="Email" v-bind="user.email" />
      <input type="text" placeholder="In-game name" v-bind="user.name" />
    </div>
    <div class="user-statistics">User statistics</div>
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

  created() {
    firebase.auth().onAuthStateChanged((user) => {
      console.log(user);
    });
  },

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
</style> -->
