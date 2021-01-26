<template>
  <div
    :class="{'is-active': isActive}"
    @click="toggleClick"
  >
      <svgicon name="hamburger" width="20px" height="20px"></svgicon>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  setup(props, ctx) {
    function toggleClick() {
      ctx.emit('toggleClick')
    }
    return {
      toggleClick
    }
  }
})
</script>
<style lang="less" scoped>
.is-active {
  transform: rotate(180deg);
}
</style>
