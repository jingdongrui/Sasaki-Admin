<template>
  <div>
    <div class="statistic">
      <CountUp :endVal="endVal" :startVal="0" :duration="2" :decimalPlaces="2" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import CountUp from "@/components/CountUp/index.vue";
import { ref, onMounted } from "vue";
const endVal = ref(9000);

onMounted(() => {
  console.log("父组件onMounted");
  setTimeout(() => {
    endVal.value = 8000;
  });
});
</script>
