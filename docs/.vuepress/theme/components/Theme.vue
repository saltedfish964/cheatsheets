<!--
 * @Author: zengminghong
 * @Date: 2021-09-01 11:01:33
 * @LastEditTime: 2021-09-01 14:37:26
 * @LastEditors: zengminghong
 * @Description: 
-->
<template>
  <div class="group-btn">
    <div 
      class="btn" 
      :class="{
        active: item === mode
      }"
      v-for="item in btns" 
      :key="item"
      @click="onChangeMode(item)"
    >
      <i :class="`iconfont icon-${item}`"></i>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      btns: ['light', 'auto', 'dark'],
      mode: 'auto',
    };
  },
  methods: {
    setTheme() {
      let htmlEle = document.getElementsByTagName('html')[0];
      let currentMod = 'auto';
      if (this.mode === 'auto') {
        let hours = new Date().getHours();
        if (hours > 18 || hours < 6) {
          currentMod = 'dark';
        } else {
          currentMod = 'light';
        }
      } else {
        currentMod = this.mode;
      }
      htmlEle.dataset.colorMode = currentMod;
      localStorage.setItem('mode', this.mode);
    },
    initMode() {
      let mode = localStorage.getItem('mode');
      this.mode = mode ? mode : 'auto';
      this.setTheme();
    },
    onChangeMode(mode) {
      this.mode = mode;
      this.setTheme();
    },
    onChangeTheme() {
      let htmlEle = document.getElementsByTagName('html')[0];
      htmlEle.dataset.colorMode = htmlEle.dataset.colorMode === 'dark' ? 'light' : 'dark';
    },
  },
  mounted () {
    this.initMode();
  },
}
</script>

<style lang="stylus">
.group-btn
  display flex
  margin 0 15px
  font-size 0.9rem
  border-radius 5px
  box-sizing border-box
  transition 0.2 border linear
  border 1px solid var(--border-color)
  overflow hidden
  .btn
    width 25px
    height 25px
    display flex
    align-items center
    justify-content center
    cursor pointer
    color var(--color-text-primary)
    transition 0.2s color linear
    &:hover
      color var(--main-color)
    &.active
      transition 0.2s background linear
      background var(--active-background-color)
      color var(--main-color)
</style>