<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-card>
      <v-container>
        <h2 v-show="isCreate">wineを追加する</h2>
        <h2 v-show="!isCreate">wineを更新する</h2>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="wine.title"
            :rules="[titleRules.required]"
            label="title"
            required
          ></v-text-field>
          <v-textarea
            v-model="wine.description"
            auto-grow
            label="description"
          >
          </v-textarea>
          <v-img
            v-show="this.wine.thumbnail.url"
            :src="this.wine.thumbnail.url"
            aspect-ratio="2"
            contain/>
          <v-file-input
            v-model="input_image"
            accept="image/*"
            show-size
            label="画像ファイルをアップロードしてください"
            prepend-icon="mdi-image"
            @change="onImagePicked"
            webkitdirectory
          ></v-file-input>
          <v-text-field
            v-model="wine.type"
            :rules="[titleRules.required]"
            label="type"
            required
          ></v-text-field>
          <v-text-field
            v-model="wine.grapeType"
            :rules="[titleRules.required]"
            label="grapeType"
            required
          ></v-text-field>
          <v-menu
            v-model="menu"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-show="isCreate"
                v-model="nowDate"
                label="drinkDate"
                prepend-icon="mdi-calendar"
                v-on="on"
                readonly
              ></v-text-field>
              <v-text-field
                v-show="!isCreate"
                v-model="applyDate"
                label="drinkDate"
                prepend-icon="mdi-calendar"
                v-on="on"
                readonly
              ></v-text-field>
            </template>
              <v-date-picker
                v-show="isCreate"
                v-model="nowDate"
                @input="menu = false"
                no-title
                scrollable>
              </v-date-picker>
            <v-date-picker
              v-show="!isCreate"
              v-model="applyDate"
              @input="menu = false"
              no-title
              scrollable>
            </v-date-picker>
          </v-menu>
          <v-btn
            v-show="isCreate"
            :disabled="!valid"
            @click="createWine"
          >
            追加
          </v-btn>
          <v-btn
            v-show="!isCreate"
            :disabled="!valid"
            @click="updateWine"
          >
            更新
          </v-btn>
          <v-btn @click="clear">クリア</v-btn>
        </v-form>
      </v-container>
    </v-card>
</template>

<script lang="ts">
import {
  Component, Vue, Prop, Emit,
} from 'vue-property-decorator';
import { CREATE_WINE, UPDATE_WINE } from '@/constans/wine-mutation';
import { IType, IWines } from '@/constans/types/wineType';
import appModule from '@/store/modules';
import { ALL_WINES } from '@/constans/wine-query';
import { ImageResponse } from '@/common/types/baseType';

@Component({
  apollo: {
    wines: {
      query: ALL_WINES,
    },
  },
})

export default class Form extends Vue {
  @Prop({ required: true })
  private wine!: IType;

  @Prop()
  private dialog!: boolean;

  @Prop()
  private isCreate!: boolean;

  @Emit('change-dialog')
  // eslint-disable-next-line class-methods-use-this
  private changeDialog(): void {}

  private progress: boolean = false;

  private image_upload_response = {} as ImageResponse;

  $refs!: {
    form: HTMLFormElement;
  };

  private input_image: {} | null = null;

  private valid: boolean = true;

  readonly titleRules = {
    required: (value: any) => !!value || '必須項目です',
  };

  private nowDate = this.$moment(new Date()).format('YYYY-MM-DD');

  private applyDate = this.$moment(this.wine.drinkDate).format('YYYY-MM-DD');

  private menu: boolean = false;

  private onImagePicked(file: Blob) {
    if (file !== undefined && file !== null) {
      if (file.name.lastIndexOf('.') <= 0) {
        return;
      }
      const fr = new FileReader();
      fr.readAsDataURL(file);
      fr.addEventListener('load', () => {
        this.wine.thumbnail.url = fr.result;
      });
    } else {
      this.wine.thumbnail.url = '';
    }
    console.log(this.input_image);
  }

  private async createWine() {
    const uniqueIdentifier = this.uid;
    const formData = new FormData();
    // eslint-disable-next-line global-require
    const qs = require('qs');

    formData.append('fileUpload', this.input_image!);
    const queryparams = qs.stringify({
      key: process.env.CMS_KEY,
      path: `${process.env.CMS_PATH}/${uniqueIdentifier}_${this.input_image!.name}`,
    });
    console.log(queryparams);
    try {
      if (this.input_image !== '') {
        this.image_upload_response = await Vue.$fetch.post(
          'https://www.filestackapi.com/api/store/S3?',
          formData,
          queryparams,
        );
        console.log(this.image_upload_response);
      }
      if (this.$refs.form.validate()) {
        this.progress = true;
        await this.$apollo.mutate<IWines>({
          mutation: CREATE_WINE,
          variables: {
            title: this.wine.title,
            description: this.wine.description,
            grapeType: this.wine.grapeType,
            type: this.wine.type,
            drinkDate: this.nowDate,
            handle: this.image_upload_response.url,
            fileName: this.image_upload_response.fileName,
            size: this.image_upload_response.size,
            mimeType: this.image_upload_response.type,
          },
        });
        await this.$apollo.queries.wines.fetchMore({
          updateQuery: (previousResult, { fetchMoreResult }) => ({
            wines: fetchMoreResult.wines,
          }),
        });
        this.changeDialog();
        this.progress = false;
        appModule.setSnackbarMessage('作成しました');
        appModule.showSnackbar('success');
      }
    } catch (err) {
      appModule.setSnackbarMessage(err);
      appModule.showSnackbar('error');
    }
  }

  private async updateWine() {
    try {
      this.progress = true;
      await this.$apollo.mutate<IWines>({
        mutation: UPDATE_WINE,
        variables: {
          id: this.wine.id,
          title: this.wine.title,
          description: this.wine.description,
          grapeType: this.wine.grapeType,
          type: this.wine.type,
          drinkDate: this.applyDate,
        },
      });
      await this.$apollo.queries.wines.fetchMore({
        updateQuery: (previousResult, { fetchMoreResult }) => ({
          wines: fetchMoreResult.wines,
        }),
      });
      this.changeDialog();
      this.progress = false;
      appModule.setSnackbarMessage('更新しました');
      appModule.showSnackbar('success');
    } catch (err) {
      appModule.setSnackbarMessage(err);
      appModule.showSnackbar('error');
    }
  }

  private clear() {
    this.$refs.form.reset();
  }
}
</script>
