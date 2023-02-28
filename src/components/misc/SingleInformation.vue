<script lang="ts">
import ChapterItem from '@/components/misc/items/ChapterItem.vue';
import urlJoin from 'url-join';
import { defineComponent } from "vue";
export default defineComponent({
    data() {
        return {
            expanded: 0,
            expandedDesc: false,
            chaptersdata: this.chapters,
            reversed: false,
            reverseText: ["Descending", "Ascending"],
            firstChap: urlJoin(this.$router.currentRoute.value.fullPath, this.chapters![this.chapters!.length - 1].chapter_slug),
        }
    },
    components: {
        ChapterItem,
    },
    inheritAttrs: false,
    props: {
        description: String,
        chapters: null,
    },
    methods: {
        expansion() {
            this.expanded = 1;
        },
        reversal(e: any) {
            this.chaptersdata = this.chaptersdata?.reverse();
            this.reversed = !this.reversed;
        },
        expandDesc(e: any) {
            if (!this.expandedDesc) {
                e.target.classList.add('open');
                e.target.previousElementSibling.classList.remove('ellipsis');
                this.expandedDesc = !this.expandedDesc;
            } else {
                e.target.classList.remove('open');
                e.target.previousElementSibling.classList.add('ellipsis');
                this.expandedDesc = !this.expandedDesc;
            }
        }
    }
});
</script>

<template>
    <div class="page-normal with-margin">
        <div class="comic-info-con m-auto">
            <div class="comic-info p-relative border-box">
                <div class="comic-operation w-100 f-clear">
                    <a :href="firstChap" class="f-left comic-view-box">
                        <button class="comic-view-btn ts-dot-2 pointer border-box w-100">
                            Start Reading
                        </button>
                    </a>
                </div>
            </div>
        </div>
        <div class="comic-deatil-box tab-content a-move-in-right">
            <div class="evaluate pointer">
                <span class="desc ellipsis" v-html="description"></span>
                <span class="folder-icon v-middle" @click="expandDesc"></span>
            </div>
            <div class="comic-episodes">
                <div class="episode-header f-clear">
                    <div class="f-left">
                        <span class="episode-title">
                            {{ chaptersdata?.length }} Chapters
                        </span>
                    </div>
                    <div class="episode-operation pointer f-right" @click="reversal">
                        <span>
                            {{ reverseText[reversed ? 1 : 0] }}
                        </span>
                        <div :class="['sort-icon', 'dp-i-block', 'v-middle', { 'sort-asc': reversed }]"></div>
                    </div>
                </div>
                <div class="chapters-list">
                    <template v-if="(chaptersdata?.length || 0) > 8">
                        <ChapterItem v-for="(item, index) in chaptersdata?.slice(0, 5)" :key="index"
                            :chdata="(item as any)" />
                        <div class="episode-item pointer" v-if="expanded == 0">
                            <div class="item-body text-barney bg-center bg-no-repeat" @click="expansion">Show More</div>
                        </div>
                        <ChapterItem v-for="(item, index) in chaptersdata?.slice(5, chaptersdata.length - 2)"
                            v-if="expanded == 1" :key="index" :chdata="(item as any)" />
                        <ChapterItem
                            v-for="(item, index) in chaptersdata?.slice(chaptersdata.length - 2, chaptersdata.length)"
                            :key="index" :chdata="(item as any)" />
                    </template>
                    <template v-else>
                        <ChapterItem v-for="(item, index) in chaptersdata" :key="index" :chdata="(item as any)" />
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.with-margin {
    margin: 1.33333rem;
}

.comic-info-component .page-normal .comic-info-con {
    background: hsla(0, 0%, 0%, .13);
}

.comic-info-component .page-normal .comic-info-con .comic-operation {
    margin-top: 1.33333rem;
}

.comic-info-component .page-normal .comic-info-con .comic-operation .comic-view-box {
    width: 18.5rem;
}

@media screen and (min-width: 320px) {
    .comic-info-component .page-normal .comic-info-con .comic-operation .comic-view-box {
        width: 100%;
    }
}

.comic-info-component .page-normal .comic-info-con .comic-operation .comic-view-btn {
    height: 44px;
    line-height: 44px;
    background-color: #8E05C2;
    color: #fff;
    border-radius: 8px;
    text-align: center;
    border: 0;
    font-size: 16px;
    white-space: nowrap;
}

.comic-info-component .page-normal .comic-deatil-box {
    padding-top: 1.33333rem;
}

.comic-info-component .page-normal .comic-deatil-box .evaluate {
    position: relative;
    color: #999;
    font-size: 1rem;
    line-height: 1.41667rem;
    margin-bottom: 1.25rem;
    white-space: pre-line;
}

.comic-info-component .page-normal .comic-deatil-box .evaluate .desc {
    margin-right: 1.25rem;
    font-family: PingFangSC-Regular;
}

.comic-info-component .page-normal .comic-deatil-box .evaluate .ellipsis {
    display: -webkit-box;
    height: auto;
    -webkit-line-clamp: 3;
    overflow: hidden;
    -webkit-box-orient: vertical;
}

