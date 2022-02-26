<template>
  <div id="app">
    <section class="py-5">
      <div class="container px-4 px-lg-5 mt-5">
        <div
          class="
            row
            gx-4 gx-lg-5
            row-cols-2 row-cols-md-3 row-cols-xl-4
            justify-content-center
          "
        >
          <div class="col mb-5" v-for="todo in user" :key="todo.id">
            <div class="card h-100">
              <!-- Product image-->

              <img class="card-img-top" :src="img + todo.photo" alt="..." />
              <!-- Product details-->
              <div class="card-body p-4">
                <div class="text-center">
                  <!-- Product name-->
                  <h5 class="fw-bolder">
                    {{ todo.name }} {{ todo.last_name }}
                  </h5>
                  <!-- Product price-->
                  ${{ todo.price }}
                </div>
              </div>
              <!-- Product actions-->
              <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                <div class="text-center">
                  <a class="btn btn-outline-dark mt-auto" href="#"
                    >Place an order</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script >
import { global } from "../global";
import axios from "axios";
export default {
  name: "HomeComponent",
  components: {},
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