import Vue from 'vue';
import '@/plugins/axios';
import App from '@/App.vue';
import '@/registerServiceWorker';
import router from '@/router';
import store from '@/store';
import vuetify from '@/plugins/vuetify';
import '@/plugins/vue-dialog';
import '@/plugins/moment';
import '@/plugins/vue-unique-id';
import { createProvider } from '@/vue-apollo';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  apolloProvider: createProvider(),
  render: h => h(App),
}).$mount('#app');
