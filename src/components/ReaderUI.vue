<script lang="ts">
import { defineComponent } from "vue";
import slider from "vue3-slider";
import BookmarkButton from '@/components/bars/items/BookmarkButton.vue';
import PrizeModal from '@/components/misc/PrizeModal.vue';
import ReportModal from '@/components/misc/ReportModal.vue';
export default defineComponent({
    components: {
        "vue3-slider": slider,
        BookmarkButton,
        PrizeModal,
        ReportModal,
    },
    inheritAttrs: false,
    props: {
        data: Object,
        chdata: Object,
        readerHidden: Boolean,
        sliVal: Number,
    },
    data() {
        return {
            value: 0,
            prevCh: null,
            nextCh: null,
            maxPages: 0,
            loaded: false,
            canChange: true,
            showModal: false,
            showModal2: false,
        }
    },
    methods: {
        visitWebtoon() {
            window.location.href = `${window.location.origin}/read/${this.$route.params.slug}`;
        },
        hideReader(c: number) {
            this.$emit('hide-reader', c);
        },
        goNext() {
            if (this.nextCh != null) {
                window.location.href = `${window.location.origin}/read/${this.$route.params.slug}/${this.nextCh}`;
            }
        },
        goPrev() {
            if (this.prevCh != null) {
                window.location.href = `${window.location.origin}/read/${this.$route.params.slug}/${this.prevCh}`;
            }
        },
        toPage(i: number) {
            this.canChange = false;
            document.querySelector(`[index="${i}"]`)!.scrollIntoView();
            setTimeout(() => {
                this.canChange = true;
            }, 100);
            
        },
    },
    mounted() {
        for (let x = 0; x < this.chdata!.length; x++) {
            if (this.chdata![x].chapter_id == this.data!.ch_id) {
                if (x != 0) {
                    this.nextCh = this.chdata![x - 1].chapter_slug;
                }
                if (x != this.chdata!.length - 1) {
                    this.prevCh = this.chdata![x + 1].chapter_slug;
                }
                break;
            }
        }
        this.maxPages = Object.keys(JSON.parse(this.data!.data)).length - 1;
        this.value = this.sliVal as any;
        this.loaded = true;

    },
    updated() {
        if (this.canChange) {
            this.value = this.sliVal as any;
        }
    }
});
</script>


<template>
    <div class="reader-ui">
        <vue-final-modal v-model="showModal">
            <PrizeModal />
        </vue-final-modal>
        <vue-final-modal v-model="showModal2">
            <ReportModal />
        </vue-final-modal>
        <div class="action-bar top p-relative" :style="{ display: readerHidden ? 'none' : 'block' }">
            <div class="return-btn bg-center bg-no-repeat dp-i-block v-middle pointer" @click="visitWebtoon"></div>
            <div class="text-container dp-i-block v-middle">
                <span class="title dp-i-block t-over-hidden t-no-wrap v-bottom">
                    {{ data!.ch_name }}
                </span>
            </div>
            <div class="button-group dp-i-block v-middle f-right">
                <div class="feeback-btn dp-i-block p-relative">
                    <div class="feedback-btn dp-i-block">
                        <div class="popup-menus-container p-relative page-matching-button">
                            <div class="animation-element w-100 h-100 p-absolute"
                                :style="{ display: readerHidden ? 'none' : 'block' }">
                                <div class="popup-menus p-absolute border-box bottom">

                                </div>
                            </div>
                            <div class="p-relative">
                                <div class="shortcuts-info">
                                    <span class="gift-icon dp-i-block bg-cover v-middle" @click="showModal = true"></span>
                                    <span class="feedback-icon dp-i-block bg-cover v-middle" @click="showModal2 = true"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="action-bar bottom t-center p-absolute" :style="{ display: readerHidden ? 'none' : 'block' }">
            <div class="slider" v-if="loaded">
                <div class="slider-component p-relative">
                    <div :class="['slb', 'btn', 'over-ellipsis', { 'disabled': prevCh == null }]" @click="goPrev">
                        Prev
                    </div>
                    <div class="slider-body">
                        <vue3-slider v-model="value" color="#FB278D" track-color="#FEFEFE" :max=maxPages
                            @drag-start="toPage" />
                    </div>
                    <div :class="['slb', 'btn', 'over-ellipsis', { 'disabled': nextCh == null }]" @click="goNext">
                        Next
                    </div>
                </div>
            </div>
            <div class="has-bg">
                <div title="bookmark" class="action-button bookmark">
                    <BookmarkButton :bmChap=data!.ch_id :bmToon=data!.comic_id />
                    <div class="text">Bookmark</div>
                </div>
                <div title="settings" class="action-button setting" @click="hideReader(3)">
                    <div class="icon"></div>
                    <div class="text">Settings</div>
                </div>
                <div title="comments" class="action-button comment p-relative" @click="hideReader(2)">
                    <div class="icon"></div>
                    <div class="text">Comments</div>
                </div>
                <div title="chapters" class="action-button chapters p-relative" @click="hideReader(1)">
                    <div class="icon"></div>
                    <div class="text">Chapters</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.slb {
    margin: 10px;
}
.reader-ui .action-bar {
    width: 100%;
    min-height: 4rem;
    line-height: 4rem;
    background-color: #250339;
    color: #fff;
    box-sizing: border-box;
}

