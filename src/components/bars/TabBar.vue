<script lang="ts">
import TabBarItem from './items/TabBarItem.vue';
import { defineComponent } from "vue";
export default defineComponent ({
    components: {
        TabBarItem,
    }
});
</script>

<template>
    <div class="tabbar-container w-100 p-fixed">
        <div class="tabbar dp-flex">
            <TabBarItem title="Home" icon="home" @click="$router.push({ name: 'home' });" />
            <TabBarItem title="Prizes" icon="prize" @click="$router.push({ name: 'prizepage' });" />
            <TabBarItem title="User" icon="me" @click="$router.push({ name: 'accountpage' });" />
        </div>
    </div>
</template>

<style scoped>
.tabbar {
    box-sizing: content-box;
    width: 100%;
    height: 4.16667rem;
    background: #000;
    border-top: 1px solid #1a1a1a;
    padding-bottom: env(safe-area-inset-bottom);
}
</style>