<template>
  <div class="app-container">
    <router-view />
    <TabBar v-if="showTabBar" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import TabBar from './components/TabBar.vue'

const route = useRoute()
const showTabBar = computed(() => !['login', 'register'].includes(route.name as string))
</script>

<style lang="scss">
@use "@/styles/variables.scss" as *;
@use "@/styles/icons.scss" as *;

.app-container {
  min-height: 100vh;
  background-color: $background-color;
}
</style>
