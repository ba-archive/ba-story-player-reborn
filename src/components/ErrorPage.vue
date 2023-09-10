<template>
  <div class="aris-error-page">
    <img class="aris-error-page__image" :src="image" alt="error image"/>
    <h1 class="aris-error-page__title">
      {{ title }}
    </h1>
    <div class="aris-error-page__message">
      {{ message }}
    </div>
    <div class="aris-error-page__extra">
      <slot name="extra">

      </slot>
    </div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string;
  message: string;
  image: string;
}>();
</script>

<style lang="scss">
@use "@/styles/helper.scss" as h;
@use "@/styles/variables.scss" as *;

.aris-error-page {
  @include h.full;
  @include h.flex-v-center;
  gap: 24px;
  background: white;
  box-shadow: $card-shadow;
  border-radius: $radius--small;
  &__image {
    height: 128px;
    width: 128px;
    @include h.no-select;
  }
  &__title {
    margin: 0;
    font-size: 36px;
    font-weight: 500;
    line-height: 44px;
  }
  &__message {
    max-width: 784px;
    max-height: 328px;
    white-space: pre-wrap;
    color: #3d3d3d;
    font-size: 16px;
  }
  &__extra {
    display: flex;
    gap: 16px;
  }
}
</style>