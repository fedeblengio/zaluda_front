<template>
  <div>
    <div class="container">
      <div class="idol-profile">
        <div class="idol-description">
          <div class="idol-description-header">
            <country-flag :country="datos[0].country" />
            <h2>{{ datos[0].name }} {{ datos[0].last_name }}</h2>
          </div>
          <div>
            <img :src="img + datos[0].photo" />
          </div>
          <div class="idol-description-text">
            <h3>
              {{ datos[0].profession }}
            </h3>
            <p>{{ datos[0].description }}</p>
          </div>
        </div>
        <div class="idol-message">
          <div class="idol-message-conteiner">
            <div>
              <h4>
                Personalised video by {{ datos[0].name }}
                {{ datos[0].last_name }}
              </h4>
              <p class="idol-description-price">Price ${{ datos[0].price }}</p>
            </div>
            <div class="idol-description-forwho">
              <div
                class="idol-description-element"
                id="ele-1"
                @click="selectEvents('0')"
              >
                <i class="far fa-birthday-cake"></i>
                <p>Birthday</p>
              </div>
              <div
                class="idol-description-element"
                id="ele-2"
                @click="selectEvents('1')"
              >
                <i class="fas fa-rings-wedding"></i>
                <p>Wedding</p>
              </div>
              <div
                class="idol-description-element"
                id="ele-3"
                @click="selectEvents('2')"
              >
                <i class="fas fa-glass-cheers"></i>
                <p>Events</p>
              </div>
              <div
                class="idol-description-element"
                id="ele-4"
                @click="selectEvents('3')"
              >
                <i class="fas fa-graduation-cap"></i>
                <p>Graduation</p>
              </div>
            </div>
            <div class="idol-description-input">
              <input
                id="input"
                type="text"
                placeholder="Who is the video for?"
                v-model="message"
              />
              <textarea
                id="textarea"
                class="input"
                cols="15"
                rows="3"
                contenteditable
                placeholder="Insert the message here!"
                v-model="message2"
              ></textarea>
            </div>
            <button @click="saveRequests()">Next</button>
          </div>
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
      message2: "",
      google_id: "",
      event_id: 0,
      event: "",
    };
  },
  mounted() {
    this.datos = this.$route.params.Datos;
    this.img = global.img + "img/";
    this.google_id = localStorage.getItem("userId");
  },
  methods: {
    saveRequests() {
      if (localStorage.getItem("login")) {
        let config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        let data = {
          id_google: this.google_id,
          id_idols: this.datos[0].id,
          message:
            "Video for " +
            this.message +
            " /// " +
            this.event +
            " /// " +
            "This is the message: " +
            this.message2,
        };
        axios.post(global.url + "requests", data, config).then((res) => {
          if (res.status == 200) {
            let input = document.getElementById("input");
            let textarea = document.getElementById("textarea");
            input.value = "";
            textarea.value = "";
            this.saveSale();
            this.$router.push("/confirmation");
          }
        });
      } else {
        alert("You need to login to access for this function");
      }
    },
    saveSale() {
      let config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      let data = {
        id_google: this.google_id,
        id_idols: this.datos[0].id,
        price: this.datos[0].price,
      };
      axios.post(global.url + "sale", data, config).then((res) => {
        if (res.status == 200) {
       
        }
      });
    },
    selectEvents(id) {
      let elements = document.getElementsByClassName(
        "idol-description-element"
      );

      if (id == 0) {
        this.event = "Birthday";
      } else if (id == 1) {
        this.event = "Wedding";
      } else if (id == 2) {
        this.event = "Events";
      } else {
        this.event = "Graduation";
      }
      console.log(this.event);
      if (this.event_id == 0) {
        elements[id].style.color = "red";
      }
      if (this.event_id != id) {
        elements[id].style.color = "red";
        elements[this.event_id].style.color = "black";
        this.event_id = id;
      }
    },
  },
};
</script>