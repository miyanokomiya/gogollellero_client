<template>
  <v-layout>
    <v-flex text-xs-center>
      <v-btn 
        icon 
        ripple
        @click="create">
        <v-icon color="grey lighten-1">add</v-icon>
      </v-btn>
      <div class="my-tags">
        <v-chip 
          v-for="tag in tags" 
          :key="tag.id" 
          :color="tagTitle === tag.title ? 'red' : 'green'"
          text-color="white"
          small
          @click="selectTag(tag)"
        >
          {{ tag.title }}
        </v-chip>
      </div>
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
            color="orange"
            @click="deletePost(post.id)">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from '@/commons/axios'

export default {
  asyncData({ query }) {
    return { tagTitle: query.tag || '' }
  },
  data: () => ({
    posts: [],
    tags: []
  }),
  watchQuery: ['tag'],
  watch: {
    tagTitle() {
      this.load()
    }
  },
  mounted() {
    this.load()
  },
  methods: {
    load() {
      axios
        .get(`/private/posts`, {
          params: { tag: this.tagTitle || undefined }
        })
        .then(({ data }) => {
          this.posts = data
        })
        .catch(console.log)
      axios
        .get(`/private/tags`)
        .then(({ data }) => {
          this.tags = data
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
    },
    selectTag(tag) {
      if (this.tagTitle === tag.title) {
        this.$router.push(`/posts`)
      } else {
        this.$router.push(`/posts?tag=${tag.title}`)
      }
    }
  }
}
</script>

<style scoped>
.my-tags {
  margin-bottom: 1rem;
}
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
