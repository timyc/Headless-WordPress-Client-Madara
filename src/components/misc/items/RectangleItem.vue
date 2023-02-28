<script setup lang="ts">

type postT = {
    comic_id: number,
    post_content: string,
    post_title: string,
    post_name: string,
    image: string,
}
defineProps<{
    post: postT,
}>();

</script>

<template>
    <li>
        <a :href="'/article/' + post.post_name">
            <div class="pic"
                :style="'background-image:url(' + post.image + ')'">
            </div>
            <div class="info">
                <p class="subj">
                    <span class="ellipsis">
                        {{ post.post_title }}
                    </span>
                </p>
                <p class="summary">
                    <span class="ellipsis" v-html="post.post_content"></span>
                </p>
            </div>
        </a>
    </li>
</template>

<style scoped>
a {
    position: relative;
    height: 107px;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    overflow: hidden;
}
.pic {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    -webkit-background-size: cover;
    background-size: cover;
    background-position: 100% 0;
    z-index: -10;
}

.info {
    margin: 0 195px 0 17px;
    -webkit-text-stroke-width: 0.02rem;
    -webkit-text-stroke-color: black;
}

.info .subj {
    margin-top: 2px;
    font-size: 16px;
    line-height: 14px;
    color: #fff;
}

.summary {
    margin-top: 6px;
    font-size: 13px;
    line-height: 12px;
    color: #fff;
}
.ellipsis {
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: break-word;
}
</style>