<template>
  <div id="app">
    <section class="py-5 cont-message container" >
      <div class="container photo-cont-message">
        <div class="messages"><h1>My messages</h1></div>
        <div class="photo-card message-card" v-for="todo in user" :key="todo.id">
          <div class="">
            <img class="" :src="img + todo.photo" alt="..." />
            <div class="photo-card-text">
              <h3>
                <country-flag :country="todo.country" /> &nbsp;{{ todo.name }}
                {{ todo.last_name }}
              </h3>
            </div>
          </div>
          <div>
            <h3 class="message-card-text">The wait is over!</h3>
            <a :href="video + todo.video_name">See ur Video</a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script >
import { global } from "../global";
import CountryFlag from "vue-country-flag";
import axios from "axios";
export default {
  name: "HomeComponent",
  components: {
    CountryFlag,
  },
  data() {
    return {
      user: "",
      img: "",
      video: "",
      userName:"",
    };
  },
  mounted() {
    this.getData();
    this.img = global.img + "img/";
     this.video = global.img + "video/";
  },
  methods: {
    getData() {
      let config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      this.userName = localStorage.getItem("userId");
      axios.get(global.url + "response/" + this.userName, config).then((res) => {
        if (res.status == 200) {
          this.user = res.data;
        }
      });
    },
  },
};
</script>
<style>
@import "@/assets/base.css";
</style>