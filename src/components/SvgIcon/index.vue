<template>
  <i v-if="isAiLiIconfont" class="el-icon" :style="setIconSvgStyle">
    <svg aria-hidden="true">
      <use :xlink:href="`#${name}`" />
    </svg>
  </i>
  <svg v-else v-bind="$attrs" :style="setSvgStyle">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script setup lang="ts" name="SvgIcon">
import { computed, onMounted } from "vue";

const props = defineProps({
  // 图标的名称
  name: {
    type: String
  },
  // 图标的尺寸
  size: {
    type: String,
    default: () => "18"
  },
  // 图标的颜色
  color: {
    type: String
  },
  width: {
    type: String
  },
  height: {
    type: String
  }
});

// 设置图标样式
const setIconSvgStyle = computed(() => {
  return `font-size: ${props.size}px;color: ${props.color};`;
});
// 设置SVG图标样式
const setSvgStyle = computed(() => {
  return `width: ${props.width};height: ${props.height};`;
});
// 判断是否为阿里iconfont图标 前缀为ssk则是
const isAiLiIconfont = computed(() => {
  return props.name?.startsWith("ssk-");
});

const iconName = computed(() => `#icon-${props.name}`);
</script>
