<template>
  <el-main>
    <el-scrollbar>
      <router-view></router-view>
    </el-scrollbar>
  </el-main>
</template>
<style lang="scss" scoped>
.el-main {
  background-color: #f0f2f5;
  padding: 0;
  height: 100%;
  width: 100%;
}
.el-scrollbar {
  height: 100%;
}
// :deep(.el-scrollbar__bar.is-horizontal) {
//   height: 0 !important;
// }
</style>
