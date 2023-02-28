<script>
import { Disqus } from 'vue-disqus';
import $ from "jquery";
export default {
  name: "CommentsPage",
  props: {
    pid: Number,
    url: String,
  },
  components: {
    Disqus
  },
  data() {
    return {
      pageConfig: {
        identifier: `${this.pid} ${this.url}`,
      },
      dShortname: import.meta.env.VITE_DISQUS_SHORTNAME,
    }
  },
  mounted() {
    const disqus = $('#disqus_thread');

    disqus.ready(function() {
      setTimeout(function() {
        if (disqus.children().length >= 2) {
          const comments = disqus.find('iframe:nth-child(1)').detach();
          disqus.empty().append(comments);
        }
      }, 1000);
    });
  }
  // ...
}
</script>

<template>
  <section class='comments' aria-labelledby="comment">
    <h2 id="comment">Comments</h2>
    <Disqus :shortname='dShortname' :pageConfig="pageConfig" />
  </section>
</template>

<style scoped>
.comments {
  padding-left: 25px;
  padding-right: 25px;
}
div#disqus_thread iframe[sandbox] {
        max-height: 0px !important;
}
</style>