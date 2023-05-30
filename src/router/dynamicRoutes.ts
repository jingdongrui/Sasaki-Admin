import { RouteRecordRaw } from "vue-router";

export const dynamicRoutes: Array<RouteRecordRaw> = [
  {
    path: "/system",
    name: "system",
    meta: {
      title: "系统设置",
      icon: "ssk-setting"
    },
    redirect: "/system/user",
    children: [
      {
        path: "/system/user",
        name: "systemUser",
        component: () => import("@/views/system/user/index.vue"),
        meta: {
          title: "用户管理",
          icon: "ssk-user"
        }
      },
      {
        path: "/system/department",
        name: "systemDepartment",
        component: () => import("@/views/system/department/index.vue"),
        meta: {
          title: "部门管理",
          icon: "ssk-team"
        }
      }
    ]
  },
  {
    path: "/components",
    name: "components",
    meta: { title: "组件", icon: "ssk-build" },
    redirect: "/components/component1",
    children: [
      {
        path: "/components/CountTo",
        name: "CountTo",
        meta: { title: "CountTo", icon: "ssk-HTML" },
        component: () => import("@/views/components/CountTo.vue")
      },
      {
        path: "/components/component2",
        name: "componentsComponent2",
        meta: { title: "component2", icon: "ssk-apple" },
        component: () => import("@/views/test/index.vue")
      }
    ]
  },
  {
    path: "/test",
    name: "test",
    component: () => import("@/views/test/index.vue"),
    meta: {
      title: "Test",
      icon: "ssk-HTML"
    }
  }
];
