<template>
  <v-card>
    <a href="">
      <v-img
        class="white--text"
        height="170px"
        :src=posts.thumbnail.url
      >
      </v-img>
    </a>
    <v-card-title v-text="posts.title"></v-card-title>
    <v-card-subtitle v-text="posts.description"></v-card-subtitle>
    <v-card-text v-text="posts.content"></v-card-text>
    <v-card-actions>
      <v-btn icon class="light-blue--text">
        <v-icon medium>mdi-twitter</v-icon>
      </v-btn>
      <v-btn icon class="blue--text text--darken-4">
        <v-icon medium>mdi-facebook</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn color="blue" href="">Read more</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { IPosts } from '@/common/types/postType';

@Component({})

export default class PostCard extends Vue {
 @Prop({ required: true })
 private posts!: IPosts;
}
</script>
