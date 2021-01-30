<template>
  <el-breadcrumb
    class="app-breadcrumb"
    separator="/"
  >
    <transition-group name="breadcrumb">
      <el-breadcrumb-item :to="{path: '/dashboard'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="">活动详情</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { useRoute, RouteLocationMatched } from 'vue-router'
export default defineComponent({
  name: 'Breadcrumb',
  setup() {
    let breadcrumbs
    // 获取导航菜单
    function getBreadcrumb() {
      const route = useRoute()
      let matched = route.matched.filter(item => item.meta && item.meta.title)
      const first = matched[0]
      if (!isDashboard(first)) {
        // RouteLocationMatched
        matched = [{ path: '/dashboard', meta: { title: 'dashboard' } } as any, ...matched]
      }
      breadcrumbs = reactive(matched.filter(item => {
        return item.meta && item.meta.title && item.meta.breadcrumb !== false
      }))
      // 过滤
    }
    // 是否是首页
    function isDashboard(route: RouteLocationMatched) {
      const name = (route && route.name as string)
      if (!name) return false
      return name.trim().toLocaleLowerCase() === 'dashboard'
    }
    getBreadcrumb()
    return {
      breadcrumbs
    }
  }
})
</script>
<style lang="less" scoped>
.el-breadcrumb__inner,
.el-breadcrumb__inner a {
  font-weight: 400 !important;
}
.app-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
