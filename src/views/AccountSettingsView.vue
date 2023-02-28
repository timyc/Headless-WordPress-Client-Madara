<script lang="ts">
import { useTitle } from '@vueuse/core';
import { defineComponent } from "vue";
import ProfileTopBar from '@/components/bars/ProfileTopBar.vue';
import AccountSettingsItem from '@/components/misc/items/AccountSettingsItem.vue';
import ls from '@/helpers/storage';
export default defineComponent({
    data() {
        return {
            isLoggedIn: false,
            yourName: '',
        }
    },
    components: {
        ProfileTopBar,
        AccountSettingsItem,
    },
    mounted() {
        useTitle(`Settings - ${import.meta.env.VITE_NAME}`);
        if (ls.get('userInfo')) {
            this.isLoggedIn = true;
            this.yourName = ls.get('userInfo').user_nicename;
        }
    },
    methods: {
        logOut() {
            ls.remove('userInfo');
            this.isLoggedIn = false;
            this.$router.push({name: 'home'});
        }
    }
});

</script>

<template>
    <div class="app-container p-relative">
        <div class="page-settings dp-flex flex-column w-100 h-100 p-fixed border-box">
            <ProfileTopBar title="Settings" />
            <div class="option-list">
                <AccountSettingsItem v-if="isLoggedIn">
                    Change Password
                </AccountSettingsItem>
            </div>
            <div class="bottom-action-area t-center border-box" v-if="isLoggedIn">
                <button class="btn-logout t-center dp-i-block pointer" @click="logOut">
                    Log Out
                </button>
            </div>
            <div class="bottom-ins-area t-center">
                <div>
                    Manga Abyss
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.page-settings {
    background: #000;
    top: 0;
    left: 0;
}
.page-settings .option-list {
    flex-grow: 1;
    padding: 0 .83333rem;
    overflow: auto;
    margin-top: 65px;
}
.bottom-action-area {
    padding: 10px;
}
.bottom-action-area .btn-logout {
    width: 100%;
    height: 4rem;
    background: #000;
    border: 1px solid #32aaff;
    box-sizing: border-box;
    border-radius: .66667rem;
    line-height: 4rem;
    color: #32aaff;
    font-size: 1.33333rem;
    font-weight: 500;
}
.bottom-ins-area {
    font-size: 12px;
    line-height: 17px;
    color: #99999a;
    font-family: Poppins-Regular;
    margin-top: 30px;
    margin-bottom: 12px;
}
</style>