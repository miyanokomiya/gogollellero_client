<template>
  <v-layout>
    <v-flex text-xs-center>
      <v-btn 
        icon 
        ripple
        @click="create">
        <v-icon color="grey lighten-1">add</v-icon>
      </v-btn>
      <v-list 
        two-line 
        subheader>
        <v-subheader inset>Posts</v-subheader>

        <v-list-tile
          v-for="post in posts"
          :key="post.name"
          class="item"
        >
          <v-list-tile-content>
            <router-link :to="`/posts/${post.id}`">
              <v-list-tile-title>{{ post.title }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ post.createdAt }}</v-list-tile-sub-title>
            </router-link>
          </v-list-tile-content>
        </v-list-tile> 
      </v-list>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from '@/commons/axios'
import { API_HOST } from '@/commons/constants'

export default {
  data: () => ({
    posts: []
  }),
  mounted() {
    axios
      .get(`${API_HOST}/private/posts`)
      .then(({ data }) => {
        this.posts = data
      })
      .catch(console.log)
  },
  methods: {
    create() {
      axios
        .post(`${API_HOST}/private/posts`, {
          title: 'untitled'
        })
        .then(({ data }) => {
          this.$router.push(`/posts/${data.id}`)
        })
        .catch(console.log)
    }
  }
}
</script>

<style scoped>
.item:hover {
  background-color: rgba(200, 200, 200, 0.3);
}
</style>
