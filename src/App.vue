<template>
  <div id="app">
    <navBar />

    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import navBar from './components/navBar.vue';
</script>

<style scoped>
#app {
  position: relative;
  min-height: 100vh;
}
</style>
