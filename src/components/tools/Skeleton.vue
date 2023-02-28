<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent ({
    props: {
        isHidden: Boolean,
    },
    methods: {
        hideani(e: any) {
            console.log('poop');
        }
    }
});
</script>

<template>
    <div class="skeleton p-relative">
        <div class="skeleton-wrapper t-center" v-if="!isHidden">
            <div class="skeleton-cards">
                <div class="skeleton-title active"></div>
                <div class="skeleton-cards-rows">
                    <div class="skeleton-cards-col border-box dp-i-block" style="width: 33.3333%;">
                        <div class="skeleton-cards-item bg-center bg-no-repeat active" style="padding-top: 133.333%;">
                        </div>
                    </div>
                    <div class="skeleton-cards-col border-box dp-i-block" style="width: 33.3333%;">
                        <div class="skeleton-cards-item bg-center bg-no-repeat active" style="padding-top: 133.333%;">
                        </div>
                    </div>
                    <div class="skeleton-cards-col border-box dp-i-block" style="width: 33.3333%;">
                        <div class="skeleton-cards-item bg-center bg-no-repeat active" style="padding-top: 133.333%;">
                        </div>
                    </div>
                </div>
                <div class="skeleton-cards-rows">
                    <div class="skeleton-cards-col border-box dp-i-block" style="width: 33.3333%;">
                        <div class="skeleton-cards-item bg-center bg-no-repeat active" style="padding-top: 133.333%;">
                        </div>
                    </div>
                    <div class="skeleton-cards-col border-box dp-i-block" style="width: 33.3333%;">
                        <div class="skeleton-cards-item bg-center bg-no-repeat active" style="padding-top: 133.333%;">
                        </div>
                    </div>
                    <div class="skeleton-cards-col border-box dp-i-block" style="width: 33.3333%;">
                        <div class="skeleton-cards-item bg-center bg-no-repeat active" style="padding-top: 133.333%;">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="skeleton-body">
            <slot @hide-skeleton="hideani"></slot>
        </div>
    </div>
</template>

<style scoped>
.skeleton {
    width: 100%;
}

.skeleton .skeleton-title {
    width: 30%;
    height: 1.66667rem;
    border-radius: .33333rem;
    margin: .66667rem;
    padding: .66667rem 1.33333rem;
    background-color: #efefef
}

.skeleton .skeleton-cards-col {
    padding: .66667rem .66667rem 3.33333rem
}

.skeleton .skeleton-cards-item {
    background-color: #efefef;
    background-size: 50%;
    border-radius: .33333rem
}

.skeleton .active {
    background: linear-gradient(90deg, hsla(0, 0%, 74.5%, .2) 25%, hsla(0, 0%, 50.6%, .24) 37%, hsla(0, 0%, 74.5%, .2) 63%) 100% 40%;
    background-size: 400% 100%;
    animation: skeleton-loading-data 1.4s ease infinite
}

.skeleton .active .skeleton-body {
    width: 100%;
    top: 0;
    left: 0
}

@keyframes skeleton-loading-data {
    0% {
        background-position: 100% 50%
    }

    to {
        background-position: 0 50%
    }
}
</style>