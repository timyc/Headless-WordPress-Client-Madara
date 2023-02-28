<script lang="ts">
import Ambassador from '@/helpers/ambassador';
import ReaderUI from '@/components/ReaderUI.vue';
import ReaderPopups from '@/components/ReaderPopups.vue';
import MangaImageItem from '@/components/misc/items/MangaImageItem.vue';
import ls from '@/helpers/storage';
import { defineComponent } from "vue";
import { useTitle } from '@vueuse/core';
export default defineComponent({
    components: {
        MangaImageItem,
        ReaderUI,
        ReaderPopups,
    },
    inheritAttrs: false,
    data() {
        return {
            data: {
                data: "",
                ch_name: "",
                title: "",
                comic_id: 0,
            },
            chapters: [] as any,
            error: false,
            errorMsg: "",
            loading: true,
            loadingMsg: "loading...",
            readerHidden: true,
            episodesHidden: true,
            settingsHidden: true,
            commentsHidden: true,
            curSliderVal: 0,
            chapter_id: 0,
            isPaged: ls.get('paged') == true ? true : false,
        }
    },
    mounted() {
        document.getElementById('manga-mobile-app')?.classList.add("w-100");
        document.getElementById('manga-mobile-app')?.classList.add("h-100");
        document.getElementById('manga-mobile-app')?.classList.add("p-absolute");
        document.getElementById('manga-mobile-app')?.classList.add("p-zero");
        document.getElementById('manga-mobile-app')?.classList.add("over-hidden");
        Ambassador.getChapterImages(this.$route.params.chapter as string, this.$route.params.slug as string)
            .then((response) => {
                this.data = response.data.data.idata;
                this.chapters = response.data.data.chdata;
                for (let x of this.chapters) {
                    if (x.chapter_slug == this.$route.params.chapter) {
                        this.chapter_id = x.chapter_id;
                    }
                }
                if (response.data.data.idata === undefined) {
                    throw new Error('peepee poopoo');
                }
            })
            .catch((error) => {
                console.log(error)
                this.errorMsg = error.response.data.msg;
                this.error = true;
                this.loadingMsg = "";
            })
            .finally(() => { 
                if (!this.error) this.loading = false; 
                useTitle(`${this.data.ch_name} - ${this.data.title} - ${import.meta.env.VITE_NAME}`); 
                setTimeout(() => {
                    this.updateHistory();
                }, 5000);
            });
    },
    methods: {
        showReader(flag: number = 0) {
            let ele = document.getElementsByClassName('action-bar')[0] as HTMLElement;
            let ele2 = document.getElementsByClassName('action-bar')[1] as HTMLElement;
            let masker = document.getElementsByClassName('reader-container')[0] as HTMLElement;
            if (this.readerHidden) {
                ele.classList.add("a-move-in-bottom");
                ele2.classList.add("a-move-in-top");
                masker.classList.add("ui-mask");
                this.readerHidden = !this.readerHidden;
            } else {
                ele.classList.remove("a-move-in-bottom");
                ele2.classList.remove("a-move-in-top");
                ele.classList.add("a-move-out-top");
                ele2.classList.add("a-move-out-bottom");
                masker.classList.remove("ui-mask");
                setTimeout(() => {
                    ele.classList.remove("a-move-out-top");
                    ele2.classList.remove("a-move-out-bottom");
                    this.readerHidden = !this.readerHidden;
                }, 300);
            }
            if (flag == 1) {
                this.showEpisodes();
            } else if (flag == 2) {
                this.showComments();
            } else if (flag == 3) {
                this.showSettings();
            }
        },
        showEpisodes() {
            let ele = document.getElementsByClassName('popup-box')[0] as HTMLElement;
            if (this.episodesHidden) {
                ele.classList.add("a-move-in-top");
                this.episodesHidden = !this.episodesHidden;
            } else {
                ele.classList.remove("a-move-in-top");
                ele.classList.add("a-move-out-bottom");
                setTimeout(() => {
                    ele.classList.remove("a-move-out-top");
                     ele.classList.remove("a-move-out-bottom");
                    this.episodesHidden = !this.episodesHidden;
                }, 300);
            }
        },
        showComments() {
            let ele = document.getElementsByClassName('popup-box')[1] as HTMLElement;
            if (this.commentsHidden) {
                ele.classList.add("a-move-in-top");
                this.commentsHidden = !this.commentsHidden;
            } else {
                ele.classList.remove("a-move-in-top");
                ele.classList.add("a-move-out-bottom");
                setTimeout(() => {
                    ele.classList.remove("a-move-out-top");
                     ele.classList.remove("a-move-out-bottom");
                    this.commentsHidden = !this.commentsHidden;
                }, 300);
            }
        },
        showSettings() {
            let ele = document.getElementsByClassName('popup-box')[2] as HTMLElement;
            if (this.settingsHidden) {
                ele.classList.add("a-move-in-top");
                this.settingsHidden = !this.settingsHidden;
            } else {
                ele.classList.remove("a-move-in-top");
                ele.classList.add("a-move-out-bottom");
                setTimeout(() => {
                    ele.classList.remove("a-move-out-top");
                     ele.classList.remove("a-move-out-bottom");
                    this.settingsHidden = !this.settingsHidden;
                }, 300);
            }
        },
        sliderUpdate(i: number) {
            this.curSliderVal = i;
        },
        updateHistory() {
            if (ls.get('userInfo')) {
                Ambassador.doHistory(ls.get('userInfo').token, this.chapter_id, this.data.comic_id);
            }
        },
    },
    beforeUnmount() {
        
    }
});
</script>

