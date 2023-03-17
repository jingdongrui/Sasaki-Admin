<script lang="ts" setup name="Breadcrumb">
import { onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { useUserStore } from "@/store/modules/user";
import { getAllBreadcrumbList } from "@/utils/tools";

// 变量
const Route = useRoute();
const UserStore = useUserStore();

onMounted(() => {});

const breadcrumbList = computed(() => {
  // 匹配好的所有面包屑导航的关系
  let allBreadcrumbData = getAllBreadcrumbList(UserStore.menuList);
  // 当前面包屑导航
  let breadcrumbData = allBreadcrumbData[Route.matched[Route.matched.length - 1].path];
  // 加入首页
  if (Route.path !== "/home") {
    breadcrumbData = [
      {
        path: "/home",
        name: "home",
        meta: {
          title: "首页",
          icon: "ssk-home",
          isActivePath: true
        }
      },
      ...breadcrumbData
    ];
  }
  return breadcrumbData;
});
</script>
<template>
  <el-breadcrumb separator="/" class="header-breadcrumb">
    <TransitionGroup name="list">
      <el-breadcrumb-item v-for="item in breadcrumbList" :key="item.path" :to="item.path">
        {{ item.meta.title }}
      </el-breadcrumb-item>
    </TransitionGroup>
  </el-breadcrumb>
</template>
<style lang="scss" scoped>
//
.list-enter-from {
  transform: translateX(30px);
  opacity: 0;
}
.list-enter-active {
  transition: all 0.5s ease;
}
</style>
