<script>
import { useTitle } from '@vueuse/core';
import { defineComponent } from "vue";
import VueHcaptcha from '@hcaptcha/vue3-hcaptcha';
import Ambassador from '@/helpers/ambassador';
import ls from '@/helpers/storage';
import ErrorMessage from '@/components/ErrorMessage.vue';
useTitle(`Login - ${import.meta.env.VITE_NAME}`);
export default defineComponent ({
    components: {
        ErrorMessage,
        VueHcaptcha
    },
    data() {
        return {
            username: '',
            password: '',
            siteKey: import.meta.env.VITE_HCAPTCHA_KEY,
            sUsername: '',
            sPassword: '',
            sEmail: '',
            errorMsg: '',
            isSignUp: false,
            token: '',
            signError: false,
            imageHost: import.meta.env.VITE_WORDPRESS_URL,
        }
    },
    methods: {
        doLogin() {
            document.getElementById('loginBtn').setAttribute("disabled","disabled");
            this.errorMsg = "";
            Ambassador.loginAuth(this.username, this.password)
                .then((response) => {
                    ls.set('userInfo', response.data);
                    this.$router.push({ name: 'accountpage' });
                })
                .catch((error) => {
                    this.errorMsg = "Invalid Email or Password";
                    document.getElementById('loginBtn').removeAttribute("disabled");
                })
                .finally(() => { document.getElementById('loginBtn').removeAttribute("disabled"); });
        },
        doSignUp() {
            document.getElementById('signUpBtn').setAttribute("disabled","disabled");
            this.errorMsg = "";
            Ambassador.signUpAuth(this.sUsername, this.sEmail,this.sPassword, this.token)
                .then((response) => {
                    
                })
                .catch((error) => {
                    this.signError = true;
                    this.errorMsg = error.response.data.msg;
                    document.getElementById('signUpBtn').removeAttribute("disabled");
                    this.$refs.invisibleHcaptcha.reset();
                })
                .finally(() => { 
                    if (!this.signError) {
                        document.getElementById('signUpBtn').removeAttribute("disabled"); 
                        this.username = this.sUsername; 
                        this.password = this.sPassword; 
                        this.swapSign(); 
                        this.doLogin();
                    } else {
                        this.signError = false;
                    }
                    
                });
        },
        swapSign() {
            this.isSignUp = !this.isSignUp;
            if (this.isSignUp) {
                useTitle(`Sign Up - ${import.meta.env.VITE_NAME}`);
            } else {
                useTitle(`Login - ${import.meta.env.VITE_NAME}`);
            }
        },
        keepToken(token, eKey) {
            this.token = token;
        }
    },
    mounted() {
        if (ls.get('userInfo')) {
            this.$router.push({ name: 'accountpage' });
        }
    }
});
</script>

<template>
    <div class="container-scroller">
        <div class="container-fluid page-body-wrapper full-page-wrapper">
            <div class="row w-100 m-0">
                <div class="content-wrapper full-page-wrapper d-flex align-items-center auth">
                    <div class="card col-lg-4 mx-auto" :style="{display: isSignUp ? 'none' : 'block'}">
                        <div class="card-body px-5 py-5">
                            <h3 class="card-title text-left mb-3">Login</h3>
                            <ErrorMessage style="color: red">{{ errorMsg }}</ErrorMessage>
                            <form @submit.prevent="doLogin">
                                <div class="form-group">
                                    <label>Username or email *</label>
                                    <input type="text" class="form-control p_input" v-model.trim="username">
                                </div>
                                <div class="form-group">
                                    <label>Password *</label>
                                    <input type="password" class="form-control p_input" v-model.trim="password">
                                </div>
                                <div class="form-group d-flex align-items-center justify-content-between">
                                    <a :href="`${imageHost}/wp-login.php?action=lostpassword`" class="forgot-pass">Forgot password</a>
                                </div>
                                <div class="text-center">
                                    <button id="loginBtn" type="submit" class="btn btn-primary btn-block enter-btn">Login</button>
                                </div>
                                <p class="sign-up">Don't have an Account? <a @click="swapSign">Sign Up</a></p>
                            </form>
                        </div>
                    </div>
                    <div class="card col-lg-4 mx-auto" :style="{display: isSignUp ? 'block' : 'none'}">
                        <div class="card-body px-5 py-5">
                            <h3 class="card-title text-left mb-3">Sign Up</h3>
                            <ErrorMessage style="color: red">{{ errorMsg }}</ErrorMessage>
                            <form @submit.prevent="doSignUp">
                                <div class="form-group">
                                    <label>Username *</label>
                                    <input type="text" class="form-control p_input" v-model.trim="sUsername" required>
                                </div>
                                <div class="form-group">
                                    <label>Email *</label>
                                    <input type="email" class="form-control p_input" v-model.trim="sEmail" required>
                                </div>
                                <div class="form-group">
                                    <label>Password *</label>
                                    <input type="password" class="form-control p_input" v-model.trim="sPassword" minlength="6" required>
                                </div>
                                <div class="form-group">
                                    <vue-hcaptcha :sitekey="siteKey" ref="invisibleHcaptcha" @verify="keepToken" />
                                </div>
                                <div class="text-center">
                                    <button id="signUpBtn" type="submit" class="btn btn-primary btn-block enter-btn">Sign Up</button>
                                </div>
                                <p class="sign-up">Already have an account? <a @click="swapSign">Log In Instead</a></p>
                            </form>
                        </div>
                    </div>
                </div>
                <!-- content-wrapper ends -->
            </div>
            <!-- row ends -->
        </div>
        <!-- page-body-wrapper ends -->
    </div>
</template>

<style scoped>
body {
    padding-bottom: 0px !important;
}
</style>