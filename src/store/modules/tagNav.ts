import { defineStore } from "pinia";
import { RouteLocationNormalized } from "vue-router";


export const useTagNavStore = defineStore({
  id: "tagNavStore",
  state: () => ({
    tagNavList: [] as RouteLocationNormalized[]
  }),
  actions: {
    /**
     * 添加标签
     * @param route 路由项
     */
    addTag(route: RouteLocationNormalized) {

      if (!this.tagNavList.some((item) => item.name === route.name)) {
        this.tagNavList.push(route)
      }
    },
    /**
     * 移除标签
     * @param route 路由项
     */
    removeTag(route: RouteLocationNormalized) {
      const index = this.tagNavList.findIndex((item) => item.name === route.name)
      if (index !== -1) {
        this.tagNavList.splice(index, 1)
      }
    },
    /**
     * 清空 HistoryList
     */
    clearTagNavList() {
      this.tagNavList.length = 0
    }
  },

  // 开启持久化
  persist: true
});
