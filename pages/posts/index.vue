<template>
  <v-layout>
    <v-flex text-xs-center>
      <v-btn 
        icon 
        ripple
        @click="create">
        <v-icon color="grey lighten-1">add</v-icon>
      </v-btn>
      <v-card
        v-for="post in posts"
        :key="post.name"
        class="item"
      >
        <v-card-title 
          primary-title 
          class="title-box">
          <router-link :to="`/posts/${post.id}`">
            <h3 class="headline mb-0 title">{{ post.title }}</h3>
            <div>{{ post.createdAt }}</div>
            <div 
              v-if="post.tags" 
              class="tags"
            >
              <v-chip 
                v-for="tag in post.tags" 
                :key="tag.id" 
                color="green"
                text-color="white"
                small
              >
                {{ tag.title }}
              </v-chip>
            </div>
          </router-link>
        </v-card-title>
        <v-card-actions>
          <v-btn 
            flat 
            color="orange">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from '@/commons/axios'

export default {
  data: () => ({
    posts: []
  }),
  mounted() {
    this.load()
  },
  methods: {
    load() {
      axios
        .get(`/private/posts`)
        .then(({ data }) => {
          this.posts = data
        })
        .catch(console.log)
    },
    create() {
      axios
        .post(`/private/posts`, {
          title: 'untitled'
        })
        .then(({ data }) => {
          this.$router.push(`/posts/${data.id}`)
        })
        .catch(console.log)
    },
    deletePost(id) {
      axios
        .delete(`/private/posts/${id}`)
        .then(({ data }) => {
          this.load()
        })
        .catch(console.log)
    }
  }
}
</script>

<style scoped>
.item {
  text-align: left;
}
.title-box a {
  text-decoration: none;
}
.title-box:hover {
  cursor: pointer;
  background-color: rgba(200, 200, 200, 0.3);
}
</style>
