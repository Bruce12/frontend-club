<template>
  <div
    class="app-wrapper"
  >
    <SideBar class="sidebar-container"/>
    <div
      class="main-container"
    >
      <NavBar></NavBar>
      <AppMain></AppMain>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { NavBar, AppMain, SideBar } from './components'
export default defineComponent({
  components: {
    NavBar,
    AppMain,
    SideBar
  },
  setup() {
    //
  }
})
</script>
<style lang="less" scoped>
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
}
.main-container {
  min-height: 100%;
  transition: margin-left .28s;
  margin-left: var(--sider-bar-width);
  position: relative;
}
.sidebar-container {
  transition: width 0.28s;
  width: var(--sider-bar-width);
  height: 100%;
  position: fixed;
  font-size: 0px;
  top: 0px;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
  background-color: royalblue;
}
</style>
