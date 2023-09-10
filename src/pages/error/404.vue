<template>
  <ErrorPage 
    :image="image"
    :title="title || '404：请求的页面不存在'"
    :message="message || '已经数千年没有人类来到这里了……总想说一遍这样的台词。'">
    <template #extra>
    </template> 
  </ErrorPage>
</template>
<script setup lang="ts">
import image from "@/assets/img/404.svg";
const props = defineProps<{
  title?: string;
  message?: string;
}>();
</script>
