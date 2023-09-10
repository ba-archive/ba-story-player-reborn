<script setup lang="ts">
import { onMounted, Ref, ref } from "vue";
import { initPlayer } from "../../lib";
defineOptions({
  name: "HHome",
});
const Player = ref<HTMLElement>() as Ref<HTMLElement>;
onMounted(() => {
  debugger;
  initPlayer(Player.value);
});
</script>

<template>
  <h1>Hello World</h1>
  <div ref="Player"></div>
</template>
