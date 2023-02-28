<script setup lang="ts">
import BookmarkButton from './items/BookmarkButton.vue';
import ShareButton from './items/ShareButton.vue';
defineProps<{
  topBarBG: boolean,
  title: string,
  bmChap: number,
  bmToon: number,
}>();
</script>

<template>
    <nav :class="['navbar-container', 'navbar', 'w-100', 'p-fixed', 'p-zero', {'has-back': !topBarBG}]">
        <div class="size-ruler align-center m-auto t-center dp-flex">
            <div class="menu f-left">
                <BookmarkButton :bmChap="bmChap" :bmToon="bmToon" />
            </div>
            <div class="comic-title" :style="{display: topBarBG ? 'none' : 'block'}">
                {{ title }}
            </div>
            <div class="menu f-right">
                <ShareButton />
            </div>
        </div>
    </nav>
</template>

<style scoped>
.navbar-container {
    height: 3.5rem;
    background: transparent;
    font-size: 1.25rem;
    line-height: 3.5rem;
    transition: background .3s;
}
.navbar-container.has-back {
    background: #000;
    border-bottom: 1px solid #222;
    transition: background .3s;
}
.app-container .navbar {
    z-index: 69;
}
.navbar-container .size-ruler {
    max-width: 50rem;
    justify-content: space-between;
}
.navbar-container .size-ruler .menu {
    box-sizing: border-box;
    max-height: 45px;
    padding: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.navbar-container .size-ruler .comic-title {
    flex: 1;
    color: #e3e2e0;
    font-size: 1.33333rem;
    line-height: 4rem;
    margin-left: 4rem;
    margin-right: 1.66667rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>