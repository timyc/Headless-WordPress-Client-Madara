<script lang="ts">
import NavBar from '@/components/bars/NavBar.vue';
import TabBar from '@/components/bars/TabBar.vue';
import Cookies from '@/components/misc/Cookies.vue';
import SingleComments from '@/components/misc/SingleComments.vue';
import { defineComponent } from "vue";
import { useTitle } from '@vueuse/core';
import Ambassador from '@/helpers/ambassador';
export default defineComponent({
    components: {
        NavBar,
        TabBar,
        Cookies,
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
            imageHost: import.meta.env.VITE_WORDPRESS_URL,
        }
    },
    mounted() {
        document.getElementById('manga-mobile-app')!.className = '';
        Ambassador.getArticle(this.$route.params.slug as string)
            .then((response) => {
                this.data = response.data.data;
                if (response.data.data.title === undefined) {
                    throw new Error('peepee poopoo');
                }
            })
            .catch((error) => {
                this.errorMsg = error.response.data.msg;
                this.error = true;
                this.loadingMsg = "";
                window.location.replace('/404');
            })
            .finally(() => { if (!this.error) this.loading = false; useTitle(`${this.data.title} - ${import.meta.env.VITE_NAME}`); });
    }
});
</script>

<template>
    <div class="app-container has-commet">
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
                
                <p>
                    <h1>{{ data.title }}</h1>
                    <pre v-html="data.description"></pre>
                </p>
                <SingleComments :pid="data.comic_id" :url="`${imageHost}/` + $route.params.slug + '/'" />
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
pre {
    white-space: pre-wrap;
    word-wrap: break-word;
}
p {
    padding: 10px;
}
</style>