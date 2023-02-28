<script lang="ts">
import { defineComponent } from "vue";
import Ambassador from '@/helpers/ambassador';
import GenreLabelItem from '@/components/misc/items/GenreLabelItem.vue';
export default defineComponent ({
    components: {
        GenreLabelItem
    },
    data() {
        return {
            genres: [],
            error: false,
            loading: true,
        }
    },
    mounted() {
        Ambassador.getGenreLists(100)
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
    <div class="label-list m-auto border-box p-relative">
        <div class="label-row">
            <GenreLabelItem v-for="(item, index) in genres" :key="index" :genre="item" />
        </div>
    </div>
</template>

<style scoped>
.classify-list-container .label-list {
    max-width: 50rem;
    padding: .83333rem 1.33333rem 0;
    color: #6c727e;
}
.classify-list-container .label-list .label-row:first-child {
    padding-bottom: .5rem;
    border-bottom: 1px solid rgba(255,255,255,.1);
}
.classify-list-container .label-list .label-row .classify-label {
    display: inline-block;
    text-align: center;
    padding: .41667rem .66667rem;
    margin: .5rem .66667rem;
    font-size: 1rem;
    cursor: pointer;
    color: #e3e3e0;
    overflow: hidden;
    text-overflow: ellipsis;
}
.classify-list-container .label-list .label-row-nowrap {
    overflow-x: scroll;
    width: 100%;
    white-space: nowrap;
    box-sizing: border-box;
}
.classify-list-container .label-list .label-row .classify-label.selected {
    background: rgba(157,50,255,.12);
    color: #8E05C2;
    border-radius: .66667rem;
}
</style>