<script lang="ts">
import { ref, watch } from 'vue'
import { makeUseInfiniteScroll } from 'vue-use-infinite-scroll'
import Ambassador from '@/helpers/ambassador';
import MangaItem from '@/components/misc/items/MangaItem.vue';
import { defineComponent } from "vue";
export default defineComponent ({
    components: {
        MangaItem
    },
    setup() {
        // INTERSECTION OBSERVER

        // set the intersection options object
        // https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
        const useInfiniteScroll = makeUseInfiniteScroll({}) // the argument is optional

        // create the template ref for the element that
        // will trigger the intersection observer
        const intersectionTrigger = ref(null as any) // as Ref<HTMLElement>

        // useInfiniteScroll returns a pageRef, starting from page 1,
        // which changes we should listen to fetch more data
        const pageRef = useInfiniteScroll(intersectionTrigger)

        watch(
            pageRef,
            (page) => {
                fetchItems(page)
            },
            { immediate: true }
        )

        // DATA

        const itemsRef = ref([] as any)
        const errorMessageRef = ref('')

        async function fetchItems(page: number) {
            const urlParams = new URLSearchParams(window.location.search);
            Ambassador.getMangas(page, 18, urlParams.get('styles') || '0')
                .then((res) => res.data.data.webtoons)
                .then((data) => itemsRef.value.push(...data))
                .catch((error) => (errorMessageRef.value = error.message))
        }

        return { intersectionTrigger, itemsRef, errorMessageRef }
    },
});
</script>

<template>
    <span>{{ errorMessageRef }}</span>
    <div class="manga-list m-auto">
        <div class="list-data border-box m-auto">
            <MangaItem v-for="(item, index) in itemsRef" :key="index" :manga="item" />
            <!-- DOM element used as trigger -->
            <div ref="intersectionTrigger"></div>
        </div>
    </div>
</template>

<style scoped>
.manga-list {
    padding: .66667rem .66667rem 1.33333rem;
    max-width: 50rem;
}

.classify-list-container .label-list {
    max-width: 50rem;
    padding: .83333rem 1.33333rem 0;
    color: #6c727e;
}
</style>