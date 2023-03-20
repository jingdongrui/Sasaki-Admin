import { nextTick, ref } from "vue";
export const useTag = () => {
  const currentIndex = ref(-1);
  const currentIcon = ref("ssk-close-circle");
  const iconSize = ref("12");

  const enterNavTag = (index: number) => {
    currentIndex.value = index;
  };
  const leaveNavTag = (index: number) => {
    currentIndex.value = -1;
  };
  const enterCloseIcon = () => {
    currentIcon.value = "ssk-close-circle-fill";
    iconSize.value = "16";
  };
  const leaveCloseIcon = () => {
    currentIcon.value = "ssk-close-circle";
    iconSize.value = "12";
  };

  return {
    currentIndex,
    currentIcon,
    iconSize,
    enterNavTag,
    leaveNavTag,
    enterCloseIcon,
    leaveCloseIcon
  };
};
