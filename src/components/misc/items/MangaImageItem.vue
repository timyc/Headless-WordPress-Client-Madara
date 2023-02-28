<script lang="ts">
import { defineComponent } from "vue";
import ls from '@/helpers/storage';
export default defineComponent({
    props: {
        image: Object as any,
        index: String,
    },
    data() {
        return {
            isLoaded: false,
            isVisible: false,
            isPaged: ls.get('paged') == true ? true : false,
            imageHost: import.meta.env.VITE_WORDPRESS_URL
        }
    },
    methods: {
        loaded() {
            this.isLoaded = true;
        },
        visibilityChanged(isVisible: any) {
            this.isVisible = isVisible;
            if (isVisible) {
                this.$emit('sliderUpdate', parseInt(this.index!));
            }
        },
    },
});
</script>

<template>
    <div :class='["manga-image-view", "view-item", {"full-height": isPaged}]' :index="index" v-observe-visibility="{callback: visibilityChanged, intersection: {threshold: 0.7}}" style="scroll-snap-align: start">
        <div class="loading-indicator" :style="{ display: isLoaded ? 'none' : 'block' }">
            This image is loading...
        </div>
        <template v-if="image.src[0] == 'm'">
            <img :src="`${imageHost}/wp-content/uploads/WP-manga/data/` + image.src" @load="loaded"
                v-show="isLoaded" />
        </template>
        <template v-else>
            <img :src="image.src" @load="loaded" v-show="isLoaded" />
        </template>
    </div>
</template>

<style scoped>
.loading-indicator {
    min-height: 60vh;
    padding: 50px;
    margin: 40px 0;
    text-align: center;
    color: #9ea2b3;
    font-size: 12px;
}

.view-item {
    width: 100%;
    flex-shrink: 0;
    direction: ltr;
    box-sizing: border-box;
    flex-direction: column;
}

.manga-image-view {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
}

img {
    max-width: 100%;
    max-height: 100%;
}
.full-height {
    height: 100%;
}
</style>