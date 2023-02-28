import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import ErrorMessage from "./components/ErrorMessage.vue";
import { renderToString } from 'vue/server-renderer'
import VueObserveVisibility from 'vue-observe-visibility'
import VueToast from 'vue-toast-notification';
import VueSocialSharing from 'vue-social-sharing';
import vfmPlugin from 'vue-final-modal';
import 'vue-toast-notification/dist/theme-sugar.css';

const app = createApp(App);

app.use(router);
app.use(VueObserveVisibility);
app.use(VueToast);
app.use(VueSocialSharing);
app.use(vfmPlugin);
app.component("ErrorMessage", ErrorMessage);

app.mount("#manga-mobile-app");

renderToString(app);