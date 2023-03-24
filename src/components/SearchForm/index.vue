<template>
  <div class="search-form">
    <el-form :model="formData">
      <el-form-item label="Activity name">
        <el-input v-model="formData.name" />
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from "vue";

const formData = reactive({
  name: "dd"
});
</script>
<style lang="scss" scoped>
.search-form {
  padding: 15px;
}
</style>
