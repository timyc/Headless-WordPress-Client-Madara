<script lang="ts">
import { defineComponent } from "vue";
import Ambassador from '@/helpers/ambassador';
import ls from '@/helpers/storage';
export default defineComponent({
    methods: {
        bookmark() {
            if (ls.get('userInfo')) {
                this.noClick = true;
                Ambassador.doBookmark(ls.get('userInfo').token, this.bmChap, this.bmToon)
                    .then((response) => {
                        if (response.data.code == 200) {
                            this.$toast.success(response.data.msg);
                        } else {
                            this.$toast.error('An error occurred whilst updating bookmark');
                        }
                        
                    }).finally(() => {this.noClick = false;});
            } else {
                window.location.replace('/auth');
            }

        }
    },
    data() {
        return {
            noClick: false,
        }
    },
    props: {
        bmChap: {
            type: Number,
            default: 1
        },
        bmToon: {
            type: Number,
            default: 1
        }
    }
});
</script>

<template>
    <span :class="['bm-icon', 'bg-center', 'bg-no-repeat', 'dp-i-block', 'v-middle', {'disable-click': noClick}]" @click="bookmark"></span>
</template>

<style scoped>
.bm-icon {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB2ZXJzaW9uPSIxLjEiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDE2IDE2IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxwYXRoIGQ9Ik00IDJ2MTRsNS01IDUgNXYtMTR6TTEyIDBoLTEwdjE0bDEtMXYtMTJoOXoiIHN0eWxlPSJmaWxsOiByZ2IoMjU1LCAyNTUsIDI1NSk7Ii8+Cjwvc3ZnPg==);
    background-repeat: no-repeat;
}
</style>