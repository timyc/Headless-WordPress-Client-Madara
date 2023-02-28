<script lang="ts">
import ls from '@/helpers/storage';
import { defineComponent } from "vue";
export default defineComponent({
    data() {
        return {
            cookied: ls.get('canData'),
            pclosed: 0,
            analytics: true,
            showSettings: 0,
            titles: ["Our use of cookies", "Manage Cookie Settings"],
        }
    },
    methods: {
        closePopup(e: any) {
            e.target.parentElement.className += ' a-move-out-bottom';
            setTimeout(() => {
                this.pclosed = 1;
            }, 100);
        },
        canCookie(e: any) {
            e.target.parentElement.parentElement.className += ' a-move-out-bottom';
            setTimeout(() => {
                ls.set('canData', [1, this.analytics]);
            }, 100);
        },
        settingsPanel() {
            this.showSettings = 1;
        },
    }
});
</script>

<template>
    <div class="cookie-wrapper p-fixed w-100 border-box">
        <div class="cookie-popup p-relative" v-if="cookied == null && pclosed == 0">
            <div class="close-icon bg-center bg-cover p-absolute dp-i-block v-middle" @click="closePopup"></div>
            <div class="title">
                {{ titles[showSettings] }}
            </div>
            <template v-if="!showSettings">
                <div class="content">
                    Thank the Europeans for this annoying message!
                    See <a href="/cookies" class="link">Cookies Policy</a> for more information.
                </div>
            </template>
            <template v-else>
                <div class="settings">
                    <div class="setting-item">
                        <div class="item">
                            <div class="name">
                                Functional Cookies
                            </div>
                            <input type="checkbox" disabled class="opt switch" checked>
                        </div>
                        <div class="detail">
                            These cookies are make the website work. Cannot be modified.
                        </div>
                    </div>
                    <div class="setting-item">
                        <div class="item">
                            <div class="name">
                                Personalization Cookies
                            </div>
                            <input type="checkbox" class="opt switch" v-model="analytics">
                        </div>
                        <div class="detail">
                            These cookies optimize your experience on Manga Abyss.
                        </div>
                    </div>
                </div>
            </template>
            <div class="action-btns dp-flex">
                <template v-if="!showSettings">
                    <button class="action-btn goust" @click="settingsPanel">Cookie Settings</button>
                </template>
                <button class="action-btn primary" @click="canCookie">Accept Cookies</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.cookie-popup {
    color: #fff;
    background: rgba(37, 3, 57, 0.95);
    padding: 1.33333rem 1.66667rem;
}

.cookie-popup .close-icon {
    right: 1.33333rem;
    top: 1.33333rem;
    height: 1.66667rem;
    width: 1.66667rem;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEIAAABCCAYAAADjVADoAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAQqADAAQAAAABAAAAQgAAAADorYEXAAACaUlEQVR4Ae3ZP0vEMBgG8KuIIDqIkyA43OTgR3A6HMTv6noucqv7DerkJqiDo4Oo5/Mc7RFC/+dNIvIEctfm2jfpr0naXicTJQlIQAISkIAEJCABCUhAAhKQgAQkIAEJ5BQoLCtfrVZTxDtBfkN+KIpiZRUfsQ8Q6wz5C3mJ2B9WsRnHDKJEuHAa94TlBRr845SNWkTsI+x4hbxdBnjH97Ul9FYZ2OKLPcFN7B0zHERQHTUIrOMQeY8LVimokV4jOBz8FITRgMA6OCxMh4YlxCMax+Hgp1EYLQicI24thpzbULM5gkHLYTDDIg/eT73njA6EORBe/OCh66YQbEwoRg4EttscIgQjF0I0iDEYORGiQgzByI0QHaInxj22u0Subpa4GxOvDlEmxnV07yPKHOHV0TWB+ptzPSkCK0wCwYrQ/XnP0nRp5SZVSo7AipNBsLIeGFkQ2DaepWSpvBvknNCUXvFD3a160/Zm5UkhyqsDJ8amdIwfgh/UmoK3lScbGi2XyLr29b4dr9t5TFmSHtGCwDnhuabhU5Ql7RnRIToQ5jjgG2Szp9Ya1F5FUYdGF0L1FInteEJmyOwJfkoyTKJB9EWojjo3RhSIoQh/AcMcYixCbgxTiFCEnBhmVw0g8L2D+5d7dVyDb5vLO9AFAjRdTc6r4FbfZhBoEF++mD1Kd2CcAn7XCoFxLCF45t00uCe4O3O5BYNv0L797UPWLSGWaAjfQDHxnYPJnyoOBl8XMBHhDuWf67W/+IHuWiDvI1sCbw6VwwF5Z1OgBQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSOC/CfwCdAgbnZH5NyUAAAAASUVORK5CYII=);
}

.cookie-popup .title {
    font-size: 17px;
    font-weight: 600;
}

.cookie-popup .content {
    font-weight: 400;
    line-height: 1.66667rem;
    font-size: 14px;
    margin-top: .5rem;
    color: hsla(0, 0%, 100%, .5);
    margin-bottom: 1rem;
}

.cookie-popup .content .link {
    color: #fff;
    text-decoration: underline;
}

.cookie-popup .action-btn.goust {
    background: transparent;
    color: hsla(0, 0%, 100%, .45);
    border: 1px solid hsla(0, 0%, 100%, .1);
}

.cookie-popup .action-btn {
    flex: 1;
    font-size: 14px;
    font-weight: 600;
    text-align: center;
    height: 3.33333rem;
    line-height: 3.33333rem;
    border-radius: 0.333rem;
    border: none;
}

.cookie-popup .action-btn:last-child:not(:first-child) {
    margin-left: .66667rem;
}

.cookie-popup .action-btn.primary {
    color: #fff;
    background: #700B97;
}

.cookie-popup .settings {
    margin-bottom: 2rem;
}

.cookie-popup .setting-item {
    padding-bottom: 12px;
}

.cookie-popup .setting-item:first-child {
    border-bottom: 1px solid #3e404a;
}

.cookie-popup .setting-item .item {
    height: 3.33333rem;
    display: flex;
    align-items: center;
}

.cookie-popup .setting-item .detail {
    font-weight: 400;
    color: #90929b;
}

.cookie-popup .setting-item .name {
    font-size: 1.16667rem;
    font-weight: 400;
    color: #fff;
}

.cookie-popup .setting-item .opt {
    color: hsla(0, 0%, 100%, .95);
}

.cookie-popup input[type=checkbox].switch {
    margin-left: 12px;
    outline: none;
    -webkit-appearance: none;
    appearance: none;
    position: relative;
    width: 3rem;
    height: 1.83333rem;
    background: #e5e5e5;
    border-radius: .83333rem;
    transition: border-color .3s, background-color .3s;
}

.cookie-popup input[type=checkbox].switch:checked {
    background: #8E05C2;
}

.cookie-popup input[type=checkbox].switch:after {
    content: "";
    display: inline-block;
    width: 1.58333rem;
    height: 1.58333rem;
    border-radius: 50%;
    background: #fff;
    box-shadow: 0, 0, 2px, #999;
    transition: .4s;
    top: 50%;
    position: absolute;
    left: 5%;
    transform: translateY(-50%);
}

.cookie-popup input[type=checkbox].switch:checked:after {
    content: "";
    position: absolute;
    left: 45%;
}
</style>