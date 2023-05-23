<template>
  <span ref="countUpRef">qqqqqqqqqqqqqq{{ props.startVal }}</span>
</template>

<script lang="ts" setup>
import { CountUp } from "countup.js";
import { ref, watch, onBeforeMount, onMounted } from "vue";

const countUpRef = ref();
const amount = ref(0);

const props = defineProps({
  // 结束值
  endVal: {
    type: Number,
    default: 0
  },
  // 开始值
  startVal: {
    type: Number,
    default: 0
  },
  // 小数位数
  decimalPlaces: {
    type: Number,
    default: 0
  },
  /**
   * 持续时间
   */
  duration: {
    type: Number,
    default: 2
  }
});

onBeforeMount(() => {
  console.log("onBeforeMount");
});
onMounted(() => {
  console.log("子组件onMounted");
});

const initCountUp = () => {
  const countUp = new CountUp(countUpRef.value, amount.value, {
    startVal: props.startVal,
    decimalPlaces: props.decimalPlaces,
    duration: props.duration
  });
  countUp.start();
  console.log(countUp);
};

watch(
  () => props.endVal,
  () => {
    console.log(99999);
    console.log(props);
    amount.value = props.endVal;
    initCountUp();
  }
);
</script>
