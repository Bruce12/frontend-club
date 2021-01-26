<template>
  <section class="app-main">
    <router-view v-slot="{Component}">
      <transition
        name="fade-transform"
        mode="out-in"
      >
        <component :is="Component" />
      </transition>
    </router-view>
  </section>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  setup() {
    return {}
  }
})
</script>
<style lang="less" scoped>
.app-main {
  padding-left: 10px;
}
</style>
