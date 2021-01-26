<template>
  <div class="home">
    hello limi-frontend club
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
@Options({
  components: {}
})
export default class Home extends Vue {
}
</script>
<style lang="less" scoped>
  .home {
    height: 100vh;
    background-color: aqua;
  }
</style>
