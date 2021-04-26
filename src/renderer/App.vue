<template>
  <div>进入页面
    <HelloWorld :msg="'aaa'" />
  </div>
</template>

<script>
import HelloWorld from 'renderer/components/HelloWorld.vue'

export default {
  name      : 'App',
  components: {
    HelloWorld,
  },
  setup() {
    console.log('aaa')
    return {}
  },
}
</script>

