<script lang="ts">
import NavBar from "@/components/bars/NavBar.vue";
import TabBar from '@/components/bars/TabBar.vue';
import Cookies from '@/components/misc/Cookies.vue';
import TopBanner from '@/components/sliders/TopBanner.vue';
import GenresBar from '@/components/bars/GenresBar.vue';
import SixComics from '@/components/misc/SixComics.vue';
import ComicsRanking from '@/components/misc/ComicsRanking.vue';
import RectanglePosts from '@/components/misc/RectanglePosts.vue';
import { useTitle } from '@vueuse/core';
import { defineComponent } from "vue";
export default defineComponent ({
  components: {
    NavBar,
    TabBar,
    Cookies,
    TopBanner,
    GenresBar,
    SixComics,
    ComicsRanking,
    RectanglePosts,
  },
  data() {
    return {
      isVisible: false,
      isVisible2: false,
      isVisible3: false,
      isVisible4: false,
    }
  },
  methods: {
    visibilityChanged(isVisible: any) {
      this.isVisible = isVisible;
    },
    visibilityChanged2(isVisible: any) {
      this.isVisible2 = isVisible;
    },
    visibilityChanged3(isVisible: any) {
      this.isVisible3 = isVisible;
    },
    visibilityChanged4(isVisible: any) {
      this.isVisible4 = isVisible;
    }
  },
  mounted() {
    useTitle(`Home - ${import.meta.env.VITE_NAME}`);
  }

});
</script>

<template>
  <div class="app-container with-navbar">
    <div class="home-container">
      <NavBar />
      <GenresBar />
      <TopBanner />
      <ComicsRanking :pid='0' :pageNum='1' :rand='0' title="Hot Updates" :canLoad="true" />
      <SixComics :pid='12' :pageNum='1' :rand='1' title="Fantasy" v-observe-visibility="visibilityChanged" :canLoad="isVisible" />
      <SixComics :pid='28' :pageNum='1' :rand='1' title="Romance" v-observe-visibility="visibilityChanged2" :canLoad="isVisible2" :sizeType=2 />
      <SixComics :pid='6' :pageNum='1' :rand='1' title="Comedy" v-observe-visibility="visibilityChanged3" :canLoad="isVisible3" />
      <RectanglePosts :pid='0' :pageNum='1' :rand='0' title="Curated Articles" v-observe-visibility="visibilityChanged4" :canLoad="isVisible4" />
      <Cookies />
      <TabBar />
    </div>
  </div>
</template>
