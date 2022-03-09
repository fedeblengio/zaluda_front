<template>
  <div id="app">
     <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
     integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous"> 
     
    <vue-headful :title="title" />
    <navComponent></navComponent>
  
    <router-view></router-view>
  </div>
</template>
<script >
import vueHeadful from "vue-headful";
import navComponent from "./components/navComponent.vue";

export default {
  name: "HomeComponent",
  components: {
    vueHeadful,
    navComponent,
   
  },
  data() {
    return {
      title: "Home",
    };
  },
};
</script>
<style>
@import "@/assets/base.css";
</style>
