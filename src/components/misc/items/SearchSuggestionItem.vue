<script setup lang="ts">

type searchT = {
    title: string,
    url: string,
}
defineProps<{
  searchResult: searchT;
}>();

</script>

<template>
    <div :title="searchResult.title"
        class="suggestion-item pointer t-no-wrap t-over-hidden border-box a-move-in-bottom" style="height: 30px;" @click="$router.push('/read/' + searchResult.url)">
        {{ searchResult.title }}
    </div>
</template>

<style scoped>
.suggestion-item {
    height: 32px;
    background-color: #0b0b0b;
    padding-left: 10px;
}

</style>