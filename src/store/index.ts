import { defineStore } from "pinia";

export const mainStore = defineStore('mainStore', {
  // 真正存储数据的地方(共享数据)
  state() {
    return {
      innerWidth: 0, // 当前窗口宽度
      imgLoadStatus: false, // 背景加载状态
      backgroundShow: false, // 背景是否展示
      coverType: 0, //壁纸种类
      boxShowStatus: false, // 盒子展示状态(时间胶囊)
    }
  },
  getters: {
    // 获取页面当前宽度
    getInnerWidth(state) {
      return state.innerWidth;
    }
  },
  actions: {
    // 更改当前页面宽度
    setInnerWidth(value: number) {
      this.innerWidth = value
    },
    // 更改背景加载状态
    setImgLoadStatus(value: boolean) {
      this.imgLoadStatus = value
    }

  }
})