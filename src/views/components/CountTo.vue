<template>
  <ContentMain style="padding: 18px">
    <div class="container">
      <h1><CountUp :endVal="endVal" :options="formTemp" /></h1>
      <el-divider />
      <el-form :inline="true" :model="form">
        <el-form-item label="开始值">
          <el-input v-model="form.startVal" />
        </el-form-item>
        <el-form-item label="结束值">
          <el-input v-model.number="endValTemp" />
        </el-form-item>
        <el-form-item label="小数位">
          <el-input-number v-model="form.decimalPlaces" :min="1" :max="10" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit()">Query</el-button>
        </el-form-item>
      </el-form>
    </div>
  </ContentMain>
</template>

<script lang="ts" setup>
import ContentMain from "@/components/ContentMain/index.vue";
import CountUp from "@/components/CountUp/index.vue";
import { reactive, ref, onMounted } from "vue";
const endVal = ref<number>(-99999);
const endValTemp = ref<number>(8159);
const formTemp = ref();
// let formTemp: any = null;
const form = reactive({
  startVal: 0, // 开始值
  decimalPlaces: 2, // 小数位
  duration: 2, //持续时间
  useGrouping: true, //使用分组（分隔符）
  useIndianSeparators: true, //印度分隔符
  useEasing: true //逐渐停止
});
onMounted(() => {
  // 子组件挂载后父组件才挂载，所以得父组件onMounted时才传值
  endVal.value = endValTemp.value;
});
const onSubmit = () => {
  endVal.value = endValTemp.value;
  formTemp.value = form;
};
</script>
<style lang="scss" scoped>
.container {
  height: 100%;
  border-radius: 5px;
  padding: 15px;
  background-color: #fff;

  h1 {
    text-align: center;
    font-size: 80px;
    font-weight: 300;
    color: #4d63bc;
  }
}
</style>
