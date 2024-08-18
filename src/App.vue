<template>
  <!-- 加载 -->
  <Loding />
  <!-- 壁纸 -->
  <Background @loadComplete="loadComplete" />
  <!-- 导航栏 -->
  <el-container>
    <el-header>
      <Header></Header>
    </el-header>
    <el-main v-show="!store.backgroundShow">
      <router-view></router-view>
    </el-main>
  </el-container>

</template>

<script setup lang="ts">
import { cursorInit } from '@/utils/cursor'
import { nextTick, onMounted } from 'vue'
import Background from '@/components/Background.vue'
import Header from '@/components/Header/index.vue'

/* 两种加载动画 */
import Loding from '@/components/Loading/LoadingRotateCircle.vue'
// import Loding from '@/components/Loading/Loading.vue'
import { mainStore } from './store';


const store = mainStore()
// 关在完成事件
onMounted(() => {
  //自定义鼠标
  cursorInit()
})
// 加载完成事件
function loadComplete() {
  nextTick(() => {
    console.log('App.vue加载完成事件')
  })
}
// 添加鼠标中键点击事件
window.addEventListener('mousedown', function (event) {
  // 检查是否是鼠标中键点击事件
  if (event.button === 1) {
    store.backgroundShow = !store.backgroundShow
  }
});

</script>

<style lang="scss" scoped>
.el-main {
  display: flex;
  align-items: center;
  height: 100vh;
  justify-content: center;
}
</style>
