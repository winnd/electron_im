<template>
    <h1>{{ msg }}</h1>
    <div>asdf</div>
    <img :src="img1" alt="">
</template>

<script>
import img1 from 'src/renderer/assert/img/1.png'
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'HelloWord',
    components: { img1 },
    props: {
        msg: String,
    },
    setup () {
        console.log('setUp')
    },
})
</script>
<style lang="scss">
@import "../style/style";
h1 {
    background: orange;
}
</style>
