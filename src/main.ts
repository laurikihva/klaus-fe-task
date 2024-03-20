import { createApp } from "vue";
import App from "./App.vue";

import VueAwesomePaginate from "vue-awesome-paginate";

import "@/assets/css/tailwind.css";
import "vue-awesome-paginate/dist/style.css";

createApp(App).use(VueAwesomePaginate).mount("#app");
