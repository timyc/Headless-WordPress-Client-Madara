<script lang="ts">
import Skeleton from '@/components/tools/Skeleton.vue';
import MangaItem from '@/components/misc/items/MangaItem.vue';
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
        MangaItem,
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
                <div class="six-cards-title">
                    {{ title }}
                    <a :href="'/webtoons?styles=' + pid" class="text-barney f-right">
                        More
                    </a>
                </div>
                <div class="manga-list">
                    <MangaItem v-for="(item, index) in mangas" :key="index" :manga="item" :sizeType="sizeType" v-if="sizeType == 1" />
                    <MangaItem v-for="(item, index) in mangas.slice(0, 4)" :key="index" :manga="item" :sizeType="sizeType" v-if="sizeType == 2" />
                </div>
            </div>
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
}

.six-cards .manga-list {
    margin-bottom: .66667rem;
}
</style>