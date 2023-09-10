<template>
  <ErrorPage 
    :image="image"
    :title="title || '500：内部服务器错误'"
    :message="message || '爱丽丝，不吃电池的！'">
    <template #extra>
    </template> 
  </ErrorPage>
</template>
<script setup lang="ts">
import image from "@/assets/img/500.svg";
const props = defineProps<{
  title?: string;
  message?: string;
  detail?: string;
}>();
</script>
