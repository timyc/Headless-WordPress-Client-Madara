<script setup lang="ts">

type searchT = {
    title: string,
    url: string,
    thumb: string,
}
defineProps<{
  searchResult: searchT;
}>();

const imageHost = import.meta.env.VITE_WORDPRESS_URL;

</script>

<template>
    <a class="manga-card-result dp-i-block p-relative dp-flex border-box data-item" :href="'/read/' + searchResult.url">
        <div role="img" class="manga-cover bg-cover bg-center bg-no-repeat" :style="`background-image: url(${imageHost}/wp-content/uploads/` + searchResult.thumb + ');'"></div>
        <div class="text-section p-relative border-box">
            <div class="manga-title t-no-wrap t-over-hidden">
                {{ searchResult.title }}
            </div>
        </div>
    </a>
</template>

<style scoped>
.data-item {
    width: 100%;
    padding: .66667rem 1.33333rem;
}
.manga-card-result .manga-cover {
    width: 6.5rem;
    padding-top: 8.666666666666666rem;
    background-color: #111;
    border-radius: .33333rem;
    flex-shrink: 0;
}
.manga-card-result .text-section {
    padding: 0 1rem;
    flex-grow: 1;
    overflow: hidden;
}
.manga-card-result .text-section .manga-title {
    margin: 0;
    font-weight: 600;
    font-size: 16px;
    color: #e3e3e0;
    white-space: pre-line;
    line-height: 20px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
</style>