<template>
  <ErrorPage 
    :image="image"
    :title="title || '403：无访问权限'"
    :message="message || '女仆等级不够……'">
    <template #extra>
    </template> 
  </ErrorPage>
</template>
<script setup lang="ts">
import image from "@/assets/img/403.svg";
const props = defineProps<{
  title?: string;
  message?: string;
}>();
</script>
