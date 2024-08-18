<template>
  <div class="time-capsule" @click="testClick">
    <div class="title">
      <i class="iconfont icon-sjjn"></i>
      <span>时间胶囊</span>
    </div>
    <div class="all-capsule" v-for="item in timeCapsule">
      <div class="capsule-item">
        <div class="item-title">
          <span>
            {{ item.title }}已度过：&nbsp;&nbsp;
            <strong>{{ item.alreadyTime }}</strong>
            {{ item.title == '今天' ? '小时' : '天' }}
          </span>
          <span class="remain">
            剩余
            {{ item.remainTime }}
            {{ item.title == '今天' ? '小时' : '天' }}
          </span>
        </div>

        <el-progress :percentage="item.percentage" :text-inside="true" :stroke-width="22"></el-progress>

      </div>
    </div>
  </div>
</template>


<script lang="ts" setup>
import { getTimeCapsule } from '@/utils/getTime';

let timeCapsule = ref(getTimeCapsule())
onMounted(() => {
  timeCapsule.value = getTimeCapsule()
})
const testClick = () => {
  let timeCapsule = getTimeCapsule()
  console.log('timeCapsule', timeCapsule)
}
</script>


<style lang='scss' scoped>
.time-capsule {
  width: 100%;
  height: 100%;

  .title {
    display: flex;
    align-items: center;
    margin: 0.2rem 0 1.5rem;

    .iconfont {
      font-size: 1.3rem;
      margin-right: 0.5rem;
    }

    span {
      font-size: 1rem;
    }
  }

  .all-capsule {
    font-size: 0.93rem;
    font-weight: 600;


    .capsule-item {
      margin: 0.5rem 0;

      .item-title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 0.5rem 0.8rem 1rem 0.5rem; //上右下左

        .remain {
          color: #76bb74;
        }
      }
    }
  }
}
</style>