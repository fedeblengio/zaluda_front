<template>
  <div id="app">
    <!-- Navigation-->
    <vue-headful :title="title" />
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container px-4 px-lg-5">
        <a class="navbar-brand" href="#!">Zaluda</a>
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
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#!">Home</a>
            </li>
          </ul>
          <!--   <form class="d-flex">
                        <button class="btn btn-outline-dark" type="submit">
                            <i class="bi-cart-fill me-1"></i>
                            Cart
                            <span class="badge bg-dark text-white ms-1 rounded-pill">0</span>
                        </button>
                    </form> -->
        </div>
      </div>
    </nav>
    <!-- Header-->
    <header class="bg-dark py-5">
      <div class="container px-4 px-lg-5 my-5">
        <div class="text-center text-white">
          <h1 class="display-4 fw-bolder">Zaluda</h1>
          <p class="lead fw-normal text-white-50 mb-0">idols</p>
        </div>
      </div>
    </header>
    <!-- Section-->
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
          <div class="col mb-5" v-for="todo in (user)" :key="todo.id">
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
import vueHeadful from "vue-headful";
import { global } from "./global";
import axios from "axios";
export default {
  name: "HomeComponent",
  components: {
    vueHeadful,
  },
  data() {
    return {
      title: "Home",
      user: "",
      img: "",
    };
  },
  mounted() {
    this.getData();
    this.img = global.img + "img/"
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
