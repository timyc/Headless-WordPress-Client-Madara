<script lang="ts">
import { defineComponent } from "vue";
import urlJoin from 'url-join';
import { RouterLink } from "vue-router";
export default defineComponent ({
    components: {
        RouterLink,
    },
    inheritAttrs: false,
    props: {
        chdata: Object,
    },
    data() {
        return {
            cururl: urlJoin(this.$router.currentRoute.value.fullPath, this.chdata?.chapter_slug),
        }
    },
});
</script>

<template>
    <RouterLink :to="cururl" class="episode-item" :chapter_id='chdata?.chapter_id' >
            <!--{{ chdata?.chapter_name.split(' ').length > 1 ? chdata?.chapter_name.split(' ')[1] : chdata?.chapter_name }}-->
            <span class="f-left">{{ chdata?.chapter_name }}</span><span class="f-right text-secondary">{{ chdata!.lupdated }}</span>
    </RouterLink>
</template>

<style scoped>
.item-body {
    border-radius: .20rem;
    border: .08333rem solid #3f3f3f;
}
</style>