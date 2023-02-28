<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
    props: {
        hitem: Object as any,
    },
    inheritAttrs: false,
});
</script>

<template>
    <div class="group-list a-move-in-left">
        <div class="history-card-horizontal dp-i-block p-relative v-top border-box data-item">
            <div class="text-section h-100 p-relative border-box">
                <a :href="'/read/' + hitem.post_name">
                    <h2 class="manga-title t-no-wrap t-over-hidden">
                        {{ hitem.post_title }}
                    </h2>
                </a>
                <div class="footer-text w-100 p-absolute border-box">
                    <div class="text">{{ hitem.chapter_name }}</div>
                </div>
            </div>
            <div class="action-section">
                <a :href="'/read/' + hitem.post_name + '/' + hitem.chapter_slug" class="btn no-bg">Keep Reading</a>
            </div>
        </div>
    </div>

</template>

<style scoped>
.group-list {
    padding: 0 0 4px;
}

.history-card-horizontal {
    display: flex;
    height: 76px;
}

.data-item {
    width: 100%;
}

.history-card-horizontal .text-section {
    padding: 0 0 0 12px;
    flex: 1;
    min-width: 156px;
}

.history-card-horizontal .text-section .manga-title {
    margin: 0;
    font-size: 14px;
    font-weight: 400;
    color: rgba(255, 255, 255, .87);
}

.history-card-horizontal .text-section .footer-text {
    font-size: 12px;
    color: rgba(255, 255, 255, .3);
    line-height: 1.6;
}

.history-card-horizontal .text-section .footer-text .text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.history-card-horizontal .action-section .btn {
    width: 110px;
    height: 28px;
    line-height: 28px;
    font-size: 12px;
    padding: 0;
    margin: 0;
}
</style>