.comic-info-component .page-normal .comic-deatil-box .evaluate .folder-icon {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 1.33333rem;
    height: 1.33333rem;
    display: inline-block;
    transform: rotate(90deg);
    background-image: url(data:image/svg+xml;base64,PHN2ZyBkYXRhLW5hbWU9IuWbvuWxgiAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiI+PHBhdGggZD0iTTUuNTggMy40MmEuNTkuNTkgMCAwMS44NC0uODRsNSA1YS41OC41OCAwIDAxMCAuODRsLTUgNWEuNTkuNTkgMCAwMS0uODQtLjg0TDEwLjE1IDh6IiBmaWxsPSIjOTk5Ii8+PC9zdmc+);
    transition: transform .3s;
}

.comic-episodes .episode-header {
    margin: 1.91667rem 0 1.16667rem;
}

.comic-episodes .episode-header .episode-title {
    color: #dedede;
    font-size: 1.33333rem;
    font-weight: 500;
}

.comic-episodes .episode-header .episode-operation {
    color: #999;
    font-size: 1rem;
}

.comic-episodes .episode-header .episode-operation .sort-icon {
    margin-left: .41667rem;
    width: 1.33333rem;
    height: 1.33333rem;
    background-image: url(data:image/svg+xml;base64,PHN2ZyBkYXRhLW5hbWU9IuWbvuWxgiAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiI+PHBhdGggZD0iTTEyLjUxIDkuNTFhLjcxLjcxIDAgMDExIDFsLTMgM2EuNjguNjggMCAwMS0xIC4wNy42OC42OCAwIDAxLS4yMS0uNThWM2EuNy43IDAgMDExLjQgMHY4LjMxeiIgZmlsbD0iIzMyYWFmZiIvPjxwYXRoIGQ9Ik01LjMgNC42OWwtMS44MSAxLjhhLjcxLjcxIDAgMDEtMS0xbDMtM2EuNjguNjggMCAwMTEtLjA3LjY4LjY4IDAgMDEuMjEuNTh2MTBhLjcuNyAwIDExLTEuNCAweiIgZmlsbD0iIzk5OSIgZmlsbC1vcGFjaXR5PSIuNSIvPjwvc3ZnPg==);
}

.comic-episodes .episode-header .episode-operation .sort-icon.sort-asc {
    background-image: url(data:image/svg+xml;base64,PHN2ZyBkYXRhLW5hbWU9IuWbvuWxgiAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiI+PHBhdGggZD0iTTMuNDkgNi40OWEuNjkuNjkgMCAwMS0xLTFsMy0zQS42OS42OSAwIDAxNi43IDN2MTBhLjcuNyAwIDExLTEuNCAwVjQuNjl6IiBmaWxsPSIjMzJhYWZmIi8+PHBhdGggZD0iTTEwLjcgMTEuMzFsMS44MS0xLjhhLjY5LjY5IDAgMDExIDFsLTMgM0EuNjkuNjkgMCAwMTkuMyAxM1YzYS43LjcgMCAwMTEuNCAweiIgZmlsbD0iIzk5OSIgZmlsbC1vcGFjaXR5PSIuNSIvPjwvc3ZnPg==);
}

.comic-episodes .chapters-list .episode-item {
    display: inline-block;
    width: 100%;
    padding: .25rem;
    overflow: hidden;
    font-size: 1.16667rem;
    font-family: PingFang SC;
    font-style: normal;
    font-weight: 400;
    color: #e3e2e0;
    text-align: center;
    line-height: 3rem;
    box-sizing: border-box;
    vertical-align: top;
}

.comic-episodes .chapters-list .episode-item .item-body {
    border-radius: .25rem;
    border: .08333rem solid #3f3f3f;
}

.comic-episodes .chapters-list .episode-item .item-body.elli-bg {
    height: 3rem;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEIAAAAMCAYAAADWBmv0AAAACXBIWXMAACE4AAAhOAFFljFgAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAD1SURBVHgB7Za7DcIwEIb/OyCioGAERmADyCakQUIUwZMECoREA5sAGzBCRqDmddgJEilQCDjFFXxSClv/+YssvwhPkmTT5fY1FsEQ7ss5CmRhpuMtakSji/LwqkdBY2ebvffDUSrnS2jMJIX3j+l0cdYsDTvEDtjaudmFJ1pdnCzXo/LwqwjBeQYPNLuYhGNUhIgH8ECzi21Fv2pB4bD5DcUuxp8MuyKw/yJ/hA+KXSy3+6Fq2t298ECzi3EN5nY/pR/TRKn3Y0exi42JTkK3sLTIhoUuITzR7KJiv7t7SSi2vfmJK9jbp+kBnebcRNEJNaLN9QCjkc9MS259qgAAAABJRU5ErkJggg==);
    background-size: 30%;
}

.comic-info-component .page-normal .comic-deatil-box .evaluate .folder-icon.open {
    transition: transform .3s;
    transform: rotate(-90deg);
}
</style>