import {
  Module, VuexModule, Mutation, Action, getModule,
} from 'vuex-module-decorators';
import store from '@/store';

@Module({ dynamic: true, store, name: 'app' })
class App extends VuexModule {
  shrinkNavigation = false;

  drawerNavigation = true;

  snackbar: boolean = false;

  snackbarColor: string = 'success';

  snackbarMessage: string = '';

  @Mutation
  showSnackbar(color: string) {
    this.snackbar = true;
    this.snackbarColor = color;
  }

  @Mutation
  setSnackbarMessage(message: string) {
    this.snackbarMessage = message;
  }

  @Mutation
  hideSnackbar() {
    this.snackbar = false;
  }

  @Mutation
  setShrinkNavigation(value: boolean) {
    this.shrinkNavigation = value;
  }

  @Mutation
  setDrawerNavigation(value: boolean) {
    if (!value) {
      this.shrinkNavigation = false;
    }
    this.drawerNavigation = value;
  }

  @Action({ commit: 'setShrinkNavigation' })
  toggleShrinkNavigation() {
    return !this.isShrinkNavigation;
  }

  get isDrawerNavigation() {
    return this.drawerNavigation;
  }

  get isShrinkNavigation() {
    return this.shrinkNavigation;
  }

  get isSnackbarDisplayed() {
    return this.snackbar;
  }

  get snackbarDisplayColor() {
    return this.snackbarColor;
  }

  get snackbarDisplayMessage() {
    return this.snackbarMessage;
  }
}

export default getModule(App);
