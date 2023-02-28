<script lang="ts">
import HistoryItem from '@/components/misc/items/HistoryItem.vue';
import Ambassador from '@/helpers/ambassador';
import { defineComponent } from "vue";
export default defineComponent({
    props: {
        history: Array,
        bookmarks: Array,
    },
    data() {
        return {
            curTab: 1,
            bmlist: this.bookmarks,
            error: false,
            loading: true,
        }
    },
    inheritAttrs: false,
    components: {
        HistoryItem,
    },
    methods: {
        findBookmarks() {
            if (this.curTab != 2 && this.loading) {
                Ambassador.listHistory(this.bookmarks as any)
                    .then((response) => {
                        this.bmlist = response.data.data.list;
                    })
                    .catch((error) => {
                        console.log(error);
                        this.error = true;
                    })
                    .finally(() => {
                        if (!this.error) {
                            this.loading = false;
                            this.curTab = 2;
                        }

                    });
            } else {
                this.curTab = 2;
            }
        },
        goHistory() {
            if (this.curTab != 1) {
                this.curTab = 1;
            }
        }
    },
});
</script>

<template>
    <div class="list-box">
        <div class="tab-box t-left pointer">
            <span :class="['item', 'dp-i-block', { 'active': curTab == 1 }]" @click="goHistory">
                History
            </span>
            <span :class="['item', 'dp-i-block', { 'active': curTab == 2 }]" @click="findBookmarks">
                Bookmarks
            </span>
        </div>
        <div class="list-data border-box m-auto">
            <template v-if="curTab == 1">
                <div class="empty t-center" v-if="history!.length == 0">
                    <span class="dp-i-block pic-empty"></span>
                    <p class="text">
                        None Found
                    </p>
                </div>
                <HistoryItem v-for="(item, index) in history" :key="index" :hitem="(item as any)" v-else />
            </template>
            <template v-if="curTab == 2">
                <span class="text-warning">
                    Attention! Bookmarks will only be displayed for webtoons you have READ!
                </span>
                <div class="empty t-center" v-if="bmlist!.length == 0">
                    <span class="dp-i-block pic-empty"></span>
                    <p class="text">
                        None Found
                    </p>
                </div>
                <HistoryItem v-for="(item, index) in bmlist" :key="index" :hitem="(item as any)" v-else />
            </template>
        </div>
    </div>
</template>

<style scoped>
.list-data .group-list {
    padding: 0 0 4px;
}

.tab-box {
    position: sticky;
    top: 0;
    height: 4rem;
    line-height: 4rem;
    background: #000;
    z-index: 100;
    padding: 0 16px;
}

.tab-box .item {
    margin-right: 20px;
    font-size: 16px;
    font-weight: 600;
}

.tab-box .item.active {
    position: relative;
    color: #32aaff;
}

.list-data {
    padding: 0 16px;
}

.list-data .empty .pic-empty {
    width: 216px;
    height: 216px;
}

.list-data .empty .text {
    font-size: 16px;
    color: #90929b;
}

.tab-box .item.active {
    position: relative;
    color: #8E05C2;
}

.tab-box .item.active:after {
    position: absolute;
    content: "";
    display: block;
    height: .25rem;
    width: 1.66667rem;
    border-radius: .16667rem;
    background: #8E05C2;
    left: 50%;
    bottom: 5px;
    transform: translateX(-50%);
}
</style>