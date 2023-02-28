<script setup lang="ts">

type mangaT = {
    comic_id: number,
    thumb: string,
    title: string,
    url: string,
    lupdated: string,
}
defineProps<{
    manga: mangaT;
}>();

const imageHost = import.meta.env.VITE_WORDPRESS_URL;

</script>

<template>
    <div class="manga-card-horizontal dp-i-block p-relative v-top border-box data-item">
        <a :href="'/read/' + manga.url">
            <div class="manga-cover bg-cover bg-center bg-no-repeat"
                :style="`background-image: url(${imageHost}/wp-content/uploads/` + manga.thumb + ');'"></div>
        </a>
        <div class="text-section h-100 p-absolute border-box">
            <a :href="'/read/' + manga.url">
                <h2 class="manga-title" :title="manga.title">
                    {{ manga.title }}
                </h2>
            </a>
            <div class="footer-text w-100 border-box t-left">
                <div class="text"></div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.manga-card-horizontal .manga-cover {
    width: 4.16667rem;
    height: 5.58333rem;
    background-color: #111;
    border-radius: 4px;
}

.manga-card-horizontal .text-section {
    width: calc(100% - 4.16667rem);
    padding: 0 8px;
    top: 0;
    left: 4.16667rem;
}

.manga-card-horizontal .text-section .manga-title {
    font-family: SF Pro Text;
    font-style: normal;
    font-weight: 500;
    line-height: 17px;
    max-height: 34px;
    margin: 0;
    font-size: 14px;
    white-space: pre-line;
    color: #ddd;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}

.manga-card-horizontal .text-section .footer-text {
    margin: .66667rem 0 0;
    font-size: 13px;
    color: rgba(255, 255, 255, .7);
    line-height: 1.6;
}

.manga-card-horizontal .text-section .footer-text .text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>