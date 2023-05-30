import { RouteRecordRaw } from "vue-router";
import { dynamicRoutes } from "./dynamicRoutes";

export const staticRoutes: Array<RouteRecordRaw> = [
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
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("@/views/home/index.vue"),
        meta: {
          title: "首页",
          icon: "ssk-home",
          activeItem: true,
          isAffix: true
        }
      },
      ...dynamicRoutes
    ]
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
