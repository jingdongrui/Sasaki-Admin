import { RouteRecordRaw } from "vue-router";

export const staticRoute: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      title: "登录页",
      isAuth: false
    }
  },
  {
    path: "/layout",
    name: "layout",
    component: () => import("@/layout/index.vue"),
    redirect: "/home",
    children: []
  },

  // error page
  {
    path: "/404",
    name: "notFound",
    component: () => import("@/views/notfound/index.vue"),
    meta: {
      title: "notFound",
      isAuth: false
    }
  }
];
