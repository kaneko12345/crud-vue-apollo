<template>
  <v-card>
    <v-card-title>
      <span>Wine情報</span>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" width="600px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" class="mb-2" v-on="on" @click="showDialogNew">
            <v-icon>mdi-plus-circle-outline</v-icon>追加</v-btn>
        </template>
        <Form
          :dialog="dialog"
          :isCreate="isCreate"
          :wine="createDefaultWine"
          @change-dialog="changeDialog"
        />
      </v-dialog>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="wines"
      no-data-text="登録されておりません。"
      class="elevation-1"
    >
      <template v-slot:item.thumbnail.url="{ item }">
        <v-img :src="item.thumbnail.url" aspect-ratio="0.5" contain/>
      </template>
      <template v-slot:item.action="{ item }">
        <td class="justify-end layout px-0">
          <v-btn
            class="ma-2"
            color="success"
            small
            outlined
            @click="showDialogUpdate(
            item.id,
            item.title,
            item.description,
            item.thumbnail.url,
            item.type,
            item.drinkDate,
            item.grapeType
            )">
            <v-icon small>
              mdi-pencil
            </v-icon>
          </v-btn>
          <v-btn
            class="ma-2"
            color="error"
            small
            @click="deleteWine(item.title, item.id)"
          >
            <v-icon small>
              mdi-delete
            </v-icon>
          </v-btn>
        </td>
      </template>
    </v-data-table>
    <v-progress-linear slot="progress" color="blue" indeterminate>
    </v-progress-linear>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Form from '@/components/molecules/Form.vue';
import { ALL_WINES } from '@/constans/wine-query';
import { ICustomerType } from '@/common/types/customerType';
import { Pagination } from '@/common/types/baseType';
import { IType, IWineType } from '@/constans/types/wineType';
import { DELETE_WINE } from '@/constans/wine-mutation';
import appModule from '@/store/modules';

@Component({
  apollo: {
    wines: {
      query: ALL_WINES,
    },
  },
  components: {
    Form,
  },
})

export default class CustomerTable extends Vue {
  private wines!: IWineType;

  private progress: boolean = false;

  private isCreate: boolean = true;

  private dialog: boolean = false;

  private headers = [
    { text: '', value: 'thumbnail.url', sortable: true } as ICustomerType,
    { text: '名前', value: 'title', sortable: true } as ICustomerType,
    { text: '概要', value: 'description', sortable: true } as ICustomerType,
    { text: 'ぶどうの品種', value: 'grapeType', sortable: true } as ICustomerType,
    { text: '種類', value: 'type', sortable: true } as ICustomerType,
    { text: '飲んだ日', value: 'drinkDate', sortable: true } as ICustomerType,
    { text: '追加日', value: 'createdAt', sortable: true } as ICustomerType,
    { text: '', value: 'action', sortable: false } as ICustomerType,
  ];

  private createDefaultWine = {
    thumbnail: { url: '' },
  } as IType;

  private pagination = {
    descending: true,
    rowsPerPage: 10,
  } as Pagination;

  private showDialogNew() {
    this.isCreate = true;
    this.dialog = true;
    this.createDefaultWine = {
      id: '',
      title: '',
      description: '',
      thumbnail: { url: '' },
      drinkDate: '',
      type: '',
      grapeType: '',
    };
  }

  private showDialogUpdate(
    id: string,
    title: string,
    description: string,
    thumbnail: string,
    type: string,
    drinkDate: string,
    grapeType: string,
  ) {
    const uniqueIdentifier = this.uid;
    this.createDefaultWine.id = id;
    this.createDefaultWine.title = title;
    this.createDefaultWine.description = description;
    this.createDefaultWine.thumbnail.url = thumbnail;
    this.createDefaultWine.type = type;
    this.createDefaultWine.drinkDate = drinkDate;
    this.createDefaultWine.grapeType = grapeType;
    this.dialog = true;
    this.isCreate = false;
  }

  private async deleteWine(title: string, id: string) {
    const res = await this.$dialog.confirm(`${title}を削除してもよろしいですか？`)
      .catch((error: any) => error);
    if (res) {
      this.progress = true;
      await this.$apollo.mutate<IWineType>({
        mutation: DELETE_WINE,
        variables: { id },
      });
      await this.$apollo.queries.wines.fetchMore({
        updateQuery: (previousResult, { fetchMoreResult }) => ({
          wines: fetchMoreResult.wines,
        }),
      });
      this.progress = false;
      appModule.setSnackbarMessage('削除しました');
      appModule.showSnackbar('success');
    }
  }

  private changeDialog() {
    this.dialog = false;
  }
}
</script>
