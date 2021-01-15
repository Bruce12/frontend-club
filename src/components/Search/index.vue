<template>
  <div class="warp_component">
    <el-form
      label-position="left"
      inline
      size="medium"
      class="mt10"
    >
      <slot></slot>
      <el-form-item>
        <div class="control_panel">
          <el-button type="primary" size="medium" @click.passive="search">搜索</el-button>
          <el-button size="medium" @click.passive="reset">重置</el-button>
          <slot name="control"></slot>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
  emits: ['search', 'clear'],
  setup(props, ctx) {
    const search = () => {
      ctx.emit('search')
    }
    const reset = () => {
      ctx.emit('clear')
    }
    return {
      search,
      reset
    }
  }
})
</script>
<style lang="less" scoped>
.warp_component {
  background-color: #faebcc;
  border-radius: 6px;
  padding: 0 .8em;
  overflow: hidden;
  padding-top: 14px;
  margin-bottom: 18px;
}
.control_panel {
  display: inline-block;
}
.mt10 {
  margin-top: 10px;
}
</style>
