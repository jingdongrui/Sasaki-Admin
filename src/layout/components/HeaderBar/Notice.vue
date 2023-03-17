<script lang="ts" setup>
import { ref, onMounted, watch } from "vue";

const props = defineProps({
  data: {
    type: Array<NoticeType.NoticeData>,
    default: () => []
  }
});

let noticeData = ref<NoticeType.NoticeData[]>();
let activeKey = ref();

watch(
  () => props.data,
  () => {
    noticeData.value = props.data;
    activeKey.value = noticeData.value[0].key;
  }
);
</script>
<template>
  <el-dropdown trigger="click">
    <span class="dropdown-badge">
      <el-badge is-dot>
        <SvgIcon name="ssk-bell" size="20" />
      </el-badge>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <!-- {{ noticeData }} -->
        <el-tabs :stretch="true" v-model="activeKey" class="dropdown-tabs">
          <template v-for="noticeType in noticeData" :key="noticeType.key">
            <el-tab-pane
              :label="`${noticeType.name}(${noticeType.list.length})`"
              :name="`${noticeType.key}`"
            >
              <el-scrollbar max-height="330px">
                <div class="noticeList-container">
                  <div v-if="noticeType.list.length">
                    <div
                      v-for="(item, index) in noticeType.list"
                      :key="index"
                      class="notice-container"
                    >
                      <el-avatar
                        v-if="item.avatar"
                        :size="30"
                        :src="item.avatar"
                        class="notice-container-avatar"
                      />
                      <div class="notice-container-text">
                        <div class="notice-text-title">
                          <el-tooltip
                            popper-class="notice-title-popper"
                            effect="light"
                            :content="item.title"
                            placement="top-start"
                          >
                            <div ref="titleRef" class="notice-title-content">
                              {{ item.title }}
                            </div>
                          </el-tooltip>
                          <el-tag
                            v-if="item?.extra"
                            :type="item?.status"
                            size="small"
                            class="notice-title-extra"
                          >
                            {{ item?.extra }}
                          </el-tag>
                        </div>

                        <el-tooltip
                          popper-class="notice-title-popper"
                          effect="light"
                          :content="item.description"
                          placement="top-start"
                        >
                          <div ref="descriptionRef" class="notice-text-description">
                            {{ item.description }}
                          </div>
                        </el-tooltip>
                        <div class="notice-text-datetime">
                          {{ item.datetime }}
                        </div>
                      </div>
                    </div>
                  </div>
                  <el-empty v-else description="暂无数据" />
                </div>
              </el-scrollbar>
            </el-tab-pane>
          </template>
        </el-tabs>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style lang="scss" scoped>
.dropdown-badge {
  // display: flex;
  // align-items: center;
  // justify-content: center;
  // height: 48px;
  // width: 40px;
  // cursor: pointer;
}
.dropdown-tabs {
  width: 330px;

  .noticeList-container {
    padding: 15px 24px 0 24px;
  }

  :deep(.el-tabs__header) {
    margin: 0;
  }

  :deep(.el-tabs__nav-wrap)::after {
    height: 1px;
  }

  :deep(.el-tabs__nav-wrap) {
    padding: 0 36px 0 36px;
  }
}
.notice-container {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;

  .notice-container-avatar {
    margin-right: 16px;
    background: #fff;
  }

  .notice-container-text {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;

    .notice-text-title {
      display: flex;
      margin-bottom: 8px;
      font-weight: 400;
      font-size: 14px;
      line-height: 1.5715;
      cursor: pointer;

      .notice-title-content {
        flex: 1;
        width: 200px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      .notice-title-extra {
        float: right;
        margin-top: -1.5px;
        font-weight: 400;
      }
    }

    .notice-text-description,
    .notice-text-datetime {
      font-size: 12px;
      line-height: 1.5715;
    }

    .notice-text-description {
      display: -webkit-box;
      text-overflow: ellipsis;
      overflow: hidden;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    .notice-text-datetime {
      margin-top: 4px;
    }
  }
}
</style>
