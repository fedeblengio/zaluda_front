<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark">
      <div class="container px-4 px-lg-5">
        <a class="navbar-brand" href="/home">Zaluda</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          class="collapse navbar-collapse nav-var-fix"
          id="navbarSupportedContent"
        >
          <ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
            <li>
              <a class="nav-link active" aria-current="page" v-if="isLogin"
                >Welcome, {{ userInfo.tf }}</a
              >
            </li>
            <!-- <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="/home"
                >Home</a
              >
            </li> -->
            <li>
             
                <div class="loginBtn">
                  <div class="loginImg" v-if="!userInfo">
                    <img src="/src/assets/img/google.png" @click="login()" />
                  </div>
                  <button @click="login()" v-if="!userInfo" class="loginBtn">
                    Sign up with Google
                  </button>
                  <button @click="logOut()" v-else class="" style="">Sign out</button>
                </div>
             
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>
<script>
import { global } from "../global";
import axios from "axios";
export default {
  name: "navComponent",
  data() {
    return {
      isLogin: false,
      userInfo: "",
    };
  },
  methods: {
    async logOut() {
      const result = await this.$gAuth.signOut();
      this.isLogin = false;
      this.userInfo = "";
    },
    async login() {
      const googleUser = await this.$gAuth.signIn();
      this.userInfo = googleUser.getBasicProfile();
      this.isLogin = this.$gAuth.isAuthorized;
      this.saveInfoUsers();
    },
    saveInfoUsers() {
      let config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      let data = {
        id_google: this.userInfo.TW,
        full_name: this.userInfo.tf,
        mail: this.userInfo.zv,
      };
      axios.post(global.url + "users", data, config).then((res) => {
        if (res.status == 200) {
          console.log("bien");
        }
      });
    },
  },
};
</script>
<style>
@import "@/assets/base.css";
</style>