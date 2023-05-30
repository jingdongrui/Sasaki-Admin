<template>
  <span ref="countUpRef"></span>
</template>

<script lang="ts" setup>
import { CountUp, CountUpOptions } from "countup.js";
import { ref, watch, onBeforeMount, onMounted } from "vue";
import type { PropType } from "vue";
console.log("子组件setup");

const countUpRef = ref();
const amount = ref(0);

/** interface CountUpOptions {
    startVal?: number;
    decimalPlaces?: number;
    duration?: number;
    useGrouping?: boolean;
    useIndianSeparators?: boolean;
    useEasing?: boolean;
    smartEasingThreshold?: number;
    smartEasingAmount?: number;
    separator?: string;
    decimal?: string;
    easingFn?: (t: number, b: number, c: number, d: number) => number;
    formattingFn?: (n: number) => string;
    prefix?: string;
    suffix?: string;
    numerals?: string[];
    enableScrollSpy?: boolean;
    scrollSpyDelay?: number;
    scrollSpyOnce?: boolean;
    onCompleteCallback?: () => any;
    plugin?: CountUpPlugin;
}*/

const props = defineProps({
  // 结束值
  endVal: {
    type: Number,
    default: 0
  },
  options: {
    type: Object as PropType<CountUpOptions>
  }
});

const initCountUp = () => {
  const countUp = new CountUp(countUpRef.value, props.endVal, props.options);
  countUp.start();
};

watch(
  [() => props.endVal, () => props.options],
  () => {
    console.log("object");
    initCountUp();
  },
  { deep: true }
);
</script>
