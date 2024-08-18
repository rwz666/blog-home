<template>
  <div id="navbar">
    <div class="title">标题</div>
    <div class="links">
      <div class="link-item" v-for="link in links" :key="link.name">
        <router-link :to="link">{{ link.name }}</router-link>
      </div>
    </div>
  </div>
</template>


<script lang="ts" setup>
const links = [
  { name: '首页', path: '/' },
  { name: '关于', path: '/about' },
  // { path: '/contact' },
]
</script>


<style lang='scss' scoped>
#navbar {
  display: flex;
  padding: 1rem;
  font-size: 0.9rem;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #ffffff50;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
  // z-index: 1000;

  .links {
    display: flex;
    position: absolute;
    right: 1.5rem;

    .link-item {
      margin-left: 1.5rem;
    }
  }
}
</style>