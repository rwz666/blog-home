<template>
  <div :class="store.backgroundShow ? 'cover show' : 'cover'">
    <img v-show="store.imgLoadStatus" :src="bgUrl" alt="backgroundImg" class="bg" @load="imgLoadComplete"
      @animationend="imgAnimationEnd" />
    <div :class="store.backgroundShow ? 'gray hidden' : 'gray'"></div>
    <transition name="fade" mode="out-in">
      <a v-if="store.backgroundShow" class="download" :href="bgUrl" target="_blank">
        下载壁纸
      </a>
    </transition>
  </div>
</template>


<script lang="ts" setup name="Background">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { mainStore } from '@/store'

const emit = defineEmits(['loadComplete'])
const store = mainStore()
let bgUrl = ref('') //背景URL
const imgTimeout = ref(0) //图片加载定时器
const bgRandom = Math.floor(Math.random() * 10 + 1) //生成1-10之间的随机数（包括两边）

const changeBg = (type: number) => {
  if (type == 0) {
    bgUrl.value = `/images/background${bgRandom}.jpg`;
  }
}
// 图片加载完成
const imgLoadComplete = () => {
  imgTimeout.value = setTimeout(() => {
    store.setImgLoadStatus(true) // 设置图片加载状态（同时Loding组件会执行结束动作）
    console.log(bgUrl.value)
  }, Math.floor(Math.random() * (300 + 1)) + 300)
}

// 图片动画完成
const imgAnimationEnd = () => {
  console.log('壁纸加载且动画完成')
  // 执行加载完成事件
  emit('loadComplete')
}

// 挂载完成事件
onMounted(() => {
  // 加载壁纸
  changeBg(store.coverType)
})
// 卸载前事件
onBeforeUnmount(() => {
  clearTimeout(imgTimeout.value)
})
</script>


<style lang="scss" scoped>
.cover {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: 0.25s;
  z-index: -1;

  &.show {
    z-index: 1;
  }

  .bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;

    object-fit: cover;
    backface-visibility: hidden;
    filter: blur(20px) brightness(0.3);
    transition:
      filter 0.3s,
      transform 0.3s;
    animation: fade-blur-in 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
    animation-delay: 0.45s;
  }

  .gray {
    opacity: 1;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-image:
      radial-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5)),
      radial-gradient(rgba(0, 0, 0, 0) 33%, rgba(0, 0, 0, 0.3) 166%);

    &.hidden {
      opacity: 0;
    }
  }

  .download {
    position: absolute;
    color: white;
    left: 50%;
    transform: translateX(-50%);
    bottom: 50px;
    font-size: 18px;
    background-color: #00000030;
    width: 140px;
    height: 50px;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      transform: translateX(-50%) scale(1.1);
      background-color: #00000070;
    }

    &:active {
      transform: translateX(-50%) scale(1);
    }
  }

}
</style>