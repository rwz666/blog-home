<template>
  <div class="home">
    <MainLeft />
    <MainRight />
  </div>
</template>


<script lang="ts" setup>
import MainLeft from '@/components/Home/Main/Left.vue'
import MainRight from '@/components/Home/Main/Right.vue'
</script>


<style lang='scss' scoped>
.home {
  width: 100%;
  max-width: 1200px;
  display: flex;
  align-items: center;
}
</style>