<script setup lang="ts">

type genreT = {
    term_id: number,
    name: string,
    slug: string
}
defineProps<{
  genre: genreT;
}>();

</script>

<template>
    <a :href="'/webtoons?styles=' + genre.term_id" class="tag-item">{{ genre.name }}</a>
</template>