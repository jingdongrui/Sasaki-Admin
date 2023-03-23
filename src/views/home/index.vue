<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { Warning } from "@element-plus/icons-vue";
import { useThemeConfigStore } from "@/store/modules/themeConfig";
import LineChart from "./components/LineChart.vue";
import ScatterChart from "./components/ScatterChart.vue";

const ThemeConfigStore = useThemeConfigStore();
// 定义顶部卡片数据
const homeTopCardData = reactive([
  {
    numStr: "总销售额",
    num: "123,896",
    rate1: "12%",
    rate2: "9%",
    num1Str: "日销售额",
    num1: "9,234",
    icon: "home1"
  },
  {
    numStr: "访问量",
    num: "123,819",
    rate1: "12%",
    rate2: "9%",
    num1Str: "日访问量",
    num1: "9,234",
    icon: "home2"
  },
  {
    numStr: "支付笔数",
    num: "381,111",
    rate1: "12%",
    rate2: "9%",
    num1Str: "日支付笔数",
    num1: "9,234",
    icon: "home3"
  },
  {
    numStr: "总用户数",
    num: "985,658",
    rate1: "12%",
    rate2: "9%",
    num1Str: "当前在线数",
    num1: "19,234",
    icon: "home4"
  }
]);

onMounted(() => {
  // console.log(home1);
});
</script>
<template>
  <div class="home-container">
    <el-row :gutter="10" class="row-first">
      <el-col
        v-for="(item, index) in homeTopCardData"
        :key="index"
        :xs="24"
        :sm="12"
        :md="12"
        :lg="6"
        :xl="6"
      >
        <el-card class="box-card">
          <div class="title">
            <span>{{ item.numStr }}</span> <el-icon><Warning /></el-icon>
          </div>

          <div class="content">
            <div class="text">{{ item.num }}</div>
            <div class="icon">
              <SvgIcon :name="item.icon" width="100" height="100"></SvgIcon>
            </div>
          </div>

          <div class="footer">
            <span> {{ item.num1Str }}</span>
            <span> {{ item.num1 }}</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="row-two margin-top-5">
      <el-col>
        <el-card class="box-card"> <LineChart /> </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="row-two margin-top-5">
      <el-col>
        <el-card class="box-card"> <ScatterChart /> </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.home-container {
  padding: 10px;
  box-sizing: border-box;
  // background-color: #d2ff9e;
  // background-image: url("@/assets/images/svg/home1.svg");

  .row-first {
    .box-card {
      margin: 5px 0;
      .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        line-height: 22px;
      }
      .content {
        display: flex;
        .text {
          flex: 1;
          font-size: 30px;
          line-height: 40px;
        }
        .icon {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
      .footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.ep-bg-purple {
  background-color: #ff9292;
}
.ep-bg-purple-light {
  background-color: #532b2b;
}
</style>
