<template>
  <div ref="lineChartRef" style="width: 100%; height: 400px"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onDeactivated, nextTick } from "vue";
import * as echarts from "echarts";

type EChartsOption = echarts.EChartsOption;
type EChartsType = echarts.EChartsType;

const lineChartRef = ref();
let myChart: EChartsType;

onMounted(async () => {
  await nextTick();
  const lineChartDom = lineChartRef.value;
  myChart = echarts.init(lineChartDom);
  option && myChart.setOption(option);

  window.addEventListener("resize", () => {
    myChart.resize();
  });
});
onDeactivated(() => {
  console.log(2);
  window.removeEventListener("resize", () => {
    myChart.resize();
  });
});
const option: EChartsOption = {
  title: {
    text: "TIOBE for 2022"
  },
  tooltip: {
    trigger: "axis"
  },
  legend: {
    data: ["Python", "C", "Java", "C++", "C#"]
  },
  grid: {
    left: "3%",
    right: "3%",
    bottom: "3%",
    containLabel: true
  },
  toolbox: {
    feature: {
      saveAsImage: {
        title: "保存图片",
        type: "png",
        pixelRatio: 3
      }
    }
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
  },
  yAxis: {
    type: "value"
  },
  series: [
    {
      name: "Python",
      type: "line",
      data: [1.04, 1.13, 2.88, 5.54, 4.45, 3.21, 2.37, 3.85, 4.68, 9.7, 15.33, 14.83]
    },
    {
      name: "C",
      type: "line",
      data: [20.14, 18.6, 19.63, 13.92, 16.22, 16.52, 18.33, 15.59, 9.29, 15.77, 14.08, 14.73]
    },
    {
      name: "Java",
      type: "line",
      data: [24.2, 23.57, 22.25, 20.85, 17.48, 17.05, 16.52, 21.14, 14.22, 16.9, 10.66, 13.56]
    },
    {
      name: "C++",
      type: "line",
      data: [15.81, 16.08, 11.3, 8.73, 9.71, 8.05, 7.56, 6.91, 5.73, 5.57, 8.29, 13.29]
    },
    {
      name: "C#",
      type: "line",
      data: [0.59, 1.8, 3.55, 4.86, 5.77, 8.76, 5.85, 4.71, 3.75, 5.53, 5.68, 7.17]
    }
  ]
};
</script>
