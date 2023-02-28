<script setup lang="ts">

type mangaT = {
    comic_id: number,
    thumb: string,
    title: string,
    url: string,
    lupdated: string,
}
defineProps<{
    manga: mangaT,
    ranking: number,
}>();

const imageHost = import.meta.env.VITE_WORDPRESS_URL;

</script>

<template>
    <li>
        <a :href="'/read/' + manga.url">
            <div class="row">
                <div class="col num">
                    <span class="rank1">
                        {{ ranking + 1 }}
                    </span>
                </div>
                <div class="col pic">
                    <span>
                        <img :src="`${imageHost}/wp-content/uploads/` + manga.thumb" width="100%"
                            alt="Lore Olympus">
                    </span>
                </div>
                <div class="col info">
                    <p class="col subj f-left">
                        <strong class="ellipsis">
                            {{ manga.title }}
                        </strong>
                    </p>
                    <div class="f-right text-secondary">
                        {{ manga.lupdated }}
                    </div>
                </div>
            </div>
        </a>
    </li>
</template>

<style scoped>
.num {
    width: 42px;
    height: 58px;
    font-size: 14px;
    text-align: center;
}

.pic {
    width: 40px;
}

.info {
    padding: 0 16px 0 10px;
}

.subj {
    height: 17px;
    padding-top: 1px;
    font-size: 13px;
}

.subj .ellipsis {
    line-height: 16px;
}

.pic span {
    position: relative;
    display: inline-block;
    -webkit-border-radius: 4px;
    border-radius: 4px;
    vertical-align: middle;
    overflow: hidden;
}

.pic span:before {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: .5px solid rgba(0, 0, 0, .1);
    -webkit-border-radius: 4px;
    border-radius: 4px;
    content: "";
}

.pic span img {
    width: 40px;
    height: 40px;
}
</style>