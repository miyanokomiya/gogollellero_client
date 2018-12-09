<template>
  <v-layout>
    <v-flex>
      <v-form 
        ref="form"
        v-model="valid" 
        lazy-validation
        @submit.prevent="submit"
      >
        <v-text-field
          v-model="name"
          :rules="nameRules"
          label="Name"
          required
          autofocus
        />
        <v-text-field
          v-model="password"
          :rules="passwordRules"
          label="Password"
          type="password"
          required
        />
        <div class="buttons">
          <v-btn
            :disabled="!valid"
            type="submit"
          >
            submit
          </v-btn>
        </div>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from '@/commons/axios'

export default {
  data: () => ({
    valid: true,
    name: '',
    nameRules: [v => !!v || 'required'],
    password: '',
    passwordRules: [v => !!v || 'required']
  }),
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        axios
          .post(`/login`, {
            username: this.name,
            password: this.password
          })
          .then(res => {
            this.$router.push('/posts')
          })
      }
    }
  }
}
</script>

<style scoped>
form {
  width: 20rem;
  margin: 2rem auto;
}
.buttons {
  text-align: right;
}
</style>
