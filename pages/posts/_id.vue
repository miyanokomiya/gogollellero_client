<template>
  <v-layout v-if="localPost">
    <v-flex text-xs-center>
      <v-form 
        ref="form"
        v-model="valid" 
        lazy-validation
        @submit.prevent
      >
        <h2>Title</h2>
        <v-text-field
          v-model="localPost.title"
          :rules="titleRules"
          :counter="64"
          required
          autofocus
        />
        <h2>Tags</h2>
        <div class="tags">
          <v-chip 
            v-for="(title, i) in tags" 
            :key="i" 
            close
            color="green"
            text-color="white"
            @input="deleteTag(title)"
          >
            {{ title }}
          </v-chip>
        </div>
        <v-text-field
          :value="tagInput"
          :rules="tagRules"
          :counter="64"
          @input="changeTagInput"
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
          :disabled="!valid"
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
    titleRules: [v => !!v || 'required', v => v.length <= 64 || 'title <= 64'],
    tags: [],
    tagInput: '',
    tagRules: [v => v.length <= 64 || 'title <= 64']
  }),
  mounted() {
    axios
      .get(`${API_HOST}/private/posts/${this.$route.params.id}`)
      .then(({ data }) => {
        this.updateData(data)
      })
      .catch(console.log)
  },
  methods: {
    deleteTag(title) {
      this.tags = this.tags.filter(tag => tag !== title)
    },
    changeTagInput(val) {
      const splited = val.split(/,| |　|\t/)
      if (splited.length > 1 && splited[0].length <= 64) {
        if (!this.tags.includes(splited[0])) {
          this.tags.push(splited[0])
        }
        this.tagInput = ''
      } else {
        this.tagInput = val
      }
    },
    updateData(data) {
      this.post = data
      this.localPost = { ...data }
      this.tags = data.tags.map(tag => tag.title)
    },
    submit() {
      axios
        .patch(`${API_HOST}/private/posts/${this.post.id}`, {
          title: this.localPost.title,
          problem: this.localPost.problem,
          solution: this.localPost.solution,
          lesson: this.localPost.lesson,
          tags: this.tags
        })
        .then(({ data }) => {
          this.updateData(data)
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
.tags {
  text-align: left;
}
</style>
