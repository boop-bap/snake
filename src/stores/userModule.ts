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

  console.log("usermodule");

  if (localStorage.getItem("user")) {
    const userFromLocal = JSON.parse(localStorage.getItem("user") as string);
    const { email, displayName, uid } = userFromLocal.user;

    currentUser.value.email = email;
    currentUser.value.userName = displayName;
    currentUser.value.id = uid;
  }

  // watch(
  //   currentUser,
  //   () => {
  //     localStorage.setItem("user", JSON.stringify(currentUser.value));
  //     console.log("watch from pinia");
  //   },
  //   { deep: true }
  // );

  const setCurrentUser = () => {
    console.log("setCurrentUser");
    return auth.onAuthStateChanged((user: any) => {
      if (user) {
        currentUser.value.email = user.email;
        currentUser.value.userName = user.displayName;
        currentUser.value.id = user.uid;
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

        window.localStorage.setItem("user", JSON.stringify(userData));

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
    window.localStorage.removeItem("user");
    router.push("snake");
  };

  return { currentUser, login, setCurrentUser, register, logOut };
});
