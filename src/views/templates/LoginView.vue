<template>
  <v-container>
    <LoginForm :onlogin="handleLogin" />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import LoginForm from '@/components/molecules/LoginForm.vue';

@Component({
  components: {
    LoginForm,
  },
})

export default class LoginView extends Vue {
  private handleLogin(authInfo: any) {
    return this.$store.dispatch('login', authInfo).then(() => {
      this.$router.push({ path: '/' });
    })
      .catch(err => this.throwReject(err));
  }

  static throwReject(err: any) {
    return Promise.reject(err);
  }
}
</script>
