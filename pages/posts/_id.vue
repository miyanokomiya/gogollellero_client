<template>
  <v-layout v-if="post">
    <v-flex text-xs-center>
      <div>
        <h1>{{ post.title }}</h1>
        <div class="tags">
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
        <h2>Problem</h2>
        <div 
          class="marked markdown-body" 
          v-html="markedPorblem"/>
        <h2>Solution</h2>
        <div 
          class="marked markdown-body" 
          v-html="markedSolution"/>
        <h2>Lesson</h2>
        <div 
          class="marked markdown-body" 
          v-html="markedLesson"/>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from '@/commons/axios'
import marked from 'marked'
import 'github-markdown-css/github-markdown.css'

export default {
  data: () => ({
    post: null
  }),
  computed: {
    markedPorblem() {
      return marked(this.post.problem)
    },
    markedSolution() {
      return marked(this.post.solution)
    },
    markedLesson() {
      return marked(this.post.lesson)
    }
  },
  mounted() {
    axios
      .get(`/posts/${this.$route.params.id}`)
      .then(({ data }) => {
        this.post = data
      })
      .catch(console.log)
  }
}
</script>

<style scoped>
h1 {
  font-size: 2.4rem;
  text-align: left;
}
h2 {
  font-size: 2rem;
  text-align: left;
  margin-top: 1rem;
}
.tags {
  text-align: left;
  margin-top: 0.6rem;
  border-bottom: 0.1rem solid rgba(100, 100, 100, 0.5);
}
.marked {
  text-align: left;
  padding: 1.2rem;
  margin-bottom: 1rem;
  border-bottom: 0.1rem solid rgba(100, 100, 100, 0.5);
}
.marked /deep/ code {
  box-shadow: none;
  font-family: monospace, monospace;
  font-size: 1em;
}
.marked /deep/ code::before {
  content: '';
}
</style>
