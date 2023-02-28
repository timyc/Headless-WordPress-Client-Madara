<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>

<template>
    <div class="toolbar dp-flex align-center w-100 border-box p-fixed p-zero">
        <div class="action-button">
            <button class="return-button pointer" @click="$route.name == 'accountsettings' ? $router.push({name: 'accountpage'}) : $router.push({name: 'home'})">
                <img
                    src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOSIgaGVpZ2h0PSIxNSIgdmlld0JveD0iMCAwIDkgMTUiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik03LjMyMDQzIDEuMzI1ODFMMSA3LjY0NjI0TDcuMzIwNDMgMTMuOTY2NyIgc3Ryb2tlPSIjNkM2RjdFIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K" />
            </button>
        </div>
        <div class="toolbar-title">
            {{ title }}
        </div>
        <div class="action-button">
            <button class="setting-button pointer" @click="$router.push({name: 'accountsettings'})">
                <img
                    src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAxOCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik05LjAwMDAxIDYuMjQ5OTNDNi45Mjg5NCA2LjI0OTkzIDUuMjUwMDEgNy45Mjg4NiA1LjI1MDAxIDkuOTk5OTNDNS4yNTAwMSAxMi4wNzEgNi45Mjg5NCAxMy43NDk5IDkuMDAwMDEgMTMuNzQ5OUMxMS4wNzExIDEzLjc0OTkgMTIuNzUgMTIuMDcxIDEyLjc1IDkuOTk5OTNDMTIuNzUgNy45Mjg4NiAxMS4wNzExIDYuMjQ5OTMgOS4wMDAwMSA2LjI0OTkzWk02Ljc1MDAxIDkuOTk5OTNDNi43NTAwMSA4Ljc1NzI4IDcuNzU3MzcgNy43NDk5MyA5LjAwMDAxIDcuNzQ5OTNDMTAuMjQyNiA3Ljc0OTkzIDExLjI1IDguNzU3MjggMTEuMjUgOS45OTk5M0MxMS4yNSAxMS4yNDI2IDEwLjI0MjYgMTIuMjQ5OSA5LjAwMDAxIDEyLjI0OTlDNy43NTczNyAxMi4yNDk5IDYuNzUwMDEgMTEuMjQyNiA2Ljc1MDAxIDkuOTk5OTNaIiBmaWxsPSIjOTA5MjlCIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTAuMzc1IDAuNDI3NzU3QzkuNTI0MTUgLTAuMDYzNDgzNyA4LjQ3NTg2IC0wLjA2MzQ4NDEgNy42MjUwMSAwLjQyNzc1NkwxLjM5Nzc3IDQuMDIzMDZDMC41NDY5MTMgNC41MTQzIDAuMDIyNzY2MSA1LjQyMjE1IDAuMDIyNzY2MSA2LjQwNDYzVjEzLjU5NTJDMC4wMjI3NjYxIDE0LjU3NzcgMC41NDY5MTMgMTUuNDg1NiAxLjM5Nzc3IDE1Ljk3NjhMNy42MjUwMSAxOS41NzIxQzguNDc1ODYgMjAuMDYzMyA5LjUyNDE1IDIwLjA2MzMgMTAuMzc1IDE5LjU3MjFMMTYuNjAyMiAxNS45NzY4QzE3LjQ1MzEgMTUuNDg1NiAxNy45NzcyIDE0LjU3NzcgMTcuOTc3MiAxMy41OTUyVjYuNDA0NjNDMTcuOTc3MiA1LjQyMjE1IDE3LjQ1MzEgNC41MTQzIDE2LjYwMjIgNC4wMjMwNkwxMC4zNzUgMC40Mjc3NTdaTTguMzc1MDEgMS43MjY3OUM4Ljc2MTc2IDEuNTAzNSA5LjIzODI2IDEuNTAzNSA5LjYyNTAxIDEuNzI2NzlMMTUuODUyMiA1LjMyMjA5QzE2LjIzOSA1LjU0NTM4IDE2LjQ3NzIgNS45NTgwNCAxNi40NzcyIDYuNDA0NjNWMTMuNTk1MkMxNi40NzcyIDE0LjA0MTggMTYuMjM5IDE0LjQ1NDUgMTUuODUyMiAxNC42Nzc4TDkuNjI1MDEgMTguMjczMUM5LjIzODI2IDE4LjQ5NjMgOC43NjE3NiAxOC40OTYzIDguMzc1MDEgMTguMjczMUwyLjE0Nzc3IDE0LjY3NzhDMS43NjEwMSAxNC40NTQ1IDEuNTIyNzcgMTQuMDQxOCAxLjUyMjc3IDEzLjU5NTJWNi40MDQ2M0MxLjUyMjc3IDUuOTU4MDQgMS43NjEwMSA1LjU0NTM4IDIuMTQ3NzcgNS4zMjIwOUw4LjM3NTAxIDEuNzI2NzlaIiBmaWxsPSIjOTA5MjlCIi8+Cjwvc3ZnPgo=" />
            </button>
        </div>
    </div>
</template>

<style scoped>
.toolbar {
    display: flex;
    padding: 1.25rem .83333rem;
    z-index: 100;
}

.toolbar .action-button {
    min-width: 20px;
}

.toolbar .return-button {
    background-color: transparent;
    border: none;
}

.toolbar .toolbar-title {
    flex-grow: 1;
    font-size: 1.66667rem;
    text-align: center;
}

.toolbar .action-button {
    min-width: 20px;
}
.setting-button {
    background-color: transparent;
    border: none;
}
</style>