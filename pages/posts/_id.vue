<template>
  <v-layout v-if="localPost">
    <v-flex text-xs-center>
      <v-form 
        ref="form"
        v-model="valid" 
        lazy-validation>
        <h2>Title</h2>
        <v-text-field
          v-model="localPost.title"
          :rules="titleRules"
          required
        />
        <h2>Problem</h2>
        <v-textarea
          v-model="localPost.problem"
          box
          solo
          auto-grow
        />
        <h2>Solution</h2>
        <v-textarea
          v-model="localPost.solution"
          box
          solo
          auto-grow
        />
        <h2>Lesson</h2>
        <v-textarea
          v-model="localPost.lesson"
          box
          solo
          auto-grow
        />
        <v-btn
          :disjkled="!valid"
          @click="submit"
        >
          submit
        </v-btn>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from '@/commons/axios'
import { API_HOST } from '@/commons/constants'

export default {
  data: () => ({
    post: null,
    localPost: null,
    valid: true,
    titleRules: [v => !!v || 'required']
  }),
  mounted() {
    axios
      .get(`${API_HOST}/private/posts/${this.$route.params.id}`)
      .then(({ data }) => {
        this.post = data
        this.localPost = { ...data }
      })
      .catch(console.log)
  },
  methods: {
    submit() {
      axios
        .patch(`${API_HOST}/private/posts/${this.post.id}`, {
          title: this.localPost.title,
          problem: this.localPost.problem,
          solution: this.localPost.solution,
          lesson: this.localPost.lesson
        })
        .then(({ data }) => {
          console.log(data)
          this.post = data
          this.localPost = { ...data }
        })
        .catch(console.log)
    }
  }
}
</script>

<style scoped>
h2 {
  text-align: left;
}
</style>
