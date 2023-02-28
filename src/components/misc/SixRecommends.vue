<script lang="ts">
import RecommendsItem from '@/components/misc/items/RecommendsItem.vue';
import Skeleton from '@/components/tools/Skeleton.vue';
import { defineComponent } from "vue";
import Ambassador from '@/helpers/ambassador';
export default defineComponent({
    props: {
        title: {
            default: "Impressum",
            type: String,
        }
    },
    components: {
        RecommendsItem,
        Skeleton,
    },
    data() {
        return {
            mangas: [],
            error: false,
            loading: true,
        }
    },
    mounted() {
        Ambassador.getRecommends()
            .then((response) => {
                this.mangas = response.data.data.webtoons;
            })
            .catch((error) => {
                console.log("sorry there was an error " + error);
                this.error = true;
            })
            .finally(() => {if (!this.error) this.loading = false});
    }
});
</script>

<template>
    <Skeleton :isHidden="!loading">
        <div>
            <div class="title p-relative">
                <p>
                    HOT WEBTOONS
                </p>
            </div>
            <div class="hot-list">
                <RecommendsItem v-for="(item, index) in mangas" :key="index" :manga="item" />
            </div>
        </div>
    </Skeleton>
</template>

<style scoped>
.title {
    font-size: 1.66667rem;
    height: 2rem;
    line-height: 2rem;
    margin: 0 0 1.33333rem;
}

.title p {
    padding: 0;
    margin: 0;
    font-weight: 400;
}

.hot-list .data-item {
    width: 50%;
    margin-bottom: 32px;
}
</style>