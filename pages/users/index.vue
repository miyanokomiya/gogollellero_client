<template>
  <v-layout>
    <v-flex text-xs-center>
      <v-list 
        two-line 
        subheader>
        <v-subheader inset>Users</v-subheader>

        <v-list-tile
          v-for="user in users"
          :key="user.name"
        >
          <v-list-tile-content>
            <v-list-tile-title>{{ user.name }}</v-list-tile-title>
            <v-list-tile-sub-title>{{ user.createdAt }}</v-list-tile-sub-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-btn 
              icon 
              ripple>
              <v-icon color="grey lighten-1">info</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile> 
      </v-list>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from '@/commons/axios'

export default {
  data: () => ({
    users: []
  }),
  mounted() {
    axios
      .get(`/private/users`)
      .then(({ data }) => {
        this.users = data
      })
      .catch(console.log)
  }
}
</script>

<style scoped>
</style>
