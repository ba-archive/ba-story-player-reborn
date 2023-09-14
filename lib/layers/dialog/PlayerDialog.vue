<script setup lang="ts">
import { DialogInstance } from "@lib/main";
import { DialogVueInstance } from "@lib/types/player";
import { injectEventBus, injectUuid, makeExport } from "@lib/util";
import { onMounted, ref } from "vue";

defineOptions({
  name: "PlayerDialog",
});
const uuid = injectUuid();
const eventBus = injectEventBus();
const root = ref<HTMLDivElement>();
const name = ref("");
const department = ref("");
const content = ref("This is Dialog content");
function showText(text: string) {
  content.value = text;
}
const exports = makeExport<DialogVueInstance>({
  content,
  showText,
});
onMounted(() => {
  eventBus.emit("DialogMounted", new DialogInstance(exports));
});
</script>

<template>
  <div ref="root" class="relative">
    <div class="dialog absolute bottom-0 w-full h-37%">
      <div class="inner-dialog relative w-full h-full">
        <div class="title">
        <span class="name self-end color-white">{{
            name ? name : "&emsp;"
          }}</span>
        <span class="department ml-10px">{{
            department
          }}</span>
      </div>
      <hr/>
      <div class="content mt-1.5% color-white">
        {{ content }}
      </div>
      <div class="next-image-btn absolute right-0 bottom-1rem">&zwj;</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
hr {
  border: 0.1px rgba(255, 255, 255, 0.666) solid;
}

.dialog {
  background-image: linear-gradient(
      to bottom,
      rgba(255, 0, 0, 0),
      rgba(19, 32, 45, 0.9) 30%
  );
  padding: 3rem 8rem;
  white-space: pre-line;

  .inner-dialog {
    .department {
      color: rgb(156, 218, 240);
    }
  }

  .next-image-btn {
    $size: 10px;
    animation: next-btn 0.6s linear alternate infinite;
    background: url("./assets/text-next.webp");
    background-size: $size $size;
    width: $size;
    height: $size;
  }

  @keyframes next-btn {
    0% {
      transform: translateY(0);
    }

    40% {
      transform: translateY(10%);
    }

    100% {
      transform: translateY(50%);
    }
  }
}
</style>
