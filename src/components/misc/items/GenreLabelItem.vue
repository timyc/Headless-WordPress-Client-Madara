<script lang="ts">
import { defineComponent } from "vue";
const urlParams = new URLSearchParams(window.location.search);

type genreT = {
    term_id: number,
    name: string,
    slug: string
}
export default defineComponent({
  data() {
    return {
      p: urlParams.get('styles') || 0,
    }
  },
  props: {
    genre: {
      default: {} as genreT,
    }
  },
  methods: {
    genreSwitch(e: any) {
      let i = document.querySelector("#app-title") as any;
      window.history.pushState("", i ? i.textContent : "", "//" + window.location.host + window.location.pathname + "?styles=" + this.genre.term_id);
      window.location.reload();
    }
  }
});

</script>
<template>
    <div :class="['classify-label', 'over-ellipsis', {selected: genre.term_id == p}]" @click="genreSwitch">{{ genre.name }}</div>
</template>