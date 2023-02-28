<script lang="ts">
import { defineComponent } from "vue";
import ReaderChaptersItem from '@/components/misc/items/ReaderChaptersItem.vue';
import SingleComments from '@/components/misc/SingleComments.vue';
import ls from '@/helpers/storage';
export default defineComponent({
    components: {
        ReaderChaptersItem,
        SingleComments,
    },
    data() {
        return {
            chap: [] as any,
            isSwitched: false,
            pagerino: ls.get('paged') == true ? true : false,
            imageHost: import.meta.env.VITE_WORDPRESS_URL,
        }
    },
    inheritAttrs: false,
    props: {
        data: Object,
        chdata: Array,
        episodesHidden: Boolean,
        commentsHidden: Boolean,
        settingsHidden: Boolean,
    },
    methods: {
        hideReader(c: number) {
            this.$emit('hide-reader', c);
        },
        switchDirection() {
            this.chap = this.chap.reverse();
            this.isSwitched = !this.isSwitched;
        },
        isPageChange() {
            ls.set('paged', this.pagerino);
            window.location.reload();
        }
    },
    mounted() {
        this.chap = this.chdata;
    },
});
</script>


<template>
    <div class="draggable-popup w-100 p-fixed p-zero a-dot-2">
        <div class="mask p-fixed w-100 h-100" :style="{ display: episodesHidden ? 'none' : 'block' }"
            @click="hideReader(1)"></div>
        <div class="popup-box w-100" :style="{ display: episodesHidden ? 'none' : 'block' }" style="height: 500px;">
            <div class="popup-content h-100 draggable">
                <div class="episode-list">
                    <div class="episode-list-header dp-flex space-between align-center">
                        <div class="episode-count">
                            {{ chap?.length || 0 }} Chapters
                        </div>
                        <div class="episode-operation pointer f-right" @click="switchDirection">
                            <div :class="['sort-icon', 'dp-i-block', 'v-middle', {'sort-asc': isSwitched}]"></div>
                            <span>{{ !isSwitched ? 'Descending' : 'Ascending' }}</span>
                        </div>
                    </div>
                    <ReaderChaptersItem v-for="(item, index) in chap" :key="index" :chap="(item as any)"
                        :title="data!.slug" />
                </div>
            </div>
        </div>
    </div>
    <div class="draggable-popup w-100 p-fixed p-zero a-dot-2">
        <div class="mask p-fixed w-100 h-100" :style="{ display: commentsHidden ? 'none' : 'block' }"
            @click="hideReader(2)"></div>
        <div class="popup-box w-100" :style="{ display: commentsHidden ? 'none' : 'block' }" style="height: 500px;">
            <div class="popup-content h-100 draggable">
                <div class="bg-black" style="height: calc(100vh - 50px);">
                    <div class="keyboard-warrior">
                        <SingleComments :pid="data!.comic_id" :url="`${imageHost}/read/` + $route.params.slug + '/&chapter=' + $route.params.chapter" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="draggable-popup w-100 p-fixed p-zero a-dot-2">
        <div class="mask p-fixed w-100 h-100" :style="{ display: settingsHidden ? 'none' : 'block' }"
            @click="hideReader(3)"></div>
        <div class="popup-box w-100" :style="{ display: settingsHidden ? 'none' : 'block' }" style="height: auto;">
            <div class="popup-content h-100 draggable">
                <div class="setting-panel w-100 border-box">
                    <div class="auto-skip-switch dp-flex space-between">
                        <span>Paged? (Arrow keys on PC)</span>
                        <div>
                            <input type="checkbox" class="opt switch" v-model="pagerino" @change="() => isPageChange()">
                            <label for="switch" class="label"></label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.draggable-popup {
    z-index: 100;
    font-size: 1.16667rem;
}

.draggable-popup .mask {
    width: 100%;
    height: 100%;
    background: transparent;
    left: 0;
    top: 0;
}

.draggable-popup .popup-box {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    max-height: 100vh;
    overflow: hidden;
}

.draggable-popup .popup-box .popup-content.draggable {
    overflow-y: scroll;
}

.episode-list {
    min-height: 100%;
    background: #250339;
    color: #fff;
}