.reader-ui .action-bar.top {
    padding: 0 1.41667rem;
}

.reader-ui .action-bar.top .return-btn {
    width: 2rem;
    height: 2rem;
    background-image: url(@/assets/icons/arrow-left2.svg);
}

.reader-ui .action-bar.top .text-container {
    margin-left: .66667rem;
}

.reader-ui .action-bar.top .title {
    max-width: calc(100vw - 140px);
    font-size: 1.33333rem;
}

.reader-ui .action-bar .button-group .feedback-icon {
    width: 2.08333rem;
    height: 2.08333rem;
    background-image: url(@/assets/icons/notification.svg);
}

.reader-ui .action-bar .button-group .gift-icon {
    width: 2.08333rem;
    height: 2.08333rem;
    margin-right: 10px;
    background-image: url(@/assets/icons/gift.svg);
}


.reader-ui .action-bar.bottom {
    bottom: 0;
    justify-content: center;
    background-color: transparent;
}

.reader-ui .action-bar.bottom .has-bg {
    display: flex;
    justify-content: space-around;
    padding: .5rem 1.41667rem;
    background-color: #250339;
}

.reader-ui .action-bar.bottom .action-button {
    display: inline-block;
    height: 100%;
    flex: 1;
    margin-bottom: env(safe-area-inset-bottom);
    padding-top: .25rem;
    font-size: 1rem;
    line-height: 1.5rem;
    text-align: center;
    white-space: nowrap;
    cursor: pointer;
}

.reader-ui .action-bar.bottom .action-button .icon {
    width: 1.5rem;
    height: 1.5rem;
    margin: 0 auto;
    background-size: contain;
    background-position: 50%;
    background-repeat: no-repeat;
}

.reader-ui .action-bar.bottom .comment .icon {
    background-image: url(@/assets/icons/bubbles2.svg);
}

.reader-ui .action-bar.bottom .action-button .text {
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

.reader-ui .action-bar.bottom .bookmark .icon {
    background-image: url(@/assets/icons/bookmarks.svg);
}

.reader-ui .action-bar.bottom .setting .icon {
    background-image: url(@/assets/icons/cog.svg);
}

.reader-ui .action-bar.bottom .chapters .icon {
    background-image: url(@/assets/icons/list.svg);
}

.slider-component {
    background: #250339;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    font-size: 14px;
    padding: 0 1.66667rem;
}

.slider-component .slider-body {
    flex: 1;
}

.slider-component:after {
    content: " ";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: .08333rem;
    background-color: hsla(0, 0%, 100%, .1);
    transform: scaleY(.3);
}

.slider-component .btn.disabled {
    background: #999;
}
.vfm__title {
  margin: 0 2rem 0 0;
  font-size: 1.5rem;
  font-weight: 700;
}
.vfm__container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.vfm__action {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  padding: 1rem 0 0;
}
.vfm__close {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
}
.vfm__content {
  position: relative;
  display: flex;
  flex-direction: column;
  max-height: 90%;
  margin: 0 1rem;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  background: #000;
  text-align: center;
}
</style>