<template>
  <h1>{{ msg }}</h1>
  <div>asdf</div>
  <img :src="img1" alt="">
  <textarea v-model="text" name="" id="" cols="30" rows="10"></textarea>
</template>

<script>
import img1 from '../assert/img/1.png'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name      : 'HelloWord',
  components: {img1},
  props     : {
    msg: String,
  },
  setup() {
    const text = ref('')

    return {
      img1,
      text,
    }
  },
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
