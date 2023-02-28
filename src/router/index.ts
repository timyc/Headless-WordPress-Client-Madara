import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/webtoons",
      name: "webtoons",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("@/views/WebtoonsView.vue"),
    },
    {
      path: "/read/:slug",
      name: "readsingle",
      component: () => import("@/views/WebtoonSingleView.vue"),
    },
    {
      path: "/read/:slug/:chapter",
      name: "readsinglechapter",
      component: () => import("@/views/WebtoonChapterView.vue"),
    },
    {
      path: "/search",
      name: "searchpage",
      component: () => import("@/views/SearchView.vue"),
    },
    {
      path: "/cookies",
      name: "cookiespolicy",
      component: () => import("@/views/CookiesPolicyView.vue"),
    },
    {
      path: "/auth",
      name: "loginpage",
      component: () => import("@/views/LoginView.vue"),
    },
    {
      path: "/account",
      name: "accountpage",
      component: () => import("@/views/AccountView.vue"),
    },
    {
      path: "/account/settings",
      name: "accountsettings",
      component: () => import("@/views/AccountSettingsView.vue"),
    },
    {
      path: "/prizes",
      name: "prizepage",
      component: () => import("@/views/PrizesView.vue"),
    },
    {
      path: "/download",
      name: "downloadpage",
      component: () => import("@/views/DownloadView.vue"),
    },
    {
      path: "/article/:slug",
      name: "readarticle",
      component: () => import("@/views/ArticleView.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      name: "notfound",
      component: () => import("@/views/NotFound.vue"),
    },
  ],
});

export default router;
