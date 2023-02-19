import { defineStore } from "pinia";
import { auth } from "@/firebase";
import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import router from "@/router";

interface State {
  email: string;
  userName: string;
  currentUser: any;
}

export default defineStore({
  id: "counter",

  state: (): State => ({
    email: "",
    userName: "",
    currentUser: {},
  }),

  getters: {
    getCurrentUser() {
      console.log(123, auth.currentUser);
      return auth.currentUser;
    },
  },

  actions: {
    async register(
      email: string,
      password: string,
      displayName: string
    ): Promise<void> {
      console.log(email, password, displayName);

      try {
        const userData = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        if (userData) {
          this.email = userData.user.email as string;
          this.userName = displayName as string;

          auth.currentUser.displayName = this.userName;
          await updateProfile(auth.currentUser, { displayName });
        }
      } catch (e) {
        console.log(e);
      }
    },

    async login(email: string, password: string): Promise<void> {
      try {
        const userData = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        if (userData) {
          this.email = userData.user.email as string;
          this.currentUser = auth.currentUser;
          console.log(userData);
          router.push("garden");
        }
      } catch (e) {
        console.log(e);
      }
    },

    async signOut(): Promise<void> {
      signOut(auth);
    },
  },
});
