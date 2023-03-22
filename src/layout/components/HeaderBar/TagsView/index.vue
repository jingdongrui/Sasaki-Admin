<script lang="ts" setup>
import { useTag } from "./hook/useTag";
import { Close } from "@element-plus/icons-vue";

import { nextTick, ref, watch, onMounted, computed, getCurrentInstance } from "vue";
import { useTagNavStore } from "@/store/modules/tagNav";
import { useUserStore } from "@/store/modules/user";
import { RouteLocationNormalized, useRoute, useRouter } from "vue-router";
import { type } from "os";
const router = useRouter();
const route = useRoute();
const UserStore = useUserStore();
const TagNavStore = useTagNavStore();
// const tagList = ref<TagNavItem[]>([]);

const scrollContainerRef = ref();
const tagRef = ref();
const tagsRef = ref();
const TagsTranslateX = ref(0);
// 当前活跃tag的index
const currentActiveTagIndex = ref(-1);
// v-if="isShowLeftRightArrow"
// 是否显示左右箭头
const isShowLeftRightArrow = ref(false);
// computed(
//   () => scrollContainerRef.value.wrapRef.offsetWidth < tagsRef.value.offsetWidth
// );

onMounted(async () => {
  await nextTick();
  initTag();
  addTag();
  // window.addEventListener("resize", () => {
  //   isShowLeftRightArrow.value =
  //     scrollContainerRef.value.wrapRef.offsetWidth < tagsRef.value.offsetWidth ? true : false;
  // });
  // tag初始位置设置
  handleTagsLocation();
});

// 鼠标滚轮滚动
const onHandleScroll = (e: any) => {
  scrollContainerRef.value.wrapRef.scrollLeft += e.wheelDelta / 4;
};
const clickScrollToLeft = () => {
  scrollContainerRef.value.wrapRef.scrollLeft -= 40;
};
const clickScrollToRight = () => {
  scrollContainerRef.value.wrapRef.scrollLeft += 40;
};
// tag-nav的位置
const handleTagsLocation = async () => {
  await nextTick();
  const tagSpace = 5;
  const scrollContainerDom = scrollContainerRef.value;
  const tagsDom = tagsRef.value;
  const tagDomList = tagRef.value;
  const currentTagDom = tagDomList[currentActiveTagIndex.value];

  let firstTag = null;
  let lastTag = null;

  if (tagDomList.length > 0) {
    firstTag = tagDomList[0];
    lastTag = tagDomList[tagDomList.length - 1];
  }
  if (currentTagDom == firstTag) {
    scrollContainerDom.setScrollLeft(0);
  } else if (currentTagDom == lastTag) {
    scrollContainerDom.setScrollLeft(tagsDom.scrollWidth - scrollContainerDom.wrapRef.offsetWidth);
  } else {
    const prevTag = tagDomList[currentActiveTagIndex.value - 1];
    const nextTag = tagDomList[currentActiveTagIndex.value + 1];
    const afterNextTagOffsetLeft = nextTag.offsetLeft + nextTag.offsetWidth + tagSpace;
    const beforePrevTagOffsetLeft = prevTag.offsetLeft - tagSpace;

    if (
      afterNextTagOffsetLeft >
      scrollContainerDom.wrapRef.scrollLeft + scrollContainerDom.wrapRef.offsetWidth
    ) {
      scrollContainerDom.setScrollLeft(
        afterNextTagOffsetLeft - scrollContainerDom.wrapRef.offsetWidth
      );
    } else if (beforePrevTagOffsetLeft < scrollContainerDom.wrapRef.scrollLeft) {
      scrollContainerDom.setScrollLeft(beforePrevTagOffsetLeft);
    }
  }
};

// 判断是否为活跃的tag，并拿到活跃tag的下标
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
    // 添加tag后，判断是否显示左右箭头
    // isShowLeftRightArrow.value =
    //   scrollContainerRef.value.wrapRef.offsetWidth < tagsRef.value.offsetWidth ? true : false;
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
  handleTagsLocation();
});
</script>
<template>
  {{ isShowLeftRightArrow }}
  <div class="tags-view">
    <button v-if="isShowLeftRightArrow" class="arrow-left" @click="clickScrollToLeft">
      <SvgIcon name="ssk-left"></SvgIcon>
    </button>

    <el-scrollbar class="scroll-container" ref="scrollContainerRef" @wheel.prevent="onHandleScroll">
      <div class="tags" ref="tagsRef">
        <div
          ref="tagRef"
          :class="`scroll-item ${route.path === tagItem.path ? 'activeItem' : ''}`"
          v-for="(tagItem, index) in TagNavStore.tagNavList"
          :key="index"
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

    <button v-if="isShowLeftRightArrow" class="arrow-right" @click="clickScrollToRight">
      <SvgIcon name="ssk-right"></SvgIcon>
    </button>
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
    white-space: nowrap;

    .tags {
      display: flex;
      width: fit-content;
      transform: translateX(v-bind(TagsTranslateX + "px"));

      &:first-child {
        margin-left: 5px;
      }

      .scroll-item {
        transition: all 0.2s;
        height: 29px;
        margin-right: 5px;
        padding: 0 8px;
        border-radius: 3px;
        cursor: pointer;

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
    border: 0;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }
  .arrow-left {
    box-shadow: 5px 0 5px -6px #ccc;
  }
  .arrow-right {
    border-right: 1px solid #ccc;
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
:deep(.el-scrollbar__thumb) {
  background: transparent;
  width: 1px !important;
}
</style>
