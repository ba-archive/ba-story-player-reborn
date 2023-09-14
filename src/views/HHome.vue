<script setup lang="ts">
import { onMounted, Ref, ref } from "vue";
import initPlayer from "@lib/index";
defineOptions({
  name: "HHome",
});
const Player = ref<HTMLElement>() as Ref<HTMLElement>;
onMounted(() => {
  const player = initPlayer(Player.value);
  Reflect.set(window, "player", player);
});
</script>

<template>
  <div ref="Player"></div>
</template>
