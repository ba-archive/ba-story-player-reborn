import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
NProgress.configure({
  easing: "ease", // Adjust animation settings using easing (a CSS easing string) and speed (in ms). (default: and ease200)
  speed: 300,
  showSpinner: true, // Turn off loading spinner by setting it to false. (default: true)
  trickleSpeed: 200, // Adjust how often to trickle/increment, in ms.
  minimum: 0.1, // Changes the minimum percentage used upon starting. (default: 0.08)
});
import Layout from "@/pages/layout/index.vue";
import Page403 from "@/pages/error/403.vue";
import Page404 from "@/pages/error/404.vue";
import Page500 from "@/pages/error/500.vue";
import HHome from "@/views/HHome.vue";


const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "/",
        name: "home",
        component: HHome,
        meta: {
          authRequired: true,
        },
      },
      {
        path: "/500",
        name: "page500",
        component: Page500,
        props: (r) => ({ ...r.params }),
      },
      {
        path: "/403",
        name: "page403",
        component: Page403,
        props: (r) => ({ ...r.params }),
      },
      {
        path: "/404",
        name: "page404",
        component: Page404,
        props: (r) => ({ ...r.params }),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
  strict: true,
  // When switching pages, scroll to the top
  // 当切换页面，滚动到最顶部
  scrollBehavior: () => ({ left: 0, top: 0 }),

});

// Injection Progress
router.beforeEach(() => {
  if (!NProgress.isStarted()) {
    NProgress.start();
  }
});

router.afterEach(() => {
  NProgress.done();
});


export default router;
