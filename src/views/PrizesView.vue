<script lang="ts">
import NavBar from '@/components/bars/NavBar.vue';
import Coin from '@/components/icons/Coin.vue';
import TabBar from '@/components/bars/TabBar.vue';
import PrizeStand from '@/components/misc/PrizeStand.vue';
import Ambassador from '@/helpers/ambassador';
import ls from '@/helpers/storage';
import { useTitle } from '@vueuse/core';
import { defineComponent } from "vue";
export default defineComponent({
    components: {
        NavBar,
        TabBar,
        PrizeStand,
        Coin,
    },
    data() {
        return {
            errorMsg: "",
            error: false,
            loadingMsg: "Loading...",
            loading: true,
            data: [],
            isLoggedIn: false,
            myCoins: 0,
        }
    },
    mounted() {
        useTitle(`Prizes - ${import.meta.env.VITE_NAME}`);
        if (ls.get('userInfo')) {
            this.isLoggedIn = true;
            Ambassador.userInfo(ls.get('userInfo').token)
                .then((response) => {
                    this.myCoins = response.data.meta._user_coins < 0 ? 0 : response.data.meta._user_coins;
                })
                .catch((error) => {
                    console.log(error);
                    this.error = true;
                })
                .finally(() => {
                    this.loading = false;

                });
        } else {
            this.loading = false;
        }
    }
});

</script>

<template>
    <div class="app-container with-navbar" v-if="!loading">
        <NavBar />
        <div class="p-8">
            <h2>Your Balance: <Coin /> <span class="text-warning">{{ myCoins }}</span> Coins</h2>
            <p>
                Get prizes for <a
                    href="https://play.google.com/store/apps/details?id=games.delta.legendsevolved">Legends Evolved</a>
                and more just by reading at Manga Abyss! How great is that? Earning rewards for doing something you
                enjoy!
            </p>
        </div>
        <PrizeStand :cat="(1 as number)" name="Legends Evolved" url="https://play.google.com/store/apps/details?id=games.delta.legendsevolved" />
        <TabBar />
    </div>
    <div class="t-center" v-else>
        <img src="@/assets/mogoose.gif" />
        <div>Loading...</div>
    </div>
</template>