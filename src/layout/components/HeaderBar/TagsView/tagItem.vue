<!-- <template>
  <div
    ref="tagRef"
    :id="tagItem.path"
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
</template>
<script lang="ts" setup></script> -->
