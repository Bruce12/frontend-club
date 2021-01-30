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
      <SiderbarItem />
    </el-menu>
  </el-scrollbar>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue'
import SiderbarItem from './SidebarItem.vue'
import { useStore } from 'vuex'
import { sotreKey } from '@/store'
import { useRoute } from 'vue-router'
export default defineComponent({
  name: 'SideBar',
  components: {
    SiderbarItem
  },
  setup() {
    const store = useStore(sotreKey)
    const { meta, path } = useRoute()
    return {
      isCollapse: computed(() => {
        return !store.state.appModule.siderbar.opened
      }),
      activeMenu: computed(() => {
        // 当前处于激活状态的菜单
        if (meta.activeMenu) return meta.activeMenu
        return path
      })
    }
  }
})
</script>
<style lang="less" scoped>
.scrollbar-wrapper {
  overflow-x: hidden !important;
}
</style>
