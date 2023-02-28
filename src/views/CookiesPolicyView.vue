<script lang="ts">
import NavBar from '@/components/bars/NavBar.vue';
import { useTitle } from '@vueuse/core';
import { defineComponent } from "vue";
export default defineComponent ({
    components: {
        NavBar
    },
    mounted() {
        useTitle(`Cookies Policy - ${import.meta.env.VITE_NAME}`);
    }
});

</script>

<template>
    <div class="app-container with-navbar">
        <NavBar />
        <div class="act-rich-render-content" style="line-height: 26px;">
            <h4 style="text-align:center;"><strong>Cookies Policy</strong></h4>
            <h4></h4>
            <p>Cookies are small text files that are placed on your computer by websites that you visit. This Cookies
                Policy
                explains how we use cookies and the choices you have to control them. Unless otherwise stated in this
                policy, our <a href="/cookies" target="_self">Privacy
                    Policy</a> applies to the data we collect.</p>
            <p></p>
            <p><strong>Necessary cookies </strong></p>
            <p>We use these necessary cookies (including accessToken, refreshToken, fullAccess) to verify your account . Such
                cookies
                can help us to keep you logged in. These cookies are necessary for the website to function and cannot be
                switched off in our systems. You are hereby notified that if you refuse or delete them, you may not be
                able
                to log in and obtain account-related information successfully, but you can still browse the web as a
                visitor.&nbsp;</p>
            <p></p>
            <p>These cookies expire one months from your last use, after which they are automatically removed from your
                device.&nbsp;</p>
            <p></p>
            <p><strong>Analytics cookies</strong></p>
            <p>These cookies collect information in a way that does not directly identify anyone, including the number
                of
                visitors to the website, where visitors have come to the website from and the pages they visited. All
                information these cookies collect is aggregated and therefore anonymous. If you do not allow these
                cookies,
                we will not know when you have visited our site. Analytics cookies contain statistician.v3.sessionld and
                statistician.v3.buvid. These cookies allow us to count visits and traffic sources, so we can measure and
                improve the performance of our site. They help us know which pages are the most and least popular and
                see
                how visitors move around the site.</p>
            <p>&nbsp;</p>
            <p>These cookies expire one months from your last use, after which they are automatically removed from your
                device.</p>
            <p>By default, the browsing experience of our website visitors is NOT tracked by us. You may, though, choose
                to
                consent to our processing of any personal data collected during your browsing experience on our website
                to
                allow us to produce anonymised statistics.</p>
            <p></p>
            <p><strong>How do I change my cookie settings?</strong></p>
            <p>You can change your cookie preferences by clicking on the “Cookie Setting” button. You can then adjust
                the
                available sliders to “On” or “Off”, then clicking “confirm”. You may need to refresh your page for your
                settings to take effect.</p>
            <p>Alternatively, most web browsers allow some control of most cookies through the browser settings. To find
                information relating to other browsers, please visit the browser developer's website.</p>
        </div>
    </div>
</template>