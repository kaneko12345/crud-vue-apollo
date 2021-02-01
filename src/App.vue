<template>
  <v-app>
    <v-content>
      <router-view/>
    </v-content>
    <v-snackbar v-model="snackbar" :timeout="2000" :color="snackbarColor" top>
      {{ snackbarMessage }}
      <v-btn dark text @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import appModule from '@/store/modules';

@Component({
  computed: {
    snackbar: {
      get() {
        return appModule.isSnackbarDisplayed;
      },
      set(val: boolean) {
        if (!val) {
          appModule.hideSnackbar();
        }
      },
    },
    snackbarColor() {
      return appModule.snackbarDisplayColor;
    },
    snackbarMessage() {
      return appModule.snackbarDisplayMessage;
    },
  },
})

export default class App extends Vue {

}

</script>
