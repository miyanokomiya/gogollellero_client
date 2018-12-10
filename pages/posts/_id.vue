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
        <!-- <div class="tags">
          <v-chip 
            v-for="(title, i) in tags" 
            :key="i" 
            close
            color="green"
            text-color="white"
            small
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
        /> -->
        <v-combobox
          v-model="tags"
          :items="tagOptions"
          :search-input.sync="searchTagText"
          :rules="tagRules"
          chips
          deletable-chips
          multiple
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
import marked from 'marked'
import 'github-markdown-css/github-markdown.css'

export default {
  data: () => ({
    post: null,
    localPost: null,
    valid: true,
    titleRules: [v => !!v || 'required', v => v.length <= 64 || 'title <= 64'],
    tags: [],
    tagRules: [v => v.length <= 64 || 'title <= 64'],
    tagOptions: [],
    searchTagText: '',
    searchTimer: 0
  }),
  computed: {
    markedPorblem() {
      return marked(this.localPost.problem)
    }
  },
  watch: {
    searchTagText(to, from) {
      if (to === from) return
      if (this.searchTimer) clearTimeout(this.searchTimer)
      if (this.changeTagInput(to)) return
      this.searchTimer = setTimeout(() => {
        console.log('search', to)
        this.searchTimer = 0
      }, 300)
    }
  },
  mounted() {
    axios
      .get(`/private/posts/${this.$route.params.id}`)
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
  text-align: left;
}
.tags {
  text-align: left;
}
.editor-box {
  display: flex;
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
