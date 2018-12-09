<template>
  <v-app dark>
    <v-toolbar
      fixed
      app
    >
      <v-toolbar-title v-text="'Gogollellero'"/>
      <v-btn
        icon
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>menu</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer
      fixed
      app
    >
      <span>&copy; 2018</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>

<style>
html {
  font-size: 62.5%; /*ベースを10px*/
}
</style>
