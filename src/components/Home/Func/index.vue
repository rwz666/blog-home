<template>
  <div class="function">
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="left">
          <Hitokoto />
        </div>
      </el-col>
      <el-col :span="12">
        <div class="right">
          <TimeWeather />
        </div>
      </el-col>
    </el-row>
  </div>
</template>


<script lang="ts" setup>
import TimeWeather from '@/components/Home/Func/TimeWeather.vue';
import Hitokoto from '@/components/Home/Func/Hitokoto.vue';
</script>


<style lang="scss" scoped>
.function {
  height: 160px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;

  .el-row {
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .left,
    .right {
      height: 100%;
    }

  }
}
</style>