<template>
  <div id="app">
    <vue-headful :title="title" />
    <navComponent></navComponent>
    <headerComponent></headerComponent>
    <bodyComponent></bodyComponent>
  </div>
</template>
<script >
import vueHeadful from "vue-headful";
import navComponent from "./components/navComponent.vue";
import headerComponent from "./components/headerComponent.vue";
import bodyComponent from "./components/bodyComponent.vue";
export default {
  name: "HomeComponent",
  components: {
    vueHeadful,
    navComponent,
    headerComponent,
    bodyComponent,
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
