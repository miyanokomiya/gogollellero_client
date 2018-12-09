<template>
  <v-layout
    column
    justify-center
    align-center>
    <v-flex
      xs12
      sm8
      md6>
      <div class="text-xs-center">
        <logo/>
        <vuetify-logo/>
      </div>
      <v-card>
        <router-link to="/signin">signin</router-link>
        <router-link to="/signup">signup</router-link>
        <router-link to="/users">users</router-link>
        <router-link to="/posts">posts</router-link>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  components: {
    Logo,
    VuetifyLogo
  }
}
</script>
