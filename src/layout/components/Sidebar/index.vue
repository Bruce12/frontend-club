<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
      :default-active="activeMenu"
      :collapse="isCollapse"
      :unique-opened="false"
      :collapse-transition="false"
      mode="vertical"
    >
      <SiderbarItem
        v-for="route in routes"
        :key="route.path"
        :item="route"
        :base-path="route.path"
        :is-collapse="isCollapse"
      />
    </el-menu>
  </el-scrollbar>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue'
import SiderbarItem from './SidebarItem.vue'
import { appStore } from '@/store/modules/app'
import { useRoute } from 'vue-router'
import { permissionStore } from '@/store/modules/permission'
export default defineComponent({
  name: 'SideBar',
  components: {
    SiderbarItem
  },
  setup() {
    return {
      isCollapse: computed(() => {
        return !appStore.siderbar.opened
      }),
      activeMenu: computed(() => {
        const { meta, path } = useRoute()
        // 当前处于激活状态的菜单
        if (meta.activeMenu) return meta.activeMenu
        return path
      }),
      routes: computed(() => permissionStore.routes)
    }
  }
})
</script>
<style lang="less" scoped>
:deep(.el-scrollbar__view) {
  height: 100%
}
.el-menu {
  border: none;
  height: 100%;
  width: 100% !important;
}
</style>
