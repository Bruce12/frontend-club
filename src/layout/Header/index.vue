<template>
  <div>
    <div>

    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'Header',
  setup() {
    const html = ref('')
    return {
      html
    }
  }
})
</script>
<style lang="less" scoped>
.iframe {
  width: 100vw;
}
</style>
