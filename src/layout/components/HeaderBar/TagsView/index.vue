<script lang="ts" setup>
import { useTag } from "./hook/useTag";
import { Close } from "@element-plus/icons-vue";

import { nextTick, ref, watch, onMounted, computed, getCurrentInstance } from "vue";
import { useTagNavStore } from "@/store/modules/tagNav";
import { useUserStore } from "@/store/modules/user";
import { RouteLocationNormalized, useRoute, useRouter } from "vue-router";
const router = useRouter();
const route = useRoute();
const UserStore = useUserStore();
const TagNavStore = useTagNavStore();
const instance = getCurrentInstance();
// const tagList = ref<TagNavItem[]>([]);

const scrollContainerRef = ref();
const tagsRef = ref();
const TagsTranslateX = ref(0);
// 当前活跃tag的index
const currentActiveTagIndex = ref(-1);

onMounted(async () => {
  initTag();
  addTag();

  // window.addEventListener("resize", () => {
  //   // 文档视图变化，tag-nav位置调整
  //   handleTagsLocation();
  // });
  await nextTick();
  // 初始位置设置
  // handleTagsLocation();
});
// tag-nav的位置
const handleTagsLocation = () => {
  let delta = scrollContainerRef.value.offsetWidth - tagsRef.value.offsetWidth;
  let currentIndexRefSet = instance?.refs["dynamic" + currentActiveTagIndex.value] as HTMLElement[];
  let currentIndexRef = currentIndexRefSet[0];
};

const isActive = (tagItem: Menu, currentIndex: number) => {
  if (route.path === tagItem.path) {
    currentActiveTagIndex.value = currentIndex;
  }
  return route.path === tagItem.path;
};

// 需要一开始就固定在TagView组件上的
const filterAffixTags = (routes: any) => {
  let tags: Menu[] = [];
  routes.forEach((element: Menu) => {
    if (element.meta && element.meta.isAffix) {
      tags.push(element);
    }
  });
  return tags;
};
// 初始化
const initTag = () => {
  const affixTags = filterAffixTags(UserStore.flatMenuListGetter);
  affixTags.forEach(element => {
    TagNavStore.addTag(element);
  });
};

const addTag = () => {
  const target = UserStore.flatMenuListGetter.find(element => element.name == route.name);
  if (target) {
    TagNavStore.addTag(target);
  }
};

const deleteTag = (tagItem: Menu) => {
  // 需要删除项的下标
  const index = TagNavStore.tagNavList.findIndex(item => item.path === tagItem.path);
  // 判断点击删除按钮传过来的项是否为当前路由所在的项
  if (tagItem.path === route.path) {
    TagNavStore.removeTag(tagItem, index);
    // 删除后路由跳转到前一项
    let lastItem = TagNavStore.tagNavList[index - 1];
    router.push({ path: lastItem.path });
  } else {
    TagNavStore.removeTag(tagItem, index);
  }
};

const handleTagClick = (tagItem: Menu) => {
  if (route.path !== tagItem.path) {
    router.push({ path: tagItem.path });
  }
};
watch(route, () => {
  addTag();
});
</script>
<template>
  <div class="tags-view">
    <div class="arrow-left"><SvgIcon name="ssk-left"></SvgIcon></div>
    <div class="scroll-container" ref="scrollContainerRef">
      <el-scrollbar>
        <div class="tags" ref="tagsRef">
          <div
            :class="`scroll-item ${route.path === tagItem.path ? 'activeItem' : ''}`"
            v-for="(tagItem, index) in TagNavStore.tagNavList"
            :key="index"
            :ref="'dynamic' + index"
            @click="handleTagClick(tagItem)"
          >
            <div class="mark" v-if="isActive(tagItem, index)"></div>

            <a>{{ tagItem.meta.title }}</a>

            <SvgIcon
              v-if="index !== 0"
              class="close-icon"
              @click.stop="deleteTag(tagItem)"
              name="ssk-close-circle-fill"
              size="16"
              color="#909399"
            />
          </div>
        </div>
      </el-scrollbar>
    </div>
    <div class="arrow-right"><SvgIcon name="ssk-right"></SvgIcon></div>
  </div>
</template>

<style lang="scss" scoped>
.tags-view {
  width: 100%;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ebeef5;

  .scroll-container {
    flex: 1;
    overflow: hidden;
    padding: 5px 0;
    // position: relative;
    white-space: nowrap;
    // position: relative;
    // padding: 5px;
    .tags {
      display: flex;
      width: fit-content;
      transform: translateX(v-bind(TagsTranslateX + "px"));

      &:first-child {
        margin-left: 5px;
      }

      .scroll-item {
        // line-height: 29px;

        transition: all 0.2s;
        height: 29px;
        margin-right: 5px;
        padding: 0 8px;
        border-radius: 3px;
        cursor: pointer;
        // box-shadow: 0 0 1px #888;
        border: 1px solid #c2c2c2;
        display: flex;
        align-items: center;

        float: left;

        a {
          padding: 0 4px;
        }
        .close-icon {
          cursor: pointer;
          margin-left: 3px;
          // position: absolute;
          // top: 50%;
          // transform: translate(-40%, -50%);
          // transition: all 0.3s;
          // transform: translate(0, -50%);
        }
      }
      .is-active-scroll-item {
        padding-right: 18px;
        position: relative;
      }
    }
  }
  .arrow-right,
  .arrow-left {
    height: 39px;
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .arrow-left {
    box-shadow: 5px 0 5px -6px #ccc;
  }
  .arrow-right {
    border-right: 0.5px solid #ccc;
    box-shadow: -5px 0 5px -6px #ccc;
  }
}
.activeItem {
  border: 1px dashed #409eff !important;
}
.mark {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #409eff;
}
</style>
