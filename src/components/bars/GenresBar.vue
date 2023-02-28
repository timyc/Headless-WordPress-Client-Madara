<script lang="ts">
import { defineComponent } from "vue";
import Ambassador from '@/helpers/ambassador';
import GenreItem from '@/components/misc/items/GenreItem.vue';
export default defineComponent ({
    components: {
        GenreItem
    },
    data() {
        return {
            genres: [],
            error: false,
            loading: true,
        }
    },
    mounted() {
        Ambassador.getGenreLists()
        .then((response) => {
          this.genres = response.data.data.genres;
        })
        .catch((error) => {
          console.log("sorry there was an error " + error);
          this.error = true;
        })
        .finally(() => (this.loading = false));
    }
});
</script>

<template>
    <div class="tags-wrapper p-relative">
        <div class="tags-list t-no-wrap">
            <GenreItem v-for="(item, index) in genres" :key="index" :genre="item" />
        </div>
        <a href="/webtoons" class="more-btn dp-block">
            <span class="v-middle bg-black">
                All Webtoons
            </span>
            <span class="more-icon dp-i-block v-middle bg-black"></span>
        </a>
    </div>
</template>

<style scoped>
.tags-wrapper .tags-list {
    font-family: PingFang SC;
    font-size: 1.16667rem;
    padding: 1rem 9.16667rem 1rem 1.33333rem;
    margin-right: 1.66667rem;
    overflow-y: hidden;
    overflow-x: scroll;
    scrollbar-width: none;
    -ms-overflow-style: none;
}
.tags-wrapper .tags-list .tag-item {
    margin-right: 16px;
}
.bg-black {
    background-color: #000;
}
.tags-wrapper .more-btn .more-icon {
    width: 1.33333rem;
    height: 1.33333rem;
    background-image: url(data:image/svg+xml;base64,PHN2ZyBkYXRhLW5hbWU9Im1hYnlzc2d0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiI+PHBhdGggZD0iTTUuNTggMy40MmEuNTkuNTkgMCAwMS44NC0uODRsNSA1YS41OC41OCAwIDAxMCAuODRsLTUgNWEuNTkuNTkgMCAwMS0uODQtLjg0TDEwLjE1IDh6IiBmaWxsPSIjOEUwNUMyIi8+PC9zdmc+);
}
.tags-wrapper .more-btn:before {
    display: inline-block;
    vertical-align: middle;
    content: "";
    width: 3.33333rem;
    height: 1.66667rem;
    background: linear-gradient(270deg,#000 32.14%,hsla(0,0%,0%,.391) 67.36%,hsla(0,0%,100%,0));
}
.tags-wrapper .tags-list::-webkit-scrollbar {
    display: none;
}
.tags-wrapper .more-btn {
    font-family: PingFang SC;
    font-size: 14px;
    color: #8E05C2;
    padding: 0 1.66667rem 0 0;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
}
</style>