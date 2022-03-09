<template>
  <div id="app">
    <nav
      class="navbar navbar-expand-lg navbar-dark"
      style="background-color: #161616"
    >
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
            <li v-if="isLogin">
              <a class="nav-link active" aria-current="page"
                >Welcome, {{ userName }}</a
              >
            </li>
            <li v-else>
              <div class="loginBtn">
                <div class="loginImg">
                  <img src="/src/assets/img/google.png" @click="login()" />
                </div>
                <button @click="login()" class="loginBtn">
                  Sign up with Google
                </button>
              </div>
            </li>

            <li v-if="isLogin">
              <i class="fas fa-bell"></i>
            </li>
            <li>
              <button
                @click="logOut()"
                class="singOutBtn"
                style=""
                v-if="isLogin"
              >
                Sign out
              </button>
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
      userName: "",
    };
  },
  mounted() {
    if (localStorage.getItem("login")) {
      console.log(localStorage.getItem("login"));
      this.isLogin = true;
      this.userName = localStorage.getItem("user");
    } else {
      localStorage.clear();
    }
  },
  methods: {
    async logOut() {
      const result = await this.$gAuth.signOut();
      this.isLogin = false;
      this.userInfo = "";
      localStorage.clear();
    },
    async login() {
      const googleUser = await this.$gAuth.signIn();
      this.userInfo = googleUser.getBasicProfile();
      this.isLogin = this.$gAuth.isAuthorized;
      localStorage.setItem("login", this.isLogin);
      localStorage.setItem("user", this.userInfo.tf);
      this.userName = this.userInfo.tf;
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
          localStorage.setItem("userId", this.userInfo.TW);
        }
      });
    },
  },
};
</script>
<style>
@import "@/assets/base.css";
</style>