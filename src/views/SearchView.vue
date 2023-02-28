<script lang="ts">
import SixRecommends from '@/components/misc/SixRecommends.vue';
import SearchSuggestionItem from '@/components/misc/items/SearchSuggestionItem.vue';
import SearchResultItem from '@/components/misc/items/SearchResultItem.vue';
import { useTitle } from '@vueuse/core';
import { defineComponent } from "vue";
import Ambassador from '@/helpers/ambassador';
let delay = (() => {
    let timer = 0;
    return (callback: any, ms: any, that: any) => {
        clearTimeout(timer);
        timer = window.setTimeout(callback.bind(that), ms);
    };
})();
export default defineComponent({
    data() {
        return {
            query: '',
            results: [],
            showResults: [],
            canSearch: true,
        }
    },
    components: {
        SixRecommends,
        SearchSuggestionItem,
        SearchResultItem,
    },
    mounted() {
        useTitle(`Search - ${import.meta.env.VITE_NAME}`);
        if (this.$route.query.keyword && this.$route.query.keyword != '') {
            this.searchReq(this.$route.query.keyword as string, 10, 1);
        }
    },
    methods: {
        search() {
            if (this.query.length >= 3 && this.canSearch) {
                this.searchReq(this.query, 5, 0);
            }
        },
        searchReq(q: string, lim: number, flag: number) {
            Ambassador.searchQuery(q, lim)
                .then((response) => {
                    if (flag == 0) {
                        this.results = response.data.data;
                    } else {
                        this.showResults = response.data.data;
                    }
                    
                })
                .catch((error) => {
                    console.log("sorry there was an error " + error);
                })
                .finally(() => { this.canSearch = false });
        },
        submit() {
            let i = document.querySelector("#app-title") as any;
            window.history.pushState("", i ? i.textContent : "", "//" + window.location.host + window.location.pathname + "?keyword=" + this.query);
            window.location.reload();
        }
    },
    updated() {
        delay(() => {
            this.search();
            this.canSearch = true;
        }, 1000, null);
    }
});

</script>

<template>
    <div class="app-layout m-auto">
        <div class="main-container">
            <template v-if="$route.query.keyword == '' || $route.query.keyword == undefined">
                <SixRecommends />
            </template>
            <template v-else>
                <div class="search-list">
                    <SearchResultItem v-for="(item, index) in showResults" :key="index" :searchResult="item" />
                </div>
            </template>

        </div>
        <div class="search-navbar w-100 p-fixed p-zero dp-flex align-center border-box">
            <div class="search-bar p-relative border-box bar">
                <div class="search-bar-bg w-100 p-absolute p-zero ts-dot-4" style="height: 32px;">
                    <div class="search-suggestion w-100 p-absolute border-box over-hidden"
                        :style="{ height: '150px', display: results.length == 0 ? 'none' : 'block' }">
                        <div class="data-list h-100 p-relative ps">
                            <div class="ps__rail-x" style="left: 0px; bottom: 0px;">
                                <div class="ps__thumb-x" tabindex="0" style="left: 0px; width: 0px;"></div>
                            </div>
                            <div class="ps__rail-y" style="top: 0px; right: 0px;">
                                <div class="ps__thumb-y" tabindex="0" style="top: 0px; height: 0px;">
                                </div>
                            </div>
                            <SearchSuggestionItem v-for="(item, index) in results" :key="index" :searchResult="item" />
                        </div>
                    </div>
                </div>
                <form class="dp-block h-100 p-relative" @submit.prevent="submit">
                    <div class="p-relative h-100 dp-flex">
                        <button class="confirm-btn app-button v-middle pointer" type="submit">
                            <div class="search-icon bg-cover bg-center bg-no-repeat"></div>
                        </button>
                        <div class="search-input-wrapper dp-flex justify-center p-relative">
                            <div class="placeholder-list w-100 h-100 p-absolute p-zero border-box over-hidden">

                            </div>
                            <input class="search-input v-middle ts-dot-2 w-100" placeholder="Enter your search query"
                                v-model="query">
                        </div>
                        <span class="clear-icon bg-cover bg-no-repeat" v-if="query.length > 0"
                            @click="query = ''"></span>
                    </div>
                </form>
            </div>
            <span class="dp-i-block btn t-center" @click="$router.go(-1)">Cancel</span>
        </div>
    </div>
</template>

<style scoped>
.app-layout {
    width: 100%;
    padding-top: 50px;
}

.main-container {
    padding: 1.66667rem 0 0 1.33333rem;
}

.app-layout .search-navbar {
    z-index: 1000;
    padding: 10px;
    background-color: #000;
}

.search-bar {
    height: 2.66667rem;
    margin: 0 .83333rem;
    line-height: 32px;
    flex-grow: 1;
}

.app-layout .search-navbar .bar {
    display: inline-block;
}

