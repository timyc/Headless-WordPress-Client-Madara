<template>
<div class="item pointer p-relative chage-password" role="button">
    <div>
        <slot></slot>
    </div>
</div>
</template>

<style scoped>
.item {
    height: 4.66667rem;
    line-height: 4.66667rem;
    font-size: 1.33333rem;
    border-bottom: 1px solid rgba(0,0,0,.1);
}
.item:after {
    content: "";
    width: 1.33333rem;
    height: 1.33333rem;
    position: absolute;
    right: .66667rem;
    top: 1.5rem;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik04LjQ3IDE0LjUzYS43NS43NSAwIDAwMS4wNiAwbDYtNmEuNzUuNzUgMCAwMDAtMS4wNmwtNi02YS43NS43NSAwIDAwLTEuMDYgMS4wNkwxMy45NCA4bC01LjQ3IDUuNDdhLjc1Ljc1IDAgMDAwIDEuMDZ6IiBmaWxsPSIjOTA5MjlCIi8+PC9zdmc+);
    color: #90929b;
}
</style>