.episode-list-header {
    font-weight: 600;
    font-size: 20px;
    position: sticky;
    top: 0;
    padding: 1.33333rem;
    background: #250339;
    z-index: 1;
}

.episode-list .list-item {
    font-size: 16px;
    font-weight: 500;
    padding: .66667rem 1.33333rem;
}

.episode-list .list-item-content {
    flex-grow: 1;
    flex-direction: column;
    text-align: left;
    padding-left: 12px;
}

.episode-list .list-item-content .title {
    overflow: hidden;
    word-wrap: break-word;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}

.episode-list .list-item-content .date {
    color: hsla(0, 0%, 100%, .5);
    font-weight: 400;
    font-size: 12px;
    transform: scale(.8333);
    transform-origin: 0 0;
}

.episode-list-header .episode-operation {
    color: #666;
    font-size: 1rem;
}

.episode-list-header .episode-operation .sort-icon {
    margin-right: .41667rem;
    width: 1.33333rem;
    height: 1.33333rem;
    background-image: url(data:image/svg+xml;base64,PHN2ZyBkYXRhLW5hbWU9IuWbvuWxgiAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiI+PHBhdGggZD0iTTEyLjUxIDkuNTFhLjcxLjcxIDAgMDExIDFsLTMgM2EuNjguNjggMCAwMS0xIC4wNy42OC42OCAwIDAxLS4yMS0uNThWM2EuNy43IDAgMDExLjQgMHY4LjMxeiIgZmlsbD0iIzMyYWFmZiIvPjxwYXRoIGQ9Ik01LjMgNC42OWwtMS44MSAxLjhhLjcxLjcxIDAgMDEtMS0xbDMtM2EuNjguNjggMCAwMTEtLjA3LjY4LjY4IDAgMDEuMjEuNTh2MTBhLjcuNyAwIDExLTEuNCAweiIgZmlsbD0iIzk5OSIgZmlsbC1vcGFjaXR5PSIuNSIvPjwvc3ZnPg==);
}
.episode-list-header .episode-operation .sort-icon.sort-asc {
    background-image: url(data:image/svg+xml;base64,PHN2ZyBkYXRhLW5hbWU9IuWbvuWxgiAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiI+PHBhdGggZD0iTTMuNDkgNi40OWEuNjkuNjkgMCAwMS0xLTFsMy0zQS42OS42OSAwIDAxNi43IDN2MTBhLjcuNyAwIDExLTEuNCAwVjQuNjl6IiBmaWxsPSIjMzJhYWZmIi8+PHBhdGggZD0iTTEwLjcgMTEuMzFsMS44MS0xLjhhLjY5LjY5IDAgMDExIDFsLTMgM0EuNjkuNjkgMCAwMTkuMyAxM1YzYS43LjcgMCAwMTEuNCAweiIgZmlsbD0iIzk5OSIgZmlsbC1vcGFjaXR5PSIuNSIvPjwvc3ZnPg==);
}
.keyboard-warrior {
    padding: 20px;
}
.setting-panel {
    left: 0;
    bottom: 0;
    background-color: #250339;
    color: #fff;
    padding: 22px 16px calc(env(safe-area-inset-bottom) + 22px);
}
.auto-skip-switch {
    height: 40px;
    align-items: center;
    font-size: 16px;
    margin-top: 28px;
}
.auto-skip-switch .opt {
    color: hsla(0,0%,100%,.95);
}
input[type=checkbox].switch:checked:after {
    content: "";
    position: absolute;
    left: 45%;
}
input[type=checkbox].switch {
    margin-left: 12px;
    outline: none;
    -webkit-appearance: none;
    appearance: none;
    position: relative;
    width: 3rem;
    height: 1.83333rem;
    background: #e5e5e5;
    border-radius: .83333rem;
    transition: border-color .3s, background-color .3s;
}
input[type=checkbox].switch:checked {
    background: #8E05C2;
}
input[type=checkbox].switch:after {
    content: "";
    display: inline-block;
    width: 1.58333rem;
    height: 1.58333rem;
    border-radius: 50%;
    background: #fff;
    box-shadow: 0, 0, 2px, #999;
    transition: .4s;
    top: 50%;
    position: absolute;
    left: 5%;
    transform: translateY(-50%);
}
</style>