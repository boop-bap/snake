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

  const currentUser = {
    email: "",
    userName: "",
    id: "",
  };

  console.log("usermodule");

  if (localStorage.getItem("user")) {
    const userFromLocal = JSON.parse(localStorage.getItem("user") as string);
    const { email, displayName, uid } = userFromLocal.user;

    currentUser.email = email;
    currentUser.userName = displayName;
    currentUser.id = uid;
  }

  const setCurrentUser = () => {
    console.log("setCurrentUser");
    return auth.onAuthStateChanged((user: any) => {
      if (user) {
        currentUser.email = user.email;
        currentUser.userName = user.displayName;
        currentUser.id = user.uid;
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
        currentUser.email = userData.user.email as string;
        currentUser.userName = displayName as string;
        currentUser.id = userData.user.uid;

        window.localStorage.setItem("user", JSON.stringify(userData));
        const user = auth.currentUser as any;

        await updateProfile(user as any, { displayName });

        router.push("garden");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const userData = await signInWithEmailAndPassword(auth, email, password);

      if (userData) {
        currentUser.email = userData.user.email as string;
        currentUser.userName = userData.user.displayName as string;
        currentUser.id = userData.user.uid as string;

        window.localStorage.setItem("user", JSON.stringify(userData));

        router.push("garden");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const logOut = () => {
    signOut(auth);
    currentUser.email = "";
    currentUser.userName = "";
    currentUser.id = "";
    window.localStorage.removeItem("user");
    router.push("snake");
  };

  return { currentUser, login, setCurrentUser, register, logOut };
});
