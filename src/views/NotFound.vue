<script lang="ts">
import { useTitle } from '@vueuse/core';
useTitle(`NOT FOUND - ${import.meta.env.VITE_NAME}`);
</script>

<template>
<div class="content-container">
    <div class="size-ruler">
        <div class="page-title">

        </div>
        <div class="hint-image">
            <img class="tv-image" src="@/assets/404.png">
        </div>
        <div class="action-buttons">
            <a href="/">
                <button class="back-button">
                    Back to Home
                </button>
            </a>
        </div>
    </div>
</div>
</template>
<style scoped>
.content-container {
    width: 100%;
    height: 100%;
    padding: 15px;
    position: absolute;
    top: 0;
    left: 0;
    box-sizing: border-box;
    background-color: #050505;
}
.content-container, .content-container .size-ruler {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.content-container, .content-container .size-ruler {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.content-container .size-ruler {
    min-width: 300px;
    max-width: 600px;
}
.content-container .page-title {
    font-size: 36px;
    text-align: center;
}
.content-container .tv-image {
    max-width: 100%;
    margin-top: 30px;
}
.content-container .action-buttons {
    margin-top: 30px;
}
.content-container .action-buttons .back-button {
    width: 130px;
    height: 36px;
    background-color: #32aaff;
    font-size: 16px;
    color: #fff;
    border-radius: 8px;
    border: none;
    cursor: pointer;
}

</style>