import { defineStore } from "pinia";
import { RouteLocationNormalized, useRouter } from "vue-router";
// const router = useRouter();

export const useTagNavStore = defineStore({
  id: "tagNavStore",
  state: () => ({
    tagNavList: [] as Menu[]
  }),
  actions: {
    /**
     * 添加标签
     * @param route
     */
    addTag(tag: Menu) {
      if (!this.tagNavList.some(item => item.path === tag.path)) {
        this.tagNavList.push(tag);
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
