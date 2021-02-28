# Color 颜色选择器

选择颜色。

## 基础

:::demo
```vue
<template>
  <div>
    <v-color v-model="color"></v-color>
    <div class="value">Value：{{ color }}</div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      color: {
        hex: '#194d33',
        hex8: '#194D33A8',
        hsl: { h: 150, s: 0.5, l: 0.2, a: 1 },
        hsv: { h: 150, s: 0.66, v: 0.30, a: 1 },
        rgba: { r: 25, g: 77, b: 51, a: 1 },
        a: 1
      },
      // color: '#194d33',
      // color: '#194D33A8',
      // color: { h: 150, s: 0.66, v: 0.30 },
      // color: { r: 255, g: 0, b: 0 },
    }
  }
}
</script>
<style>
.value {
  margin-top: 20px;
}
</style>
```
:::

