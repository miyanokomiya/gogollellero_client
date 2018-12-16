<template>
  <v-layout>
    <v-flex text-xs-center>
      <v-btn 
        icon 
        ripple
        color="blue"
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
      <v-tabs
        v-model="typeTab"
        color="cyan"
        dark
        slider-color="yellow"
      >
        <v-tab 
          ripple 
        >
          Draft
        </v-tab>
        <v-tab 
          ripple 
        >
          Published
        </v-tab>
      </v-tabs>
      <v-card
        v-for="post in posts"
        :key="post.name"
        class="item"
      >
        <v-card-title 
          primary-title 
          class="title-box">
          <router-link :to="{ name: 'mypage-posts-id', params: { id: post.postParent.id }}">
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
    return { tagTitle: query.tag || '', type: query.type || 'draft' }
  },
  data: () => ({
    posts: [],
    tags: [],
    tagTitle: '',
    type: 'draft'
  }),
  computed: {
    typeTab: {
      get() {
        return ['draft', 'published'].indexOf(this.type)
      },
      set(val) {
        this.type = val === 0 ? 'draft' : 'published'
        this.updateQuery()
      }
    }
  },
  mounted() {
    this.load()
  },
  methods: {
    load() {
      axios
        .get(`/private/posts`, {
          params: { tag: this.tagTitle || undefined, type: this.type }
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
          this.$router.push({
            name: 'mypage-posts-id',
            params: { id: data.postParent.id }
          })
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
        this.tagTitle = ''
      } else {
        this.tagTitle = tag.title
      }
      this.updateQuery()
    },
    updateQuery() {
      this.$router.push({
        name: 'mypage-posts',
        query: { type: this.type, tag: this.tagTitle }
      })
      this.load()
    }
  }
}
</script>

<style scoped>
.my-tags {
  margin-bottom: 1rem;
  text-align: left;
}
.item {
  text-align: left;
  border-bottom: 0.1rem solid rgba(200, 200, 200, 0.3);
}
.title-box a {
  text-decoration: none;
  width: 100%;
  padding: 0.6rem;
  cursor: pointer;
}
.title-box a:hover {
  background-color: rgba(200, 200, 200, 0.3);
}
.title-box {
  padding: 0.6rem;
}
</style>
