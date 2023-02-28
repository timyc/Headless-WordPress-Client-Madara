<script lang="ts">
import WebtoonPageNavBar from '@/components/bars/WebtoonPageNavBar.vue';
import TabBar from '@/components/bars/TabBar.vue';
import Cookies from '@/components/misc/Cookies.vue';
import SingleCover from '@/components/misc/SingleCover.vue';
import SingleInformation from '@/components/misc/SingleInformation.vue';
import SingleComments from '@/components/misc/SingleComments.vue';
import { defineComponent } from "vue";
import { useTitle } from '@vueuse/core';
import Ambassador from '@/helpers/ambassador';
export default defineComponent({
    components: {
        WebtoonPageNavBar,
        TabBar,
        Cookies,
        SingleCover,
        SingleInformation,
        SingleComments,
    },
    data() {
        return {
            data: {
                title: "",
                thumb: "",
                genres: [],
                authors: [],
                style: "",
                description: "",
                comic_id: 0,
                chapters: [{'chapter_id': 0}],
            },
            error: false,
            errorMsg: "",
            loading: true,
            loadingMsg: "loading...",
            topBarBG: true,
            imageHost: import.meta.env.VITE_WORDPRESS_URL,
        }
    },
    mounted() {
        document.getElementById('manga-mobile-app')!.className = '';
        Ambassador.getSingleManga(this.$route.params.slug as string)
            .then((response) => {
                this.data = response.data.data;
                /*if (response.data.data.title === undefined) {
                    throw new Error('peepee poopoo');
                }*/
            })
            .catch((error) => {
                this.errorMsg = error.response.data.msg;
                this.error = true;
                this.loadingMsg = "";
                window.location.replace('/404');
            })
            .finally(() => { if (!this.error) this.loading = false; useTitle(`${this.data.title} - ${import.meta.env.VITE_NAME}`); });
    },
    methods: {
        changeTopBar(bool: boolean) {
            this.topBarBG = bool;
        }
    }
});
</script>

<template>
    <div class="app-container has-commet">
        <WebtoonPageNavBar :topBarBG='(topBarBG as boolean)' :title='data.title' :bmChap="data.chapters[data.chapters.length - 1].chapter_id || 0" :bmToon="data.comic_id || 0" />
        <div class="comic-info-component">
            <ErrorMessage v-if="error">{{ errorMsg }}</ErrorMessage>
            <template v-if="loading">
                <div class="t-center" :style="{'display': error ? 'none' : 'block'}">
                    <br />
                    <img src="@/assets/loading.gif" />
                    <div>{{ loadingMsg }}</div>
                </div>
            </template>
            <template v-else>
                <SingleCover :title='data.title' :thumb='data.thumb' :genres='data.genres' :cstyle='data.style'
                    :authors='data.authors' @visibility-change="changeTopBar" />
                <SingleInformation :description='data.description' :chapters='data.chapters' />
                <SingleComments :pid="data.comic_id" :url="`${imageHost}/read/` + $route.params.slug + '/'" />
            </template>
        </div>
        <Cookies />
        <TabBar />
    </div>
</template>

<style scoped>
.app-container.with-navbar {
    padding-top: 3.75rem;
}

.app-container.has-commet {
    padding-bottom: 10rem;
}
</style>