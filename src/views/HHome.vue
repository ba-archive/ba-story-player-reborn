<script setup lang="ts">
import { onMounted, Ref, ref } from "vue";
import initPlayer from "@lib/index";
defineOptions({
  name: "HHome",
});
const Player = ref<HTMLElement>() as Ref<HTMLElement>;
onMounted(() => {
  initPlayer(Player.value);
});
</script>

<template>
  <div ref="Player"></div>
</template>
