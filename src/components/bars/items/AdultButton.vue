<script lang="ts">
import { defineComponent } from "vue";
import ls from '@/helpers/storage';
export default defineComponent({
    methods: {
        growUp() {
            /*Ambassador.growUp()
                .then(() => {
                    window.location.reload();
                })*/
            if (ls.get('isAdult')) {
                ls.remove('isAdult');
                window.location.reload();
            } else {
                ls.set('isAdult', 1);
                window.location.reload();
            }
        }

    }
});
</script>

<template>
    <div class="cool-kid-btn pointer" @click="growUp">
        <div class="popup-menus-container p-relative page-matching-button">
            <div class="p-relative">
                <div class="shortcuts-info">
                    <span class="cool-kid-icon dp-i-block v-middle use-gray"></span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.cool-kid-btn {
    margin-right: .66667rem;
}

.cool-kid-btn .cool-kid-icon {
    margin-bottom: .16667rem;
    width: 3rem;
    height: 2rem;
}

.cool-kid-btn .cool-kid-icon.use-gray {
    background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHRleHQgc3R5bGU9ImZpbGw6IHJnYigxNTgsIDE1OCwgMTU4KTsgZm9udC1mYW1pbHk6IEFyaWFsLCBzYW5zLXNlcmlmOyBmb250LXNpemU6IDAuOXB4OyB3aGl0ZS1zcGFjZTogcHJlOyIgdHJhbnNmb3JtPSJtYXRyaXgoMTguMjM0ODg4LCAwLCAwLCAyMC4xMTk5MTcsIC0xMTAuNDMzMDk4LCAtMTIzLjA4ODYzMSkiIHg9IjYuMjgiIHk9IjcuMDgzIj4xOCs8L3RleHQ+Cjwvc3ZnPg==) no-repeat;
}
</style>