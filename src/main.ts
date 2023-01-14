import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import firebase from 'firebase/app';

Vue.config.productionTip = false;

const firebaseConfig = {

  apiKey: "AIzaSyBIwjhCx39nZoPtc6Cv0pIk6CmivQRQfvA",

  authDomain: "snake-one.firebaseapp.com",

  projectId: "snake-one",

  storageBucket: "snake-one.appspot.com",

  messagingSenderId: "192320646319",

  appId: "1:192320646319:web:ae197cbfc1eb25752e385a"

};

firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
