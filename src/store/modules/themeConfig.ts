import { defineStore } from "pinia";
import { ThemeConfigState } from "@/store/types";

export const useThemeConfigStore = defineStore({
  id: "themeConfig",
  state: (): ThemeConfigState => ({
    themeConfig: {
      /**
       * 界面
       */
      // 是否开启菜单水平折叠效果
      isCollapse: false
    }
  }),
  actions: {},

  // 持久化
  persist: true
});
