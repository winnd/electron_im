<template>
  <h1>{{ msgData }}</h1>
  <div>asdf</div>
  <img :src="img1" alt="">
  <textarea v-model="text" />
</template>

<script lang="ts">
import img1 from 'renderer/assert/img/1.png'
import { defineComponent, ref } from 'vue'
import { test1 } from 'renderer/components/test'

export default defineComponent({
  name      : 'HelloWord',
  components: { img1 },
  props     : { msg: { type: String, default: '' } },
  setup(props) {
    const text = ref('')

    test1({ arg1: '11' })
    return {
      img1,
      text,
      msgData: props.msg
    }
  }
})
</script>
<style lang="scss" scoped>
@import "../style/style.css";

h1 {
  background: orange;

  div {
    background: yellow;
  }
}
</style>
