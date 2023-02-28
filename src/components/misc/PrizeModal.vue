<script>
import { defineComponent } from "vue";
import VueHcaptcha from '@hcaptcha/vue3-hcaptcha';
import Coin from '@/components/icons/Coin.vue';
import ls from '@/helpers/storage';
import Ambassador from '@/helpers/ambassador';
export default defineComponent({
    components: {
        VueHcaptcha,
        Coin,
    },
    data() {
        return {
            isVisible: false,
            siteKey: import.meta.env.VITE_HCAPTCHA_KEY,
            cMsg: "Please log in to obtain rewards!",
        }
    },
    methods: {
        completeChallenge(token, eKey) {
            Ambassador.doHcaptcha(ls.get('userInfo').token, token)
                .then((response) => {
                    if (response.data.code == 200) {
                        this.$toast.success(`You got ${response.data.msg} coins!`);
                    } else {
                        this.$toast.error(`An error occurred. Try again later.`);
                        ls.remove('userInfo');
                        ls.remove('last_hcaptcha');
                    }

                }).finally(() => {
                    let timestamp = Math.floor(Date.now() / 1000);
                    ls.set('last_hcaptcha', timestamp);
                    this.$refs.invisibleHcaptcha.reset();
                    this.visibleCheck();
                });
        },
        visibleCheck() {
            let timestamp = Math.round(Date.now() / 1000);
            if (!ls.get('last_hcaptcha') || timestamp - ls.get('last_hcaptcha') > 600) {
                if (ls.get('userInfo')) {
                    this.isVisible = true;
                }
            } else {
                if (ls.get('userInfo')) {
                    this.cMsg = "You can obtain rewards again later!"
                }
                this.isVisible = false;
            }
        }
    },
    mounted() {
        this.visibleCheck();
        window.setInterval(() => {
            this.visibleCheck();
        }, 60000);
    }
});
</script>

<template>
    <vue-hcaptcha :sitekey="siteKey" ref="invisibleHcaptcha" @verify="completeChallenge" v-if="isVisible">
    </vue-hcaptcha>
    <div v-else>
        {{ cMsg }}
    </div>
</template>
