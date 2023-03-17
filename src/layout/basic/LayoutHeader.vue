<template>
  <el-header>
    <HeaderBar />
    <TagsView />
  </el-header>
</template>
<script lang="ts" setup>
import HeaderBar from "@/layout/components/HeaderBar/index.vue";
import TagsView from "@/layout/components/HeaderBar/TagsView/index.vue";
</script>
<style lang="scss" scoped>
.el-header {
  padding: 0;
  height: unset;
}
</style>
