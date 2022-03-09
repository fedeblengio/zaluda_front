<template>
  <div id="app">
    <headerComponent></headerComponent>
    <section class="py-5">
      <div class="container photo-cont">
        <div class="photo-card" v-for="todo in user" :key="todo.id">
          <router-link
            :to="{
              name: 'idolComponent',
              params: {
                name: todo.name,
                last_name: todo.last_name,
                Datos: [todo],
              },
            }"
          >
            <div class="">
              <img class="" :src="img + todo.photo" alt="..." />
            </div>
            <div class="photo-card-text">
              <h3>
                <country-flag :country="todo.country" /> &nbsp;{{ todo.name }}
                {{ todo.last_name }}
              </h3>
            </div>
            <div class="pohto-card-price">
              <p>${{ todo.price }}</p>
            </div>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>
<script >
import { global } from "../global";
import CountryFlag from "vue-country-flag";
import headerComponent from "../components/headerComponent.vue";
import axios from "axios";
export default {
  name: "HomeComponent",
  components: {
    CountryFlag,
    headerComponent,
  },
  data() {
    return {
      user: "",
      img: "",
    };
  },
  mounted() {
    this.getData();
    this.img = global.img + "img/";
  },
  methods: {
    getData() {
      let config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      axios.get(global.url + "idols", config).then((res) => {
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