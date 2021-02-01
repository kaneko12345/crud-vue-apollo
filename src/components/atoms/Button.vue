<template>
  <v-btn
    :class="classes"
    :disableed="disabled"
    :loading="loading"
    @click="handleClick"
  >
    <slot />
  </v-btn>
</template>

<script lang="ts">
import {
  Component, Vue, Prop, Emit,
} from 'vue-property-decorator';
  @Component({})

export default class Button extends Vue {
@Prop({ default: false, required: true })
private disabled!: Boolean;

@Prop({ default: 'button', required: true })
private type!: String;

@Prop({ default: false, required: true })
private loading!: Boolean;

@Emit('click')
// eslint-disable-next-line class-methods-use-this
private handleClick(ev: any) {
}

get classes() {
  const cls = this.type === 'text' ? (` - ${this.type}`) : '';
  return [`kbt-button${cls}`];
}
}
</script>
