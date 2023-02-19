import { ref, watch } from "vue";
import { defineStore } from "pinia";
import { auth } from "@/firebase";

import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import router from "@/router";

export const userModule = defineStore("userModule", () => {
  interface User {
    email: string;
    userName: string;
    id: string;
  }

  const currentUser = ref<User>({
    email: "",
    userName: "",
    id: "",
  });

  const isLoggedIn = ref<boolean>(false);

  if (localStorage.getItem("user")) {
    currentUser.value = JSON.parse(localStorage.getItem("user") as any);
  }

  if (localStorage.getItem("isLoggedIn")) {
    isLoggedIn.value = JSON.parse(localStorage.getItem("isLoggedIn") as any);
  }

  watch(
    currentUser,
    () => {
      localStorage.setItem("user", JSON.stringify(currentUser.value));
      console.log("watch from pinia");
    },
    { deep: true }
  );

  watch(isLoggedIn, () => {
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn.value));
  });

  const setCurrentUser = () => {
    console.log("setCurrentUser");
    return auth.onAuthStateChanged((user: any) => {
      if (user !== null) {
        currentUser.value.email = user.email;
        currentUser.value.userName = user.displayName;
        currentUser.value.id = user.uid;

        isLoggedIn.value = true;
      }
    });
  };

  const register = async (
    email: string,
    password: string,
    displayName: string
  ) => {
    try {
      const userData = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (userData) {
        currentUser.value.email = userData.user.email as string;
        currentUser.value.userName = displayName as string;
        currentUser.value.id = userData.user.uid;

        await updateProfile(auth.currentUser, { displayName });
        console.log(
          auth.currentUser.displayName,
          "auth.currentUser.displayName"
        );
        isLoggedIn.value = true;
      }
    } catch (e) {
      console.log(e);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const userData = await signInWithEmailAndPassword(auth, email, password);

      if (userData) {
        currentUser.value.email = userData.user.email as string;
        currentUser.value.userName = auth.currentUser.displayName;
        currentUser.value.id = userData.user.uid;

        isLoggedIn.value = true;
        router.push("garden");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const logOut = () => {
    signOut(auth);
    currentUser.value = {
      email: "",
      userName: "",
      id: "",
    };
    isLoggedIn.value = false;
  };

  return { currentUser, isLoggedIn, login, setCurrentUser, register, logOut };
});
