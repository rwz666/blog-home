<template>
  <div class="socialLinks">
    <div class="link">
      <a v-for="item in socialLinks" :key="item.name" :href="item.link" target="_blank"
        @mouseenter="socialTip = item.tip + item.name" @mouseleave="socialTip = '通过这里联系我吧'">
        <img :src="item.icon" :alt="item.name" height="24" class="linkIcon">
      </a>
    </div>
    <span class="tip">{{ socialTip }}</span>
  </div>
</template>

<script lang="ts" setup>


const socialLinks = [
  {
    "icon": "/images/icon/github.png",
    "name": 'github',
    "tip": '欢迎访问',
    "link": 'https://github.com'
  },
  {
    "icon": "/images/icon/gitee.png",
    "name": 'gitee',
    "tip": '欢迎访问',
    "link": 'https://gitee.com'
  },
  {
    "icon": "/images/icon/qq.png",
    "name": 'qq',
    "tip": '欢迎访问',
    "link": 'tencent://message/?uin=3116419886'
  },
  {
    "icon": "/images/icon/wechat.png",
    "name": 'wechat',
    "tip": '欢迎访问',
    "link": 'weixin://contacts/profile/18438328537'
  },
  {
    "icon": "/images/icon/bilibili.png",
    "name": 'bilibili',
    "tip": '欢迎访问',
    "link": 'https://bilibili.com'
  },
  {
    "icon": "/images/icon/email.png",
    "name": 'email',
    "tip": '欢迎访问',
    "link": 'mailto:18438328537@163.com'
  }
]
let socialTip = ref("通过这里联系我吧")

</script>

<style lang="scss" scoped>
.socialLinks {
  max-width: 500px;
  width: 100%;
  height: 40px;
  display: flex;
  margin-top: 1rem;
  align-items: center;
  justify-content: space-between;

  background-color: transparent;
  border-radius: 6px;
  backdrop-filter: blur(0);

  @media (max-width: 800px) {
    max-width: 100%;
    justify-content: center;

    .link {
      justify-content: space-evenly !important;
      width: 100%;
    }

    .tip {
      display: none;
    }
  }

  .link {
    display: flex;

    a {
      display: inherit;
      transition: transform 0.5s ease;

      .linkIcon {
        margin: 0 10px;
      }

      &:hover {
        transform: scale(1.3);
      }

      &:active {
        transform: scale(1);
      }
    }
  }

  .tip {
    margin-right: 10px;
    display: none;
    animation: fade 0.5s;
  }

  @media(min-width: 768px) {
    &:hover {
      background-color: #00000025;
      backdrop-filter: blur(10px);

      .tip {
        display: block;
      }
    }
  }
}
</style>