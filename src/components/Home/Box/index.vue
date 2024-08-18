<template>
  <div class="box cards">
    <div class="content">
      <TimeCapsule />
    </div>
  </div>
</template>


<script lang="ts" setup>
import TimeCapsule from './TimeCapsule.vue'

</script>


<style lang='scss' scoped>
.box {
  height: 100%;

  &:hover {
    transform: scale(1);
  }

  .content {
    width: 100%;
    height: 100%;
    padding: 1.4rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

}
</style>