<template>
  <div id="loader-wrapper" :class="store.imgLoadStatus ? 'loaded' : null">
    <div class="loader">
      <div class="loader-circle">
        <div class="face face1">
          <div class="circle">
          </div>
        </div>
        <div class="face face2">
          <div class="circle">
          </div>
        </div>
      </div>

      <div class="loader-text">
        <span class="name">{{ siteName }}</span>
        <span class="tip">加载中</span>
      </div>
    </div>
  </div>
</template>


<script lang="ts" setup>
  import { mainStore } from '@/store';

  const store = mainStore()
  const siteName = import.meta.env.VITE_SITE_NAME
    const a = 12

</script>


<style lang="scss" scoped>
#loader-wrapper {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
  background: #0c0b0b;
  overflow: hidden;
  

  .loader {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .loader-circle {
      position: relative;
      width: 200px;
      height: 200px;
      box-sizing: border-box;
      background-color: #000;
      border-radius: 50%;

      .face {
        position: absolute;
        border: 2px solid #121212;

        .circle{
          position: absolute;
          top: calc(50% - 1px);
          left: 50%;
          width: 50%;
          height: 2px;
          transform-origin: left;

          &::before{
            content: '';
            position: absolute;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background-color: #fff;
            top: -4px;
            right: -6px;
          }
        }
        
      }
      .face1 {
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: #090909;
        border-radius: 50%;
        border-left: 2px solid #ffff00;
        border-top: 2px solid #ffff00;
        animation: animate 2s linear infinite;
        .circle {
          transform: rotate(-45deg);

          &::before{
            content: '';
            position: absolute;
            background-color: #ffff00;
            box-shadow: 0 0 20px #ff0,
                        0 0 40px #ff0,
                        0 0 60px #ff0,
                        0 0 80px #ff0,
                        0 0 100px #ff0,
                        0 0 0 5px rgba(255,255,0,.1);
          }
        }
      }
      .face2 {
        top: 30px;
        left: 30px;
        right: 30px;
        bottom: 30px;
        background: #090909;
        border-radius: 50%;
        border-right: 2px solid #03a9f4;
        border-bottom: 2px solid #03a9f4;
        animation: animate 2s linear reverse infinite;
        .circle{
          transform: rotate(-45deg);
          &::before{
            background-color: #03a9f4;
            box-shadow: 0 0 20px #03a9f4,
                        0 0 40px #03a9f4,
                        0 0 60px #03a9f4,
                        0 0 80px #03a9f4,
                        0 0 100px #03a9f4,
                        0 0 0 5px rgba(3,169,244,.1);
          }
        }
      }
      
    }
    .loader-text {
      display: flex;
      flex-direction: column;
      align-items: center;
      z-index: 2;
      font-size: 24px;
      margin-top: 20px;

      .tip {
        margin-top: 6px;
        font-size: 18px;
        opacity: 0.6;
      }
    }
  }

  &.loaded {
    // visibility: hidden;
    transform: translateY(-100%);
    transition: transform .6s 1s ease-in-out;
  }


}

@keyframes animate{
  0%{
    transform: rotate(0deg);
  }
  100%{
    transform: rotate(360deg);
  }
}
</style>