<script lang="ts">
import { useTitle } from '@vueuse/core';
import { defineComponent } from "vue";
import TabBar from '@/components/bars/TabBar.vue';
import ProfileTopBar from '@/components/bars/ProfileTopBar.vue';
import UserWebtoons from '@/components/UserWebtoons.vue';
import Ambassador from '@/helpers/ambassador';
import ls from '@/helpers/storage';
export default defineComponent({
    data() {
        return {
            isLoggedIn: false,
            yourName: '',
            loading: true,
            bookmarks: Array(),
            history: Array(),
            error: false,
        }
    },
    components: {
        TabBar,
        ProfileTopBar,
        UserWebtoons,
    },
    mounted() {
        useTitle(`Account - ${import.meta.env.VITE_NAME}`);
        if (ls.get('userInfo')) {
            this.isLoggedIn = true;
            this.yourName = ls.get('userInfo').user_nicename;
            Ambassador.userInfo(ls.get('userInfo').token)
                .then((response) => {
                    for (let x = 0; x < response.data.meta._wp_manga_bookmark.length; x++) {
                        this.bookmarks.push(response.data.meta._wp_manga_bookmark[x].c);
                    }
                    for (let x = 0; x < response.data.meta._wp_manga_history.length; x++) {
                        this.history.push(response.data.meta._wp_manga_history[x].c);
                    }
                })
                .catch((error) => {
                    console.log(error);
                    this.error = true;
                })
                .finally(() => {
                    if (!this.error) {
                        Ambassador.listHistory(this.history)
                            .then((response) => {
                                this.history = response.data.data.list;
                            })
                            .catch((error) => {
                                console.log(error);
                                this.error = true;
                            })
                            .finally(() => {
                                if (!this.error) {
                                    this.loading = false;
                                }

                            });
                    } else {
                        ls.remove('userInfo');
                        window.location.reload();
                    }

                });
        } else {
            this.loading = false;
        }
    }
});

</script>

<template>
    <div class="app-container p-relative" v-if="!loading">
        <div class="me-page-index">
            <ProfileTopBar title="" />
            <div class="w-100 p-zero">
                <div class="container border-box">
                    <div class="avatar-box m-auto bg-center bg-cover"></div>
                    <template v-if="!isLoggedIn">
                        <div class="login-box t-center">
                            <span class="btn login pointer" @click="$router.push({ name: 'loginpage' })">
                                Log In
                            </span>
                        </div>
                    </template>
                    <template v-else>
                        <p class="nickname t-center">
                            {{ yourName }}
                        </p>
                    </template>
                </div>
                <UserWebtoons :history="history" :bookmarks="bookmarks" />
            </div>
            <TabBar />
        </div>
    </div>
    <div class="t-center" v-else>
        <img src="@/assets/mogoose.gif" />
        <div>Loading...</div>
    </div>
</template>

<style scoped>
.app-container {
    padding-bottom: 50px;
}

.me-page-index .setting-button {
    background-color: transparent;
    border: none;
}

.container {
    height: 12.33333rem;
    padding: 1.66667rem 0 0;
}

.container .avatar-box {
    margin-bottom: .66667rem;
    width: 5.66667rem;
    height: 5.66667rem;
    background-image: url(https://secure.gravatar.com/avatar/1339f128c831ca3dd7ab3342c82ea55d?s=100&d=mm&r=g);
    border-radius: 50%;
}

.container .avatar-box .pic {
    border-radius: 50%;
    border: .125rem solid #000;
}

.container .login-box {
    margin: .66667rem auto 0;
}

.container .login-box .login {
    height: 2.66667rem;
    letter-spacing: -.02778rem;
}
</style>