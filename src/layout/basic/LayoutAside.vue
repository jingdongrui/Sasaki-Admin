<template>
  <el-aside class="layout-aside" :style="{ width: isCollapse ? '64px' : '210px' }">
    <el-scrollbar class="el-scrollbar-container">
      <Vertical :data="state.menuList" />
    </el-scrollbar>
    <div class="aside-button" @click="handAsideCollapse">
      <SvgIcon :name="isCollapse ? 'ssk-doubleright' : 'ssk-doubleleft'" color="#ffffff"></SvgIcon>
    </div>
  </el-aside>
</template>
<script lang="ts" setup>
import { reactive, onMounted, computed } from "vue";
import Vertical from "@/layout/components/Menu/Vertical.vue";
import { useUserStore } from "@/store/modules/user";
import { useThemeConfigStore } from "@/store/modules/themeConfig";
// 类型
type AsideState = {
  menuList: Menu[];
};

// 变量
const UserStore = useUserStore();
const ThemeConfigStore = useThemeConfigStore();
let state = reactive<AsideState>({
  menuList: []
});

onMounted(() => {
  state.menuList = UserStore.menuList;
});
// 菜单折叠
const isCollapse = computed(() => ThemeConfigStore.themeConfig.isCollapse);

// 菜单折叠
const handAsideCollapse = () => {
  const { themeConfig } = ThemeConfigStore;
  themeConfig.isCollapse = !themeConfig.isCollapse;
};
</script>
<style lang="scss" scoped>
.layout-aside {
  height: 100%;
  // width: 210px;
  background-color: #002140;

  .el-scrollbar-container {
    height: calc(100% - 40px);
  }
  .aside-button {
    bottom: 0;
    height: 35px;
    line-height: 40px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0 6px -2px #40a9ff;
    cursor: pointer;
  }
}
.aside-collapse {
  width: 64px;
}
</style>
