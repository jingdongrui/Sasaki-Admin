import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import { staticRoute } from "@/router/staticRoute";
import { useUserStore } from "@/store/modules/user";
import { useTagNavStore } from "@/store/modules/tagNav";
import { treeToArray } from "@/utils/tools";
import { initDynamicRouter } from "@/router/dynamicRoute";
import Cookies from "js-cookie";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...staticRoute]
});
// 白名单
const whiteList: Array<String> = [];
// console.log(UserStore.menuList);

router.beforeEach(async (to, from, next) => {
  // console.log("进入路由守卫");
  const token = Cookies.get("ssk-token");

  if (to.path === "/login") {
    // if (token) {
    //   return next(from.fullPath);
    // }
    return next();
  }

  // 无token，跳转登录页
  if (!token) return next({ path: "/login", replace: true });

  // 白名单放行
  if (whiteList.includes(to.path)) return next();

  // 通过菜单动态添加路由
  const UserStore = useUserStore();
  // await UserStore.getUserInfo(Cookies.get("ssk-token") as string);
  // 菜单列表没有数据时，重新初始化菜单
  if (!UserStore.menuList.length) {
    // console.log("开始挂载异步路由");
    // console.log("not have menuList");
    await initDynamicRouter(token);
    return next({ ...to, replace: true });
  }
  // console.log("公共路由");

  // 验证通过可正常访问
  const TagNavStore = useTagNavStore();
  TagNavStore.pushRouteIntoHistoryList(to);
  next();
});

/**
 * @description 重置路由
 * */
export const resetRouter = () => {
  const authStore = useUserStore();
  authStore.flatMenuListGetter.forEach(route => {
    const { name } = route;
    if (name && router.hasRoute(name)) router.removeRoute(name);
  });
};
/**
 * 筛选出能够访问的路由
 * @param {Array} requestMenuList 后端请求到的菜单
 * @param {Array} asyncRoutes 本地写好的路由
 * @returns 有权限访问的路由表
 */
const test = (requestMenuList: {}[], asyncRoutes: RouteRecordRaw[]) => {
  //扁平化请求到的路由
  const menuList = treeToArray(requestMenuList);
  console.log("menuList", menuList);
};

function flatten(arr: any) {
  return arr.reduce((flat: any, toFlatten: any) => {
    return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
  }, []);
}

export default router;