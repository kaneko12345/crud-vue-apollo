import Vue from 'vue';

Vue.use(require('vue-moment'));

declare module 'vue/types/vue' {
  interface Vue {
    $moment: any;
  }
}
