import Vue from 'vue';
import VuejsDialog from 'vuejs-dialog';
import 'vuejs-dialog/dist/vuejs-dialog.min.css';

Vue.use(VuejsDialog);

declare module 'vue/types/vue' {
  interface Vue {
    $dialog: any;
  }
}
