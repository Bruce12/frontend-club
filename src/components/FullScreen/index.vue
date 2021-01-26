<template>
  <div ref="refFullScreen" class="full_screen">
    <svgicon
      :name="isFullscreen ? 'exitFullscreen': 'fullscreen' "
      @click="screenfull()"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue'
import screenfull from 'screenfull'
import { ElMessage } from 'element-plus'

const sf = screenfull

export default defineComponent({
  name: 'FullScreen',
  setup() {
    //
    const isFullscreen = ref(false)
    function screenfull() {
      if (!sf.isEnabled) {
        ElMessage({
          message: 'you browser can not work',
          type: 'warning'
        })
        return false
      }
      sf.toggle()
    }
    function change() {
      if (sf.isEnabled) {
        isFullscreen.value = sf.isFullscreen
      }
    }
    onMounted(() => {
      if (sf.isEnabled) {
        sf.on('change', change)
      }
    })
    // 组件销毁
    onUnmounted(() => {
      if (sf.isEnabled) {
        sf.off('change', change)
      }
    })
    return {
      isFullscreen,
      screenfull
    }
  }
})
</script>