.search-bar .search-bar-bg {
    height: 32px;
    background-color: #0b0b0b;
    border-radius: 8px;
    margin-top: -16px;
    top: 50%;
}

.search-bar .search-bar-bg .search-suggestion {
    left: 0;
    top: 32px;
    padding: 0 10px;
}

.search-bar .confirm-btn .search-icon {
    width: 16px;
    height: 16px;
    background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB2aWV3Qm94PSIxNDMuNTgyIDEzNS41ODQgMTguNDExIDE5LjIxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cGF0aCBkPSJNIDE1OS45MjUgMTUwLjA3NiBMIDE1Ni4xMzUgMTQ2Ljg1MyBDIDE1NS43NDMgMTQ2LjUgMTU1LjMyNCAxNDYuMzM5IDE1NC45ODYgMTQ2LjM1NCBDIDE1NS44ODEgMTQ1LjMwNiAxNTYuNDIxIDE0My45NDcgMTU2LjQyMSAxNDIuNDYxIEMgMTU2LjQyMSAxMzkuMTQ3IDE1My43MzUgMTM2LjQ2MSAxNTAuNDIxIDEzNi40NjEgQyAxNDcuMTA3IDEzNi40NjEgMTQ0LjQyMSAxMzkuMTQ3IDE0NC40MjEgMTQyLjQ2MSBDIDE0NC40MjEgMTQ1Ljc3NSAxNDcuMTA3IDE0OC40NjEgMTUwLjQyMSAxNDguNDYxIEMgMTUxLjkwNyAxNDguNDYxIDE1My4yNjYgMTQ3LjkyMSAxNTQuMzE0IDE0Ny4wMjYgQyAxNTQuMjk4IDE0Ny4zNjQgMTU0LjQ2IDE0Ny43ODMgMTU0LjgxMyAxNDguMTc1IEwgMTU4LjAzNiAxNTEuOTY1IEMgMTU4LjU4OCAxNTIuNTc4IDE1OS40ODkgMTUyLjYzIDE2MC4wMzkgMTUyLjA4IEMgMTYwLjU4OSAxNTEuNTMgMTYwLjUzNyAxNTAuNjI4IDE1OS45MjQgMTUwLjA3NyBMIDE1OS45MjUgMTUwLjA3NiBaIE0gMTUwLjQyMSAxNDYuNDYgQyAxNDguMjEyIDE0Ni40NiAxNDYuNDIxIDE0NC42NjkgMTQ2LjQyMSAxNDIuNDYgQyAxNDYuNDIxIDE0MC4yNTEgMTQ4LjIxMiAxMzguNDYgMTUwLjQyMSAxMzguNDYgQyAxNTIuNjMgMTM4LjQ2IDE1NC40MjEgMTQwLjI1MSAxNTQuNDIxIDE0Mi40NiBDIDE1NC40MjEgMTQ0LjY2OSAxNTIuNjMgMTQ2LjQ2IDE1MC40MjEgMTQ2LjQ2IFoiIHN0eWxlPSJmaWxsOiByZ2IoMjU1LCAyNTUsIDI1NSk7Ii8+Cjwvc3ZnPg==);
}

.search-bar .search-input-wrapper {
    flex: 15;
}

.search-bar .placeholder-list {
    height: 32px;
    padding: 0 10px 0 2px;
    pointer-events: none;
}

.search-bar .search-input {
    margin: 0 8px 0 0;
    border: 0;
    font-size: 12px;
    background-color: transparent;
    font-family: inherit;
    outline: none;
    z-index: 1;
    caret-color: #32aaff;
    color: white;
}

.search-bar .confirm-btn {
    padding: 5px;
    background-color: transparent;
    border: 0;
}

.search-bar .clear-icon {
    width: 1.66667rem;
    height: 1.66667rem;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjIiIGhlaWdodD0iMjIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMTEiIGN5PSIxMSIgcj0iOC4yNSIgZmlsbD0iIzAwMCIgZmlsbC1vcGFjaXR5PSIuMyIvPjxwYXRoIGQ9Ik04Ljg5MyA3LjkyMWEuNjg4LjY4OCAwIDAwLS45NzIuOTcyTDEwLjAyOCAxMSA3LjkyIDEzLjEwN2EuNjg4LjY4OCAwIDAwLjk3Mi45NzJMMTEgMTEuOTcybDIuMTA3IDIuMTA3YS42ODcuNjg3IDAgMTAuOTcyLS45NzJMMTEuOTcyIDExbDIuMTA3LTIuMTA3YS42ODcuNjg3IDAgMTAtLjk3Mi0uOTcyTDExIDEwLjAyOCA4Ljg5MyA3LjkyeiIgZmlsbD0iI2ZmZiIvPjwvc3ZnPg==);
    margin: 6px 6px 0 0;
}
</style>