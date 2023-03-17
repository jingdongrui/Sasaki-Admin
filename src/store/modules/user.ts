import { defineStore } from "pinia";
import { UserState } from "@/type/store";
import { getLogin, getUserInfo } from "@/api/user/index";
import Cookies from "js-cookie";
import { getFlatArr } from "@/utils/tools";

export const useUserStore = defineStore({
  id: "user",
  state: (): UserState => ({
    userinfo: {
      name: ""
    },
    menuList: []
  }),
  getters: {
    // 数组,扁平化后的菜单列表
    flatMenuListGetter: state => getFlatArr(state.menuList)
  },
  actions: {
    login_store(data: any) {
      return new Promise(resolve => {
        getLogin(data).then(result => {
          // 设置 cookies 半个小时过期
          Cookies.set("ssk-token", result.data.access_token, {
            expires: new Date(new Date().getTime() + 60 * 60 * 1000 * 24 * 7)
          });
          resolve(result);
        });
      });
    },
    getUserInfo(token: string) {
      return new Promise((resolve, reject) => {
        getUserInfo(token).then(result => {
          if (result.code == 9000) {
            reject("验证失败！请重新登录");
          }
          const { menusList, user_info } = result.data;
          this.menuList = menusList;
          this.userinfo = user_info;
          resolve(result);
        });
      });
    }
  }
});
