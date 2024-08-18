<template>
  <div class="left">
    <Message />
    <SocialLinks />
  </div>
</template>

<script lang="ts" setup>
import Message from '../Message.vue'
import SocialLinks from '../SocialLinks.vue';
</script>

<style lang="scss" scoped>
.left {
  width: 50%;
  margin-right: 20px;
  transform: translateY(20px);


  &.hidden {
    display: none;
  }

  @media (max-width: 720px) {
    margin-right: 0;
    width: 100%;
  }
}
</style>