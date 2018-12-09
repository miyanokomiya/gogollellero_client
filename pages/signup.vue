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
          :counter="64"
          label="Name"
          required
          autofocus
        />
        <v-text-field
          v-model="password"
          :rules="passwordRules"
          :counter="64"
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
import axios from 'axios'

export default {
  data: () => ({
    valid: true,
    name: '',
    nameRules: [
      v => !!v || 'required',
      v => (4 <= v.length && v.length <= 64) || '4 <= name <= 64'
    ],
    password: '',
    passwordRules: [
      v => !!v || 'required',
      v => (8 <= v.length && v.length <= 64) || '8 <= name <= 64'
    ]
  }),
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        axios
          .post('//localhost:8080/users', {
            name: this.name,
            password: this.password
          })
          .then(res => {
            this.$router.push('/signin')
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
