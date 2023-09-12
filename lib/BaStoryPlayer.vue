<script setup lang="ts">
import { injectEventBus } from "./util";

defineOptions({
  name: "BaStoryPlayer",
});
const uuid = inject("uuid", "");
const eventBus = injectEventBus();
const root = ref<HTMLDivElement>();
onMounted(() => {
  eventBus.emit("AppMounted", root.value!);
});
</script>

<template>
  <div :id="uuid" class="w-1440px h-810px" ref="root"></div>
</template>
