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
              <a class="nav-link" aria-current="page"
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
              <router-link to="/profile">
                <a class="nav-link">My profile</a>
              </router-link>
            </li>
            <li v-if="isLogin">
              <div class="noti-icon" @click="showNoti()">
                <i class="fas fa-bell"></i>
                <span
                  class="sidebarDot_event"
                  id="sidebarDot_event"
                  v-if="noti"
                ></span>
                <div class="noti-conte" id="noti">
                  <router-link to="/profile">
                    <p class="profile_text" v-if="noti">Your message is ready</p>
                    <p class="profile_text" v-else>Nothing yet.</p>
                  </router-link>
                </div>
              </div>
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
import $ from "jquery";
export default {
  name: "navComponent",
  data() {
    return {
      isLogin: false,
      userInfo: "",
      userName: "",
      aux: 1,
      user: "",
      noti: false,
    };
  },
  mounted() {
    if (localStorage.getItem("login")) {
      this.isLogin = true;
      this.userName = localStorage.getItem("user");
      this.getData();
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
    showNoti() {
      let noti = document.getElementById("noti");
      if (this.aux == 0) {
        noti.style.display = "none";
        this.aux = 1;
      } else {
        noti.style.display = "block";
        this.aux = 0;
      }
    },
    getData() {
      let config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      let id = localStorage.getItem("userId");
      axios.get(global.url + "response/" + id, config).then((res) => {
        if (res.status == 200) {
          this.user = res.data;
          if ($.isEmptyObject(res.data)) {
            this.noti = false;
          } else {
            this.noti = true;
            this.user = res.data;
          }
        }
      });
    },
  },
};
</script>
<style>
@import "@/assets/base.css";
</style>