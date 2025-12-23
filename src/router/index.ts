import { createRouter, createWebHashHistory } from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
NProgress.configure({ showSpinner: false }); // NProgress Configuration 刷新页面头部进度条

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "starView",
      component: () => import("@/views/starView/index.vue"),
    },
    {
      path: "/redirector",
      component: () => import("@/views/redirectorView/index.vue"),
    },
    {
      path: "/history",
      component: () => import("@/views/historyView/index.vue"),
    },
    {
      path: "/message",
      component: () => import("@/views/messageView/index.vue"),
    },
    {
      path: "/price",
      component: () => import("@/views/priceView/index.vue"),
    },
    {
      path: "/note",
      component: () => import("@/views/noteView/index.vue"),
    },
    {
      path: "/blog",
      component: () => import("@/views/blogView/index.vue"),
    },
    {
      path: "/lottery",
      component: () => import("@/views/lotteryView/index.vue"),
    },
    {
      path: "/vote",
      component: () => import("@/views/voteView/index.vue"),
    },
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
