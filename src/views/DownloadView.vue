<script lang="ts">
import NavBar from '@/components/bars/NavBar.vue';
import { useTitle } from '@vueuse/core';
import { defineComponent } from "vue";
export default defineComponent ({
    components: {
        NavBar
    },
    mounted() {
        useTitle(`Download APP - ${import.meta.env.VITE_NAME}`);
    }
});

</script>

<template>
    <div class="app-container with-navbar">
        <NavBar />
        <p>
            We do not have an APP for Manga Abyss yet! Do not download third party apps as they MAY CONTAIN MALWARE!
        </p>
    </div>
</template>