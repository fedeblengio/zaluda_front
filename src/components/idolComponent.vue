<template>
  <div>
    <h1>Famoso : {{name}} {{last_name}} <country-flag :country="flag" /></h1>
    <vue-headful :title="name + ' '+last_name" />
    <br />
    <center>
      <img width="500px" class="center" :src="img + photo" :alt="name+' '+last_name" />
    </center>
  </div>
</template>
<script>
import { global } from "../global";
import vueHeadful from "vue-headful";
import CountryFlag from "vue-country-flag";
export default {
  name: "idolComponent",
  components: {
    vueHeadful,
    CountryFlag
  },
  data() {
    return {
      img: "",
      photo: "",
      name: "",
      last_name: "",
      flag: "",
    };
  },
  mounted() {
    this.name = this.$route.params.name;
    this.photo = this.$route.params.img;
    this.last_name = this.$route.params.last_name;
    this.flag = this.$route.params.flag;
    this.img = global.img + "img/";
  },
};
</script>