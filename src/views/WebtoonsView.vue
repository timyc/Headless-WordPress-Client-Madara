<script setup lang="ts">
import NavBar from "@/components/bars/NavBar.vue";
import Cookies from '@/components/misc/Cookies.vue';
import AllGenres from '@/components/misc/AllGenres.vue';
import WebtoonsScroller from '@/components/WebtoonsScroller.vue';
import { useTitle } from '@vueuse/core';
useTitle(`All Webtoons - ${import.meta.env.VITE_NAME}`);
</script>

<template>
  <div class="app-container with-navbar">
    <NavBar />
    <div class="category-list">
      <div class="classify-list-container border-box">
        <AllGenres />
        <WebtoonsScroller />
      </div>
    </div>

    <Cookies />
  </div>
</template>

<style scoped>
.app-container.with-navbar {
  padding-top: 3.75rem;
}
.app-container .cookie-wrapper {
    bottom: 0;
    left: 0;
    z-index: 10;
}
</style>