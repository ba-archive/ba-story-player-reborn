<script setup lang="ts">
import PlayerDialog from "./layers/dialog/PlayerDialog.vue";
import { injectEventBus, injectUuid } from "./util";

defineOptions({
  name: "BaStoryPlayer",
});
const uuid = injectUuid();
const eventBus = injectEventBus();
const root = ref<HTMLDivElement>();
onMounted(() => {
  eventBus.emit("AppMounted", root.value!);
});
</script>

<template>
  <div :id="uuid" class="w-1440px h-810px relative player" ref="root">
    <div class="dialog absolute w-full h-full top-0 left-0">
      <PlayerDialog class="w-full h-full" />
    </div>
  </div>
</template>
