<template>
  <div
    v-if="!item.meta || !item.meta.hidden"
    :class="[isCollapse ? 'simple-mode' : 'full-mode', {'first-level': isFirstLevel}]"
  >
    <template v-if="theOnlyOneChild && !theOnlyOneChild.children">
      <SidebarItemLink
        v-if="theOnlyOneChild.meta"
        :to="resolvePath(theOnlyOneChild.path)"
      >
        <el-menu-item
          :index="resolvePath(theOnlyOneChild.path)"
          :class="{'submenu-title-noDropdown': isFirstLevel}"
        >
         <svgicon
          v-if="theOnlyOneChild.meta.icon"
          :name="theOnlyOneChild.meta.icon"
         />
         <template #title
           v-if="theOnlyOneChild.meta.title"
         >
          {{ theOnlyOneChild.meta.title }}
         </template>
        </el-menu-item>
      </SidebarItemLink>
    </template>
    <el-submenu
      v-else
      :index="item.path"
      popper-append-to-body
    >
      <template #title>
        <svgicon
          class="svg-icon"
          v-if="item.meta && item.meta.icon"
          :name="item.meta.icon"
        />
        <template v-if="item.meta && item.meta.title">
          <span>{{ item.meta.title }}</span>
        </template>
      </template>
      <template v-if="item.children">
        <SidebarItem
          v-for="child in item.children"
          :key="child.path"
          :item="child"
          :is-collapse="isCollapse"
          :is-first-level="false"
          :base-path="resolvePath(child.path)"
          class="nest-menu"
        >

        </SidebarItem>
      </template>
    </el-submenu>
  </div>
</template>
<script lang="ts">
import type { PropType } from 'vue'
import { defineComponent, computed } from 'vue'
import { RouteRecordRaw } from 'vue-router'
import { isExternal } from '@/utils/validate'
import path from 'path'
import SidebarItemLink from './SidebarItemLink.vue'
export default defineComponent({
  name: 'SidebarItem',
  components: {
    SidebarItemLink
  },
  props: {
    item: {
      type: Object as PropType<RouteRecordRaw>,
      default: () => {}
    },
    isCollapse: {
      type: Boolean,
      default: false
    },
    isFirstLevel: {
      type: Boolean,
      default: true
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const showingChildNumber = computed(() => {
      if (props.item.children) {
        const showingChildren = props.item.children.filter(item => {
          if (item.meta && item.meta.hidden) {
            return false
          } else {
            return true
          }
        })
        return showingChildren.length
      }
      return 0
    })
    const resolvePath = (routePath: string) => {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(props.basePath)) {
        return props.basePath
      }

      return path.resolve(props.basePath, routePath)
    }
    return {
      showingChildNumber,
      theOnlyOneChild: computed(() => {
        if (showingChildNumber.value >= 1) {
          return null
        }
        if (props.item.children) {
          for (const child of props.item.children) {
            if (!child.meta || !child.meta.hidden) {
              return child
            }
          }
        }
        return { ...props.item, path: '' }
      }),
      resolvePath
    }
  }
})
</script>
<style lang="less" scoped>
.el-menu--vertical{
  max-height: 100%;
  overflow: auto;
}
:deep(.el-menu--popup .el-menu-item) {
  height: 42px !important;
  line-height: 42px !important;
  padding-left: 24px !important;
}
:deep(.el-submenu .el-menu-item) {
  height: 30px !important;
  line-height: 30px !important;
  padding-left: 24px !important;
}
:deep(.el-submenu.is-active > .el-submenu__title) {
  color:#f4f4f5 !important;
}
.simple-mode {
  &.first-level {
    :deep(.submenu-title-noDropdown) {
      padding: 0 !important;
      position: relative;
      .el-tooltip {
        padding: 0 !important;
      }
    }

    :deep(.el-submenu) {
      overflow: hidden;
      &>.el-submenu__title {
        padding: 0px !important;

        .el-submenu__icon-arrow {
          display: none;
        }

        &>span {
          visibility: hidden;
        }
      }
    }
  }
}
.full-mode {
  :deep(.nest-menu .el-submenu>.el-submenu__title,
  .el-submenu .el-menu-item) {
    min-width: var(--sider-bar-width) !important;
    background-color: #1f2d3d!important;
    &:hover {
      background-color: #001528 !important;
    }
  }
}
.svg-icon {
  margin-right: 16px;
}

.simple-mode {
  .svg-icon {
    margin-left: 20px;
  }
}
a {
  text-decoration: none;
}
</style>
