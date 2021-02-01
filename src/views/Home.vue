<template>
  <v-container>
    <CustomerTable/>
    <v-row>
      <v-col
        v-for="post in posts"
        :key="post.id"
        xs="12"
        sm="6"
        md="4"
      >
        <PostCard
          :posts=post
        ></PostCard>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';// @ is an alias to /src
import Title from '@/components/atoms/Title.vue';
import CustomerTable from '@/components/molecules/WineTable.vue';
import PostCard from '@/components/atoms/PostCard.vue';
import { ALL_POSTS } from '@/constans/post-query';
import { IPostType } from '@/constans/types/postType';

@Component({
  components: {
    Title,
    CustomerTable,
    PostCard,
  },
  apollo: {
    posts: {
      query: ALL_POSTS,
    },
  },
})

export default class Home extends Vue {
  private posts!: IPostType
}
</script>
