<template>
  <div>
    <div class="container">
      <div class="idol-profile">
        <div class="idol-description">
          <div>
            <img :src="img + datos[0].photo" />
            <p class="idol-description-price">Price ${{ datos[0].price }}</p>
          </div>
          <div>
            <h2>{{ datos[0].name }} {{ datos[0].last_name }}</h2>
            <h3>
              <country-flag :country="datos[0].country" /> &nbsp;
              {{ datos[0].profession }}
            </h3>
            <p>{{ datos[0].description }}</p>
          </div>
        </div>
        <div class="idol-message">
          <textarea v-model="message"></textarea>
          <button @click="saveRequests()">Send</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { global } from "../global";
import CountryFlag from "vue-country-flag";
import axios from "axios";
export default {
  name: "idolComponent",
  components: {
    CountryFlag,
  },
  data() {
    return {
      id: "",
      img: "",
      datos: "",
      message: "",
      google_id:"",
    };
  },
  mounted() {
    
    this.datos = this.$route.params.Datos;
    this.img = global.img + "img/";
    this.google_id = localStorage.getItem("userId");

    
  },
  methods: {
    saveRequests() {
      let config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      let data = {
        id_google: this.google_id,
        id_idols: this.datos[0].id,
        message: this.message,
      };
      axios.post(global.url + "requests", data, config).then((res) => {
        if (res.status == 200) {
        }
      });
    },
  },
};
</script>