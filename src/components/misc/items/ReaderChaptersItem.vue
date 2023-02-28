<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent ({
    props: {
        chap: Object,
        title: String,
    },
    methods: {
        goChap() {

            window.history.pushState("", "", "//" + window.location.host + '/read/' + this.title + '/' + this.chap!.chapter_slug);
            window.location.reload();
        }
    }
});
</script>

<template>
    <div class="list-item dp-flex" @click="goChap">
        <div class="list-item-content dp-flex space-between p-relative">
            <div class="title">
                {{ chap!.chapter_name }}
            </div>
            <div class="date v-bottom">
                {{ chap!.date }}
            </div>
        </div>
    </div>
</template>