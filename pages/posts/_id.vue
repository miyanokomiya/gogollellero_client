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
          color="green"
        />
        <h2>Tags</h2>
        <v-combobox
          v-model="tags"
          :items="tagOptions"
          :search-input.sync="searchTagText"
          :rules="tagRules"
          :counter="10"
          chips
          small-chips
          color="green"
          deletable-chips
          multiple
          hide-selected
        />
        <h2>Problem</h2>
        <div class="editor-box">
          <v-textarea
            v-model="localPost.problem"
            box
            solo
            auto-grow
          />
          <div 
            class="marked markdown-body" 
            v-html="markedPorblem"/>
        </div>
        <h2>Solution</h2>
        <div class="editor-box">
          <v-textarea
            v-model="localPost.solution"
            box
            solo
            auto-grow
          />
          <div 
            class="marked markdown-body" 
            v-html="markedSolution"/>
        </div>
        <h2>Lesson</h2>
        <div class="editor-box">
          <v-textarea
            v-model="localPost.lesson"
            box
            solo
            auto-grow
          />
          <div 
            class="marked markdown-body" 
            v-html="markedLesson"/>
        </div>
        <v-btn
          :disabled="!valid"
          color="success"
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
import marked from 'marked'
import 'github-markdown-css/github-markdown.css'

export default {
  data: () => ({
    post: null,
    localPost: null,
    valid: true,
    titleRules: [v => !!v || 'required', v => v.length <= 64 || 'title <= 64'],
    tags: [],
    tagRules: [v => v.length <= 10 || 'tags <= 10'],
    tagOptions: [],
    searchTagText: '',
    searchTimer: 0
  }),
  computed: {
    markedPorblem() {
      return marked(this.localPost.problem)
    },
    markedSolution() {
      return marked(this.localPost.solution)
    },
    markedLesson() {
      return marked(this.localPost.lesson)
    }
  },
  watch: {
    searchTagText(to, from) {
      if (to === from) return
      if (this.searchTimer) clearTimeout(this.searchTimer)
      if (this.changeTagInput(to)) return
      this.searchTimer = setTimeout(() => {
        this.loadTagOptions()
        this.searchTimer = 0
      }, 300)
    }
  },
  mounted() {
    axios
      .get(`/private/posts/${this.$route.params.id}`, {
        params: {
          type: 'draft'
        }
      })
      .then(({ data }) => {
        this.updateData(data)
        this.loadTagOptions()
      })
      .catch(console.log)
  },
  methods: {
    loadTagOptions() {
      axios
        .get(`/tags`, {
          params: {
            page: 1,
            limit: 10 + this.tags.length,
            order: 'title',
            keyword: this.searchTagText
          }
        })
        .then(({ data }) => {
          this.tagOptions = data
            .map(tag => tag.title)
            .filter(tag => !this.tags.includes(tag))
        })
        .catch(console.log)
    },
    deleteTag(title) {
      this.tags = this.tags.filter(tag => tag !== title)
    },
    changeTagInput(val) {
      if (!val) return
      const splited = val.split(/,| |　|\t/)
      if (splited.length > 1 && splited[0].length <= 64) {
        if (splited[0] && !this.tags.includes(splited[0])) {
          this.tags.push(splited[0])
        }
        this.searchTagText = ''
        return true
      } else {
        this.searchTagText = val
      }
    },
    updateData(data) {
      this.post = data
      this.localPost = { ...data }
      this.tags = data.tags.map(tag => tag.title)
    },
    submit() {
      axios
        .patch(`/private/posts/${this.post.id}`, {
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
  font-size: 2rem;
  text-align: left;
}
.tags {
  text-align: left;
}
.editor-box {
  display: flex;
  margin-bottom: 1rem;
  border-bottom: 0.1rem solid rgba(100, 100, 100, 0.5);
}
.editor-box > * {
  width: 50%;
}
.marked {
  text-align: left;
  padding: 1.2rem;
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
