<template>
  <div class="right">

    <div class="baseShow" v-if="!store.boxShowStatus">
      <!-- 展示小功能区域（音乐播放器和时钟） -->
      <Func />
      <!-- 链接内容区域 -->
      <Links />
    </div>
    <div class="extendShow" v-if="store.boxShowStatus">
      <Box />
    </div>

  </div>
</template>

<script lang="ts" setup>
import Func from '@/components/Home/Func/index.vue'
import Links from '@/components/Home/Links.vue'
import Box from '@/components/Home/Box/index.vue'
import { mainStore } from '@/store';

const store = mainStore()


</script>

<style lang="scss" scoped>
.right {
  width: 50%;
  height: 80%;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  // justify-content: center;

  .baseShow,
  .extendShow {
    width: 100%;
    height: 100%;
  }

  .baseShow {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  @media(max-width: 720px) {
    display: none;
  }
}
</style>