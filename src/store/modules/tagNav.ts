import { defineStore } from "pinia";
import { RouteLocationNormalized } from "vue-router";
interface aa {
  historyList: RouteLocationNormalized[];
}

export const useTagNavStore = defineStore({
  id: "tagNavStore",
  state: (): aa => ({
    historyList: []
  }),
  actions: {
    pushRouteIntoHistoryList(route: RouteLocationNormalized) {
      this.historyList.push(route);
      console.log("store", route);
    }
  },

  // 开启持久化
  persist: true
});
