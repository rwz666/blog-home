<template>
  <div class="links">
    <div class="line">
      <el-icon :size="22" style="margin-right: 8px">
        <!-- <Link /> -->
        <!-- <component :is="'link'" /> -->
        <i class="iconfont icon-link" style="font-size: 1.4rem;"></i>
      </el-icon>
      <div class="title">网站列表</div>
    </div>
    <swiper v-if="siteLinkList.length" :modules="modules" :mousewheel="true" :space-between="20" :pagination="{
      el: '.swiper-pagination',
      clickable: true,
      bulletElement: 'div',
    }">
      <swiper-slide v-for="(sites, index) in siteLinkList" :key="index">
        <el-row :gutter="20" class="link-all">
          <el-col :span="8" v-for="item in sites" :key="item">
            <div class="item cards" @click="jumpLink(item)">
              <i :class="'iconfont ' + item.icon" style="font-size: 1.2rem; margin-right:8px;"></i>
              <span>{{ item.name }}</span>
            </div>
          </el-col>
        </el-row>
      </swiper-slide>
      
    </swiper>
    <div class="swiper-pagination">
    </div>
  </div>
</template>


<script lang="ts" setup>
import siteLinks from '@/assets/json/siteLinks.json'
import { computed } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination, Mousewheel } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/pagination'

const modules = [Pagination, Mousewheel]


// 计算网站链接
const siteLinkList = computed(() => {
  const res = []
  for (let i = 0; i < siteLinks.length; i += 6) {
    const item = siteLinks.slice(i, i + 6)
    res.push(item)
  }
  return res
})

// 跳转链接
const jumpLink = (item: any) => {
  window.open(item.link, '_blank')
}

</script>


<style lang='scss' scoped>
.links {
  position: relative;
  width: 100%;
  border-radius: 10px;
  padding: 10px;
  display: flex;
  flex-direction: column;

  .line {
    display: flex;
    margin: 1.4rem 0.6rem 1rem;
    align-items: center;
    justify-content: left;

    .title {
      font-size: 1.2rem;
      font-weight: 400;
      text-shadow: 0 0 5px #00000050;
    }

  }

  .el-icon {
    display: flex;
    align-items: center;
    justify-content: center;

  }

  .swiper {
    // position: relative;
    width: 100%;
    margin-bottom: 1rem;
    

    .link-all {
      height: 220px;

      .item {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100px;
      }
    }
  }

  .swiper-pagination {
    display: flex;
    justify-content: center;
    width: 100%;

    :deep(.swiper-pagination-bullet) {
    background-color: #fff;
    width: 20px;
    height: 4px;
    margin: 0 4px;
    border-radius: 4px;
    opacity: 0.2;
    transition: opacity 0.3s;

    &.swiper-pagination-bullet-active {
      opacity: 1;
    }

    &:hover {
      opacity: 1;
    }
  }
  }
  
}
</style>