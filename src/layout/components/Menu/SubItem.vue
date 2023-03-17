<script setup lang="ts">
const props = defineProps({
  data: {
    type: Array<Menu>
  }
});
</script>
<template>
  <template v-for="(item, index) in props.data" :key="index">
    <template v-if="item.children === undefined">
      <el-menu-item :index="item.path">
        <SvgIcon :name="item.meta.icon" size="19" />
        <span>{{ item.meta.title }}</span>
      </el-menu-item>
    </template>

    <template v-else>
      <el-sub-menu :index="item.path">
        <template #title>
          <SvgIcon :name="item.meta.icon" size="19" />
          <span>{{ item.meta.title }}</span>
        </template>
        <SubItem :data="item.children" />
      </el-sub-menu>
    </template>
  </template>
</template>

<style scoped lang="scss"></style>
