<script lang="ts" setup>
import { useTag } from "./hook/useTag";

import { nextTick, ref, watch, onMounted } from "vue";
import { useTagNavStore } from "@/store/modules/tagNav";
import { RouteLocationNormalized, useRoute, useRouter } from "vue-router";

const tagList = ref<RouteLocationNormalized[]>([]);
const router = useRouter();
const route = useRoute();
const TagNavStore = useTagNavStore();

const {
  currentIndex,
  currentIcon,
  iconSize,
  enterNavTag,
  leaveNavTag,
  enterCloseIcon,
  leaveCloseIcon
} = useTag();

onMounted(() => {
  // console.log(route);
  // console.log(router);
  // console.log(TagNavStore);
});

// const handleRouteClick = (route: RouteLocationNormalized) => {
//   if (route.name !== route.value.name) {
//     router.push(route);
//   }
// };
watch(
  () => route,
  (to, from) => {
    console.log(router.getRoutes());
    // console.log(to.name);
    // console.log(from.name);
    // if (to.name) {
    //   TagNavStore.addTag(to);
    // }
    // if (from.name) {
    //   TagNavStore.removeTag(from);
    // }
  },
  {
    deep: true
    // immediate: true
  }
);
</script>
<template>
  <div class="tags-view">
    <div class="arrow-left"><SvgIcon name="ssk-left"></SvgIcon></div>
    <div class="scroll-container">
      <div class="tags">
        <div
          :class="`scroll-item ${currentIndex == index ? 'is-active-scroll-item' : ''}`"
          v-for="(tag, index) in tagList"
          :key="index"
          @mouseenter="enterNavTag(index)"
          @mouseleave="leaveNavTag(index)"
        >
          <a>{{ tag }}</a>

          <!-- <div v-show="currentIndex == index" class="close-icon"> -->
          <!--  -->
          <!-- is-active-close-icon -->
          <SvgIcon
            v-if="currentIndex == index"
            :class="`${currentIndex == index ? 'close-icon' : ''} `"
            @mouseenter="enterCloseIcon()"
            @mouseleave="leaveCloseIcon()"
            :name="currentIcon"
            :size="iconSize"
            color="#409EFF"
          />
        </div>
      </div>
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

    .tags {
      display: flex;

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
        box-shadow: 0 0 1px #888;
        line-height: 29px;
        position: relative;

        a {
          padding: 0 4px;
        }
        .close-icon {
          cursor: pointer;
          position: absolute;
          top: 50%;
          transform: translate(-40%, -50%);
          transition: all 0.3s;
          transform: translate(0, -50%);
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
</style>