<template>
    <div class="manga-reader" v-if="data.title.length != 0">
        <div class="reader-container w-100 h-100 p-absolute p-zero" @click="showReader(0)">
            <div class="voyager-reader-core" style="background-color: rgb(57, 57, 57);">
                <div :class="['views-container', {'scrollable': !isPaged ? true : true}]">
                    <template v-if="!isPaged">
                        <div class="view-items-list column with-transition">
                            <!-- I do not need to use Canvas because cringe bilbili is just trying to paywall their content with canvas -->
                            <ErrorMessage v-if="error">{{ errorMsg }}</ErrorMessage>
                            <template v-if="loading">
                                {{ loadingMsg }}
                            </template>
                            <template v-else>
                                <MangaImageItem v-for="(item, index) in JSON.parse(data.data)" :key="index" :index="(index - 1).toString()"
                                    :image="(item as any)" @slider-update="sliderUpdate" />
                            </template>
                        </div>
                    </template>
                    <template v-else>
                        <div class="view-items-list with-transition no-scroll-bar" style="scroll-snap-type: x mandatory; overflow-x: scroll">
                            <!-- I do not need to use Canvas because cringe bilbili is just trying to paywall their content with canvas -->
                            <ErrorMessage v-if="error">{{ errorMsg }}</ErrorMessage>
                            <template v-if="loading">
                                {{ loadingMsg }}
                            </template>
                            <template v-else>
                                <MangaImageItem v-for="(item, index) in JSON.parse(data.data)" :key="index" :index="(index - 1).toString()"
                                    :image="(item as any)" @slider-update="sliderUpdate" />
                            </template>
                        </div>
                    </template>
                </div>
            </div>
        </div>
        <ReaderUI :data="data" :chdata="chapters" :readerHidden="readerHidden" :sliVal="curSliderVal" @hide-reader="showReader" />
        <ReaderPopups :data="data" :chdata="chapters" :episodesHidden="episodesHidden" :commentsHidden="commentsHidden" :settingsHidden="settingsHidden" @hide-reader="showReader" />
    </div>
    <div class="hinter-container p-absolute">
    </div>
</template>

<style scoped>
body {
    min-width: 26.66667rem;
    max-width: 50rem;
    margin: 0 auto;
    background-color: #fff;
}

body {
    background-color: #393939;
    touch-action: none;
}

body {
    -ms-scroll-chaining: none;
    overscroll-behavior: none;
    height: 100% !important;
}

.hinter-container {
    left: 50%;
    bottom: 6.66667rem;
    transform: translate(-50%);
}

.voyager-reader-core {
    width: 100%;
    height: 100%;
    position: relative;
}

.no-scroll-bar::-webkit-scrollbar {
  display: none;
}

.no-scroll-bar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.views-container {
    height: 100%;
    position: relative;
    overflow: hidden;
}

.views-container.scrollable {
    overflow: auto;
}

.views-container .view-items-list {
    display: flex;
    height: 100%;
    position: relative;
}

.views-container .view-items-list.column {
    flex-direction: column;
}

.views-container .view-items-list.with-transition {
    transition: all .3s cubic-bezier(.22, .58, .12, .98);
}

.manga-reader .ui-mask {
    filter: brightness(.6);
}
</style>