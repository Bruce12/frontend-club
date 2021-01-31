<template>
  <div class="navBar">
    <Hamburger
      @toggleClick="toggleClick"
      :isActive="siderbar.opened"
      class="hamburger-container"
    />
    <Breadcrumb
      class="breadcrumb-container"
    />
    <div class="right-menu">
      <!--右边菜单-->
      <template v-if="true">
        <FullScreen class="right-menu-item hover-effect" />
      </template>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue'
import Breadcrumb from '@/components/Breadcrumb/index.vue'
import Hamburger from '@/components/Hamburger/index.vue'
import FullScreen from '@/components/FullScreen/index.vue'
import { appStore } from '@/store/modules/app'
export default defineComponent({
  components: {
    Breadcrumb,
    Hamburger,
    FullScreen
  },
  setup() {
    function toggleClick() {
      appStore.toggleSideBar()
    }
    return {
      toggleClick,
      siderbar: computed(() => appStore.siderbar)
    }
  }
})
</script>
<style lang="less" scoped>
.navBar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
 .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    padding: 0 15px;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;
    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }
  .breadcrumb-container {
    float: left;
  }
}
.right-menu {
  float: right;
  height: 100%;
  line-height: 50px;
  &:focus {
    outline: none;
  }
  .right-menu-item {
    display: inline-block;
    padding: 0 8px;
    height: 100%;
    font-size: 18px;
    color: #5a5e66;
    vertical-align: text-bottom;
    &.hover-effect {
      cursor: pointer;
      transition: background .3s;
      &:hover {
        background: rgba(0, 0, 0, .025);
      }
    }
  }
}

</style>
