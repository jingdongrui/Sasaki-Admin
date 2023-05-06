import { useUserStore } from "@/store/modules/user";
import router from "@/router/index";

/**
 * import.meta.glob：批量导入文件
 * 导入后的格式：/src/views/home/index.vue: () => import("/src/views/home/index.vue")
 * 导入为懒加载的形式
 * 此处：批量导入views下的vue文件 目的是为了 结合后端返回的菜单component属性
 * 拼出路由的完整路径。
 */
const files = import.meta.glob("@/views/**/*.vue");

/**
 * @description 初始化动态路由
 */
export const initDynamicRouter = async (token: string) => {
  // console.log("into initDynamicRouter");
  const UserStore = useUserStore();

  // 从后端获取菜单列表
  // await UserStore.getUserInfo(token);
  // console.log(1212);

  // 动态添加路由
  UserStore.flatMenuListGetter.forEach((item: any) => {
    // item 为已经扁平化的数组，所以需要删除children
    item.children && delete item.children;
    // 拼接 component 形成正确的route项
    if (item.component) {
      item.component = files["/src/views" + item.component + ".vue"];
    }

    router.addRoute("layout", item);
  });

  // console.log("路由挂载好了");
};
