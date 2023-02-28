<script lang="ts">
import Skeleton from '@/components/tools/Skeleton.vue';
import RectangleItem from '@/components/misc/items/RectangleItem.vue';
import { defineComponent } from "vue";
import Ambassador from '@/helpers/ambassador';
export default defineComponent({
    props: {
        pid: {
            default: 3,
            type: Number
        },
        pageNum: {
            default: 1,
            type: Number
        },
        title: {
            default: "Impressum",
            type: String
        },
        rand: {
            default: 0,
            type: Number
        },
        canLoad: {
            default: false,
            type: Boolean
        },
        sizeType: {
            default: 1,
            type: Number
        }
    },
    components: {
        RectangleItem,
        Skeleton
    },
    data() {
        return {
            posts: [],
            error: false,
            loading: true,
        }
    },
    mounted() {
        if (this.canLoad) {
            Ambassador.getSixMangas(this.pid, this.pageNum, this.rand)
                .then((response) => {
                    this.posts = response.data.data.posts;
                })
                .catch((error) => {
                    console.log("sorry there was an error " + error);
                    this.error = true;
                })
                .finally(() => { this.loading = false });
        }
    },
    updated() {
        if (this.canLoad && this.loading) {
            Ambassador.getPosts(2)
                .then((response) => {
                    this.posts = response.data.data.posts;
                })
                .catch((error) => {
                    console.log("sorry there was an error " + error);
                    this.error = true;
                })
                .finally(() => { if (!this.error) this.loading = false });
        }
    },
});
</script>

<template>
    <Skeleton :isHidden="!loading">
        <div>
            <div class="six-cards-title">
                {{ title }}
                <a href="/articles" class="text-barney f-right">
                    More
                </a>
            </div>

        </div>
        <ul class="main">
            <RectangleItem v-for="(item, index) in posts" :key="index" :post="item" :sizeType="sizeType" />
        </ul>
    </Skeleton>

</template>

<style scoped>
.six-cards-title {
    padding: .91667rem .66667rem .66667rem;
    font-family: SF Pro Text;
    font-style: normal;
    font-weight: 600;
    font-size: 1.66667rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>