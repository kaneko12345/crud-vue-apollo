import Vue from 'vue';

Vue.use(require('qs'));

declare module 'vue/types/vue' {
  interface Vue {
    $qs: any;
  }
}
