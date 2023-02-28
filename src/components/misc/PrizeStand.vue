<script lang="ts">
import PrizeItem from '@/components/misc/items/PrizeItem.vue';
import Ambassador from '@/helpers/ambassador';
import { defineComponent } from "vue";
export default defineComponent({
    components: {
        PrizeItem,
    },
    props: {
        cat: {
            type: Number,
            default: 0,
        },
        name: {
            type: String,
            default: "",
        },
        url: {
            type: String,
            default: `${import.meta.env.VITE_WORDPRESS_URL}}`,
        },
    },
    data() {
        return {
            errorMsg: "",
            error: false,
            loadingMsg: "Loading...",
            loading: true,
            data: [],
        }
    },
    mounted() {
        Ambassador.listStore(this.cat)
            .then((response) => {
                this.data = response.data.data.items;
            })
            .catch((error) => {
                this.errorMsg = error.response.data.msg;
                this.error = true;
                this.loadingMsg = "";
            })
            .finally(() => { if (!this.error) this.loading = false;});
    }
});

</script>

<template>
    <h2 class="p-8">
        {{ name }} (<a :href="url" class="text-barney">Visit</a>)
    </h2>
    <div class="dp-flex">
        <PrizeItem v-for="(item, index) in data" :key="index" :prize="item" />
    </div>
</template>