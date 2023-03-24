<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import router from "@/router";
import { Edit, Share, ArrowDown } from "@element-plus/icons-vue";
import { useUserStore } from "@/store/modules/user";
import { getUserNotice } from "@/api/modules/user";
import avat from "@/assets/images/avat.jpg";

import Breadcrumb from "@/layout/components/HeaderBar/Breadcrumb.vue";
import Notice from "@/layout/components/HeaderBar/Notice.vue";
import Fullscreen from "@/layout/components/HeaderBar/Fullscreen.vue";

const UserStore = useUserStore();
let noticeData = ref();

onMounted(() => {
  // 获取notice的数据
  getNoticeInfo();
});

// 获取通知的数据
const getNoticeInfo = async () => {
  const { data } = await getUserNotice();
  noticeData.value = data;
};

const handLogout = () => {
  router.push({ path: "/login", replace: true });
};
</script>

<template>
  <div class="header-container">
    <Breadcrumb />
    <div class="header-right">
      <div class="header-nav-icon">
        <SvgIcon name="ssk-search" size="20" />
      </div>

      <Fullscreen class="header-nav-icon" />

      <Notice :data="noticeData" class="header-nav-icon margin-right-10" />

      <el-dropdown trigger="click">
        <span class="el-dropdown-link user">
          <el-avatar size="small" :src="avat" />
          {{ UserStore.userinfo.name }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handLogout"
              ><SvgIcon name="ssk-poweroff" size="16" />退出登录</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header-container {
  width: 100%;
  height: 50px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ebeef5;

  .header-breadcrumb {
    height: inherit;
    line-height: 50px;
  }
  .header-right {
    height: inherit;
    display: flex;
    align-items: center;
    line-height: 50px;
    // flex: 1;

    .header-nav-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 48px;
      width: 40px;
      cursor: pointer;
    }

    // div {
    //   cursor: pointer;
    //   height: 100%;
    //   display: flex;
    //   align-items: center;
    //   padding: 0 10px;
    // }
    .user {
      display: flex;
      align-items: center;
      .el-avatar {
        margin-right: 10px;
      }
    }
  }
}
</style>
