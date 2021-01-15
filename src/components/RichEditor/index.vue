<template>
 <div
    class="rich_editor"
  >
    <div
      :id="uniqueId"
      :style="{minHeight: height, width: width}"
    >
    </div>
 </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, onBeforeMount } from 'vue'
import ImageResize from 'quill-image-resize-module'
import Quill from 'quill'
import defaultOpt from './default-opt'
import 'katex/dist/katex.css'
import 'quill/dist/quill.snow.css'

export default defineComponent({
  name: 'RichEditor',
  props: {
    id: {
      type: String,
      default: ''
    },
    height: {
      type: String,
      default: '10vh'
    },
    width: {
      type: String,
      default: ''
    },
    opt: {
      type: Object,
      default: () => {}
    }
  },
  setup(props, context) {
    // x=\frac{-b\pm\sqrt{b^2-4ac}}{2a}
    const uniqueId = ref('')
    onBeforeMount(() => {
      uniqueId.value = props.id
      if (!props.id) {
        uniqueId.value = `quill_${new Date().getTime()}_${Math.round(Math.random() * 100000)}`
      }
    })
    onMounted(() => {
      const opts = Object.assign({}, props.opt, defaultOpt)
      Quill.register('modules/imageResize', ImageResize)
      /* eslint-disable-next-line */
      const quill = new Quill('#' + uniqueId.value, opts)
      quill.on('text-change', (delta, oldDelta, source) => {
        if (source === 'user') context.emit('update:modelValue', quill.root.innerHTML)
      })
    })
    return { uniqueId }
  }
})
</script>
<style lang="less" scoped>
.rich_editor {
  // overflow: hidden;
}
</style>
