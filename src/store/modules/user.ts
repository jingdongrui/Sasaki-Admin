import { defineStore } from "pinia";
import { getLogin } from "@/api/modules/user";
import { Login } from "@/api/interface/index";
import { getFlatArr } from "@/utils/tools";
import router from "@/router/index";

const files = import.meta.glob("@/views/**/*.vue");

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    userInfo: {},
    menuList: [] as any[],
    accessToken: ""
  }),
  getters: {
    // 数组,扁平化后的菜单列表
    flatMenuListGetter: state => getFlatArr(state.menuList)
  },
  actions: {
    login_store(data: Login.ReqLogin) {
      return new Promise(resolve => {
        getLogin(data).then(result => {
          this.accessToken = result.data.accessToken;
          this.menuList = result.data.menusList;
          this.userInfo = result.data.userInfo;

          // 生成可访问的路由
          // 动态添加路由
          this.flatMenuListGetter.forEach((item: any) => {
            // item 为已经扁平化的数组，所以需要删除children
            item.children && delete item.children;
            // 拼接 component 形成正确的route项
            if (item.component) {
              item.component = files["/src/views" + item.component + ".vue"];
            }
            router.addRoute("layout", item);
          });

          resolve(result);
        });
      });
    },
    clearAll() {
      this.accessToken = "";
      this.menuList = [];
      this.userInfo = {};
    }
  },
  // 持久化
  persist: true
});
