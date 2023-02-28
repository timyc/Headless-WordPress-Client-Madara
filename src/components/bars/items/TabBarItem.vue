<script setup lang="ts">
defineProps<{
  title: string;
  icon: string;
}>();
</script>

<template>
    <div class="tabbar-item dp-flex align-center justify-center pointer">
        <div :class="['tabbar-item__icon', 'bg-cover', 'bg-center', icon]"></div>
        <div class="tabbar-item__title">{{ title }}</div>
    </div>
</template>

<style scoped>
.tabbar .tabbar-item {
    color: #939081;
    flex: 1;
    flex-direction: column;
}
.tabbar .tabbar-item__icon {
    height: 1.83333rem;
    width: 1.83333rem;
}
.tabbar .tabbar-item__icon.prize {
    background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB2ZXJzaW9uPSIxLjEiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDE2IDE2IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxwYXRoIGQ9Ik0xMyAzdi0yaC0xMHYyaC0zdjJjMCAxLjY1NyAxLjM0MyAzIDMgMyAwLjMxNCAwIDAuNjE2LTAuMDQ4IDAuOS0wLjEzOCAwLjcyMSAxLjAzMSAxLjgyMiAxLjc3OCAzLjEgMi4wMzd2My4xaC0xYy0xLjEwNSAwLTIgMC44OTUtMiAyaDhjMC0xLjEwNS0wLjg5NS0yLTItMmgtMXYtMy4xYzEuMjc4LTAuMjU5IDIuMzc4LTEuMDA2IDMuMS0yLjAzNyAwLjI4NCAwLjA4OSAwLjU4NyAwLjEzOCAwLjkgMC4xMzggMS42NTcgMCAzLTEuMzQzIDMtM3YtMmgtM3pNMyA2LjgxM2MtMC45OTkgMC0xLjgxMy0wLjgxMy0xLjgxMy0xLjgxM3YtMWgxLjgxM3YxYzAgMC42MjggMC4xMTYgMS4yMjkgMC4zMjcgMS43ODItMC4xMDYgMC4wMTktMC4yMTYgMC4wMzAtMC4zMjcgMC4wMzB6TTE0LjgxMyA1YzAgMC45OTktMC44MTMgMS44MTMtMS44MTMgMS44MTMtMC4xMTIgMC0wLjIyMS0wLjAxMS0wLjMyNy0wLjAzMCAwLjIxMS0wLjU1NCAwLjMyNy0xLjE1NCAwLjMyNy0xLjc4MnYtMWgxLjgxM3YxeiIgc3R5bGU9ImZpbGw6IHJnYigyNTUsIDI1NSwgMjU1KTsiLz4KPC9zdmc+);
}
.tabbar .tabbar-item__icon.home {
    background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB2ZXJzaW9uPSIxLjEiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDE2IDE2IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxwYXRoIGQ9Ik0xNiA5LjVsLTMtM3YtNC41aC0ydjIuNWwtMy0zLTggOHYwLjVoMnY1aDV2LTNoMnYzaDV2LTVoMnoiIHN0eWxlPSJmaWxsOiByZ2IoMjU1LCAyNTUsIDI1NSk7Ii8+Cjwvc3ZnPg==);
}
.tabbar .tabbar-item__icon.me {
    background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB2ZXJzaW9uPSIxLjEiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDE2IDE2IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxwYXRoIGQ9Ik05IDExLjA0MXYtMC44MjVjMS4xMDItMC42MjEgMi0yLjE2OCAyLTMuNzE2IDAtMi40ODUgMC00LjUtMy00LjVzLTMgMi4wMTUtMyA0LjVjMCAxLjU0OCAwLjg5OCAzLjA5NSAyIDMuNzE2djAuODI1Yy0zLjM5MiAwLjI3Ny02IDEuOTQ0LTYgMy45NTloMTRjMC0yLjAxNS0yLjYwOC0zLjY4Mi02LTMuOTU5eiIgc3R5bGU9ImZpbGw6IHJnYigyNTUsIDI1NSwgMjU1KTsiLz4KPC9zdmc+)
}
</style>