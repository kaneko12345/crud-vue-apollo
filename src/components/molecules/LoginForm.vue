<template>
  <v-card>
    <v-container>
      <v-form novalidate>
        <v-card-title class="text-center justify-center py-6">
          <h1 class="font-weight-bold display-3 basil--text">LOGIN</h1>
        </v-card-title>
        <v-card-text>
          <v-toolbar-title>email</v-toolbar-title>
          <v-text-field
            prepend-icon="mdi-email"
            label="email"
            v-model="email"
            name="Email"
            @focus="resetError"
            placeholder="例：〜@×××.com"
            :rules="[loginRules.required, loginRules.regex_email]"
          >
          </v-text-field>
          <v-toolbar-title>password</v-toolbar-title>
          <v-text-field
            prepend-icon="mdi-lock"
            label="password"
            v-model="password"
            @focus="resetError"
            placeholder="例：××××××××"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            :rules="[loginRules.required, loginRules.min]"
            @click:append="showPassword = !showPassword"
          >
          </v-text-field>
        </v-card-text>
        <Button
          :disabled="disableLoginAction"
          @click="handleClick"
          name="Password"
          :loading="loading"
        >
          ログイン
        </Button>
      </v-form>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Button from '@/components/atoms/Button.vue';

@Component({
  components: {
    Button,
  },
})

export default class LoginForm extends Vue {
  @Prop({ required: true })
  private onlogin!: Function;

  private showPassword: boolean = false;

  private email: string = '';

  private password: string = '';

  private loading: boolean = false;

  private error: string = '';

  readonly loginRules = {
    required: (value: any) => !!value || '必須項目です',
    min: (value: any) => value.length >= 8 || '8文字以上を入力してください',
    regex_email: (value: any) => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value) || 'emailで使える文字を使用下さい',
  };

  get disableLoginAction() {
    return this.loading;
  }

  private resetError() {
    this.error = '';
  }

  private async handleClick() {
    if (this.disableLoginAction) { return; }

    this.loading = true;
    this.error = '';

    await this.$nextTick(() => {
      this.onlogin({ email: this.email, password: this.password });
      this.loading = false;
    });
  }
}
</script>
