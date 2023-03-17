<script lang="ts" setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useThemeConfigStore } from "@/store/modules/themeConfig";
import SubItem from "@/layout/components/Menu/SubItem.vue";

// 数据
const props = defineProps({
  data: {
    type: Array<Menu>
  }
});
const Route = useRoute();
const ThemeConfigStore = useThemeConfigStore();
</script>
<template>
  <el-menu
    class="menu"
    active-text-color="#ffd04b"
    background-color="#002140"
    :default-active="Route.fullPath"
    text-color="#fff"
    :collapse-transition="false"
    :collapse="ThemeConfigStore.themeConfig.isCollapse"
    unique-opened
    router
  >
    <SubItem :data="props.data" />
  </el-menu>
</template>

<style lang="scss" scoped>
.menu {
  border: 0;
}
</style>
