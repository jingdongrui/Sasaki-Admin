import { defineStore } from "pinia";
import { RouteLocationNormalized, useRouter } from "vue-router";
// const router = useRouter();

export const useTagNavStore = defineStore({
  id: "tagNavStore",
  state: () => ({
    tagNavList: [] as TagNavItem[]
  }),
  actions: {
    /**
     * 添加标签
     * @param route
     */
    addTag(route: RouteLocationNormalized) {
      // 解构后失去响应式;
      const { path, meta } = route;
      // console.log(isRef(route));
      if (!this.tagNavList.some(item => item.path === route.path)) {
        this.tagNavList.push({ path, meta });
      }
    },
    /**
     * 移除标签
     * @param route
     */
    removeTag(tagItem: TagNavItem, index: number) {
      // const index = this.tagNavList.findIndex(item => item.path === tagItem.path);
      if (index !== -1) {
        this.tagNavList.splice(index, 1);
      }
    },
    /**
     * 清空 HistoryList
     */
    clearTagNavList() {
      this.tagNavList.length = 0;
    }
  },

  // 开启持久化
  persist: true
});
