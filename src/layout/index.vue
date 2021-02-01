<template>
  <div
    class="app-wrapper"
    :class="classObj"
  >
   <div
      v-if="classObj.mobile && sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    />
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
import { defineComponent, computed, watch, onUnmounted } from 'vue'
import { NavBar, AppMain, SideBar } from './components'
import { useRoute } from 'vue-router'
import { appStore, DeviceType } from '@/store/modules/app'
export default defineComponent({
  components: {
    NavBar,
    AppMain,
    SideBar
  },
  setup() {
    const device = computed(() => appStore.device)
    const route = useRoute()
    const sidebar = computed(() => appStore.siderbar)
    const isMobile = () => {
      const rect = document.body.getBoundingClientRect()
      return rect.width - 1 < 992
    }
    const resizeHandler = () => {
      const mobile = isMobile()
      if (!document.hidden) {
        appStore.toggleDevice(mobile ? DeviceType.Mobile : DeviceType.Desktop)
        if (mobile) {
          appStore.closeSideBar()
        }
      }
    }
    // 监听 route 路由的变化
    watch(
      () => route.path,
      () => {
        if (device.value === DeviceType.Mobile && sidebar.value.opened) {
          appStore.closeSideBar()
        }
      }
    )
    // 监听 resize 事件
    window.addEventListener('resize', resizeHandler)
    onUnmounted(() => {
      window.removeEventListener('resize', resizeHandler)
    })
    return {
      classObj: computed(() => {
        return {
          hideSidebar: !sidebar.value.opened,
          mobile: device.value === DeviceType.Mobile
        }
      }),
      sidebar,
      handleClickOutside: () => {
        appStore.closeSideBar()
      }
    }
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
}
// 隐藏
.hideSidebar {
  .main-container {
    margin-left: 54px;
  }
  .sidebar-container {
    width: 54px !important;
  }
  .fixed-header {
    width: calc(100% - 54px);
  }
}
.mobile {
  .main-container {
    margin-left: 0px;
  }
  .sidebar-container {
    transition: transform .28s;
    width: var(--sider-bar-width) !important;
  }
  &.openSidebar {
    position: fixed;
    top: 0;
  }
  &.hideSidebar {
    .sidebar-container {
      pointer-events: none;
      transition-duration: 0.3s;
      transform: translate3d(calc(var(--sider-bar-width) -  var(--sider-bar-width) * 2), 0, 0);
    }
  }
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}
</style>
