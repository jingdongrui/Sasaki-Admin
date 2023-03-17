<template>
  <div class="login">
    <div class="login-container">
      <div class="login-title">
        <!-- <img class="login-logo" src="@/assets/images/logo.jpg" alt="logo" /> -->
        Coding
      </div>
      <div class="login-content">
        <el-form :model="state.ruleForm" size="large">
          <el-form-item prop="username">
            <el-input
              v-model="state.ruleForm.username"
              placeholder="请输入用户名"
              :prefix-icon="User"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="state.ruleForm.password"
              placeholder="请输入密码"
              :prefix-icon="Lock"
            />
          </el-form-item>
          <el-form-item class="submit">
            <el-button
              type="primary"
              class="login-submit"
              round
              :loading="state.loginLoading"
              @click="handLogin"
              >登 录</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import "./index.scss";
import { reactive, onMounted } from "vue";
import { useUserStore } from "@/store/modules/user";
import router from "@/router";
import Cookies from "js-cookie";
import { User, Lock } from "@element-plus/icons-vue";

// 页面数据
const state = reactive({
  ruleForm: {
    username: "admin",
    password: "123456"
  },
  loginLoading: false
});

onMounted(() => {
  // 清除token
  Cookies.remove("ssk-token");
});

const handLogin = () => {
  state.loginLoading = true;
  const login = useUserStore();
  login.login_store(state.ruleForm).then(data => {
    console.log(122);
    router.push("/home");
    state.loginLoading = false;
  });
};
</script>
