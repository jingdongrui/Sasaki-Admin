<template>
  <div class="userlist-container">
    <div class="search"></div>
    <div class="table">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="Date" width="180" />
        <el-table-column prop="name" label="Name" width="180" />
        <el-table-column prop="address" label="Address" />
      </el-table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import SearchForm from "@/components/SearchForm/index.vue";
import SSKTable from "@/components/SSKTable/index.vue";
import { getUserList } from "@/api/modules/user";
import { onMounted } from "vue";
onMounted(() => {
  getUserList();
});

const tableData = [
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles"
  },
  {
    date: "2016-05-02",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles"
  },
  {
    date: "2016-05-04",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles"
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles"
  }
];
</script>
<style lang="scss" scoped>
.userlist-container {
  padding: 11px;
}
</style>
