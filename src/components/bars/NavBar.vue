<script lang="ts">
import AdultButton from "@/components/bars/items/AdultButton.vue";
import { defineComponent } from "vue";
export default defineComponent ({
    data() {
        return {
            app_name: import.meta.env.VITE_NAME,
        }
    },
    components: {
        AdultButton
    },
});
</script>


<template>
    <div class="navbar-container w-100 p-fixed p-zero">
        <nav class="navbar-container p-relative">
            <div class="size-ruler align-center m-auto f-clear p-relative dp-flex">
                <RouterLink to="/" class="logo-part dp-block align-center t-no-wrap">
                    <div class="logo-img bg-center bg-cover dp-i-block v-middle"></div>
                    <span class="app-title v-middle">{{ app_name }}</span>
                </RouterLink>
                <div class="opt-part dp-flex align-center">
                    <AdultButton />
                    <RouterLink to="/search?keyword=" class="search-btn t-center pointer">
                        <div class="search-icon dp-i-block bg-cover bg-center bg-no-repeat v-middle"></div>
                    </RouterLink>
                    <!--<div class="t-center pointer">
                        <button id="download-app" class="download-app-btn p-relative t-no-wrap pointer" @click="$router.push({ name: 'downloadpage' });">
                            <span class="download-icon dp-i-block bg-cover bg-center bg-no-repeat v-top"></span>
                            <span class="v-middle">APP</span>
                        </button>
                    </div>-->
                </div>
            </div>
        </nav>
    </div>
</template>

<style scoped>
.navbar-container {
    width: 100%;
    height: 3.75rem;
    min-width: 24rem;
    background-color: #000;
    font-size: 1.25rem;
    line-height: 3.75rem;
}

.navbar-container .size-ruler {
    padding: 0 1.33333rem;
    justify-content: space-between;
}

.navbar-container .logo-part {
    color: #e3e2e0;
}

.navbar-container .logo-part .logo-img {
    width: 2.16667rem;
    height: 2.16667rem;
    margin-right: .66667rem;
    border-radius: 4px;
    background-image: url('@/assets/logo.png');
}

.navbar-container .opt-part {
    flex: 1;
    justify-content: flex-end;
}

.navbar-container .opt-part .search-btn {
    margin-right: 1.33333rem;
}

.navbar-container .opt-part .search-btn .search-icon {
    width: 1.66667rem;
    height: 1.66667rem;
    background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB2aWV3Qm94PSIxNDMuNTgyIDEzNS41ODQgMTguNDExIDE5LjIxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cGF0aCBkPSJNIDE1OS45MjUgMTUwLjA3NiBMIDE1Ni4xMzUgMTQ2Ljg1MyBDIDE1NS43NDMgMTQ2LjUgMTU1LjMyNCAxNDYuMzM5IDE1NC45ODYgMTQ2LjM1NCBDIDE1NS44ODEgMTQ1LjMwNiAxNTYuNDIxIDE0My45NDcgMTU2LjQyMSAxNDIuNDYxIEMgMTU2LjQyMSAxMzkuMTQ3IDE1My43MzUgMTM2LjQ2MSAxNTAuNDIxIDEzNi40NjEgQyAxNDcuMTA3IDEzNi40NjEgMTQ0LjQyMSAxMzkuMTQ3IDE0NC40MjEgMTQyLjQ2MSBDIDE0NC40MjEgMTQ1Ljc3NSAxNDcuMTA3IDE0OC40NjEgMTUwLjQyMSAxNDguNDYxIEMgMTUxLjkwNyAxNDguNDYxIDE1My4yNjYgMTQ3LjkyMSAxNTQuMzE0IDE0Ny4wMjYgQyAxNTQuMjk4IDE0Ny4zNjQgMTU0LjQ2IDE0Ny43ODMgMTU0LjgxMyAxNDguMTc1IEwgMTU4LjAzNiAxNTEuOTY1IEMgMTU4LjU4OCAxNTIuNTc4IDE1OS40ODkgMTUyLjYzIDE2MC4wMzkgMTUyLjA4IEMgMTYwLjU4OSAxNTEuNTMgMTYwLjUzNyAxNTAuNjI4IDE1OS45MjQgMTUwLjA3NyBMIDE1OS45MjUgMTUwLjA3NiBaIE0gMTUwLjQyMSAxNDYuNDYgQyAxNDguMjEyIDE0Ni40NiAxNDYuNDIxIDE0NC42NjkgMTQ2LjQyMSAxNDIuNDYgQyAxNDYuNDIxIDE0MC4yNTEgMTQ4LjIxMiAxMzguNDYgMTUwLjQyMSAxMzguNDYgQyAxNTIuNjMgMTM4LjQ2IDE1NC40MjEgMTQwLjI1MSAxNTQuNDIxIDE0Mi40NiBDIDE1NC40MjEgMTQ0LjY2OSAxNTIuNjMgMTQ2LjQ2IDE1MC40MjEgMTQ2LjQ2IFoiIHN0eWxlPSJmaWxsOiByZ2IoMjU1LCAyNTUsIDI1NSk7Ii8+Cjwvc3ZnPg==);
}

.navbar-container:after {
    content: " ";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: .08333rem;
    background-color: #606060;
    transform: scaleY(.5);
}
.download-app-btn {
    font-size: 1.16667rem;
    color: #32aaff;
    height: 2.33333rem;
    border: 1px solid #32aaff;
    border-radius: .66667rem;
    padding: 0 .75rem;
    background-color: #000;
}
.download-app-btn .download-icon {
    margin-right: .33333rem;
    width: 1.41667rem;
    height: 1.41667rem;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAYAAAA6RwvCAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFASURBVHgB7ZfRTcMwEIZ/h/LeDcgIUViAEfoGPKFuwAYNG3QDxAOChic2YALICGUCJkiOOxNQ5SYqPlsoEv4kyxc7d/qUSJcYSCT+C8U9FTIQSIYAigc6y47xJkNiBBAkkh0hH4r/XCQmScQlibgkEZfpi5RPtCpr+pAZgfS1qHyka/iKGGDB0xyEKkTG5nINiSnDFXxF2hZ3PxdKmV0JwRCe4SvSXJg1F7nRyrgSUuv13FTeIoJNVMj4ShwU0choJASDX1JuqOK7VzuZIvjO0W2/suS1E43EVzkPXBlOboj/j9zYV6LP92PvyQzhKaESOSijkFCLjMooJYJE9mQCJKJQ1HycqMOPE5Nh9NWcbmhBxvaIOeKw7Vosm0vzMrQ52lm7769vPPLM2JqDzMY2qOMOObOdMkcMDLZEWGPqfAIDbpvvakAipgAAAABJRU5ErkJggg==);
}
</style>