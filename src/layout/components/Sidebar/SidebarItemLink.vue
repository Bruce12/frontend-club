<template>
  <a
    v-if="isExternal(to)"
    :href="to"
    target="_blank"
  >
    <slot/>
  </a>
  <router-link
    v-else
    :to="to"
  >
    <slot/>
  </router-link>
</template>
<script lang="ts">
import type { PropType } from 'vue'
import { defineComponent } from 'vue'
import { isExternal } from '@/utils/validate'
export default defineComponent({
  name: 'SideBarItemLink',
  props: {
    to: {
      type: String as PropType<string>,
      default: ''
    }
  },
  setup() {
    return {
      isExternal
    }
  }
})
</script>
<style lang="less" scoped>
</style>
