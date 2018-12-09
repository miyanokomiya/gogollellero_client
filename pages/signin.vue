<template>
  <v-layout>
    <v-flex text-xs-center>
      <v-form 
        ref="form"
        v-model="valid" 
        lazy-validation>
        <v-text-field
          v-model="name"
          :rules="nameRules"
          label="Name"
          required
        />
        <v-text-field
          v-model="password"
          :rules="passwordRules"
          label="Password"
          required
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
          .post(`${API_HOST}/login`, {
            username: this.name,
            password: this.password
          })
          .then(res => {
            console.log(res)
          })
      }
    }
  }
}
</script>

<style>
form {
  width: 20rem;
}
</style>
