<template>
    <div>进入页面
        <HelloWorld msg="aaa" />
    </div>
</template>

<script>
import HelloWorld from 'src/renderer/components/HelloWorld.vue'

export default {
    name: 'App',
    components: {
        HelloWorld,
    },
}
</script>

