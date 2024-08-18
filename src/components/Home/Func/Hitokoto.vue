<template>
  <div class="hitokoo cards">
    <!-- 一言内容 -->
    <div class="content" @click="updateHitokoto">
      <div class="text">{{ msg.hitokoto }}</div>
      <div class="author">—「&nbsp;{{ msg.from }}&nbsp;」</div>
    </div>
  </div>
</template>


<script lang="ts" setup>
import { getHitokoto, getOtherHitokoto } from '@/api';
import { ElMessage } from 'element-plus'
import { onMounted, reactive, ref } from 'vue';
import debounce from '@/utils/debounce'

onMounted(() => {
  getMessage()
})

const msg = reactive({
  hitokoto: '你若安好便是晴天',
  from: '林清玄'
})
// 获取一言数据
async function getMessage() {
  let result
  try {
    result = await getMessage1()
    console.log("result,", result)
  } catch (e) {
    console.log('获取一言1失败', e)
  }
  if (result) return;
  try {
    result = await getMessage2()
  } catch (e) {
    console.log('获取一言2失败', e)
  }
  if (result) return;
  ElMessage({
    showClose: true,
    message: '获取一言失败',
    type: 'error',
  })
  console.log(123)
}
const updateHitokoto = () => {
  // 防抖 500ms 立即执行
  debounce(() => {
    getMessage()
  }, 1000)
}
// 调用api获取一言
async function getMessage1() {
  const result = await getHitokoto()
  Object.assign(msg, result)
  return result
}
async function getMessage2() {
  let result = await getOtherHitokoto()
  let data = result.data
  msg.hitokoto = data.hitokoto
  msg.from = (data.source != '' ? data.source : '网络')
  return result
}


</script>


<style lang="scss" scoped>
.hitokoo {
  width: 100%;
  height: 100%;
  padding: 20px;

  .content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;

    .text {
      font-size: 1.1rem;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      line-clamp: 3;
    }

    .author {
      font-size: 1rem;
      align-self: flex-end;
      text-align: center;
      font-weight: bold;
    }
  }
}
</style>