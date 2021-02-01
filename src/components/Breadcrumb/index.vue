<template>
  <el-breadcrumb
    class="app-breadcrumb"
    separator="/"
  >
    <transition-group name="breadcrumb">
      <el-breadcrumb-item
        v-for="(item, index) in breadcrumbs"
        :key="item.path"
      >
        <span
          class="no-redirect"
          v-if="item.redirect === 'noredirect' || index === breadcrumbs.length-1"
        >
          {{ item.meta.title }}
        </span>
        <a v-else @click.prevent="handleLink(item)">
          {{ item.meta.title }}
        </a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>
<script lang="ts">
import { defineComponent, watch, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { compile } from 'path-to-regexp'
export default defineComponent({
  name: 'Breadcrumb',
  setup() {
    const breadcrumbs = ref<any>([])
    const route = useRoute()
    const router = useRouter()
    watch(
      () => route.path,
      (value) => {
        if (value.startsWith('/redirect/')) return
        getBreadcrumb()
      }
    )
    // 获取导航菜单
    function getBreadcrumb() {
      let matched = route.matched.filter(item => item.meta && item.meta.title)
      matched = [{ path: '/dashboard', meta: { title: 'Dashboard' } } as any, ...matched]
      breadcrumbs.value = matched.filter(item => {
        return item.meta && item.meta.title && item.meta.breadcrumb !== false
      })
      // 过滤
    }
    function pathCompile(path: string) {
      const { params } = route
      const toPath = compile(path)
      return toPath(params)
    }
    getBreadcrumb()
    return {
      breadcrumbs,
      handleLink: (item) => {
        const { redirect, path } = item
        if (redirect) {
          router.push(redirect)
        }
        router.push(pathCompile(path))
      }
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
