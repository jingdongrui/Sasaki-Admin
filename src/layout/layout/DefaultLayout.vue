<template>
  <el-container class="minWidth-700 layout-container h100 w100">
    <LayoutAside></LayoutAside>
    <el-container direction="vertical">
      <LayoutHeader></LayoutHeader>
      <LayoutMain></LayoutMain>
      <LayoutFooter></LayoutFooter>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import LayoutAside from "@/layout/basic/LayoutAside.vue";
import LayoutHeader from "@/layout/basic/LayoutHeader.vue";
import LayoutMain from "@/layout/basic/LayoutMain.vue";
import LayoutFooter from "@/layout/basic/LayoutFooter.vue";
</script>
<style scoped lang="scss"></style>
