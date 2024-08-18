<template>
  <div class="message">
    <div class="logo"></div>
    <div class="descriptipn cards" @click="changeBoxOrMessage">
      <div class="content">
        <div class="text">
          欢迎访问本站点！
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { mainStore } from '@/store';

const store = mainStore()
const changeBoxOrMessage = () => {
  store.boxShowStatus = !store.boxShowStatus
  console.log('切换盒子展示状态', store.boxShowStatus)
}
</script>

<style lang="scss" scoped>
.message {
  display: flex;
  flex-direction: column;

  .logo {
    height: 120px;
    width: 120px;
    background-color: skyblue;
  }

  .descriptipn {
    padding: 1rem;
    margin-top: 3rem;
    max-width: 500px;

    .content {
      display: flex;
      justify-content: space-between;

      .text {
        // text-align: center;
        text-decoration: none;
        line-height: 2rem;
        ;
        margin: auto;
      }
    }

    @media (max-width: 800px) {
      max-width: 100%;
    }
  }

}
</style>