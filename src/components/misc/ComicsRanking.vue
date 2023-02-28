<script lang="ts">
import Skeleton from '@/components/tools/Skeleton.vue';
import RankingItem from '@/components/misc/items/RankingItem.vue';
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
        }
    },
    components: {
        RankingItem,
        Skeleton
    },
    data() {
        return {
            mangas: [],
            error: false,
            loading: true,
        }
    },
    mounted() {
        if (this.canLoad) {
            Ambassador.getSixMangas(this.pid, this.pageNum, this.rand)
                .then((response) => {
                    this.mangas = response.data.data.webtoons;
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
            Ambassador.getSixMangas(this.pid, this.pageNum, this.rand)
                .then((response) => {
                    this.mangas = response.data.data.webtoons;
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
    <div class="six-cards p-8">
        <Skeleton :isHidden="!loading">
        <div>
            <div class="six-cards-title f-left">
                {{ title }}
            </div>
            <a :href="'/webtoons?styles=' + pid" class="six-cards-title text-barney f-right">
                More
            </a>
        </div>
            
            <ul class="rankingTable">
                <RankingItem v-for="(item, index) in mangas" :key="index" :ranking="index" :manga="item" />
            </ul>
        </Skeleton>

    </div>
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
    margin-bottom: 10px;
}
</style>