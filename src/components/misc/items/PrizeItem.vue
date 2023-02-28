<script setup lang="ts">
type prizeT = {
    cost: number,
    description: string,
    id: number,
    image: string,
    name: string,
    stock: number,
}
defineProps<{
  prize: prizeT;
}>();
</script>

<template>
    <div class="card p-relative dp-i-block">
        <div class="card-img-top t-center">
            <img :src="prize.image" />
        </div>

        <div class="card-body">
            <h3 class="card-title">{{ prize.name }} ({{ prize.stock }} left)</h3>
            <p class="card-text">{{ prize.description }}</p>
            <div :class="['btn', {'disabled': prize.stock == 0}]">{{ prize.cost }} Coins</div>
        </div>
    </div>
</template>

<style scoped>
img {
    max-width: 100%;
    max-height: 100%;
}
.card {
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    width: 45%;
    word-wrap: break-word;
    background-color: #000;
    background-clip: border-box;
    border: 1px solid rgba(255,255,255,.125);
    border-radius: .25rem;
    margin: auto;
}
.card-body {
    flex: 1 1 auto;
    padding: 1rem 1rem;
}
.card-title {
    margin-bottom: .5rem;
}
.disabled {
    background: gray;
    pointer-events: none;
}
</style>