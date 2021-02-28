# RelativeTime 相对时间 

## 基础用法

设置一个时间戳或 Date，可自动转为相对于当前的时间。

:::demo
```vue
<template>
  <div>
    <v-time :time="time1" />
    <br>
    <v-time :time="time2" />
  </div>
</template>
<script>
export default {
  data () {
    return {
      time1: (new Date()).getTime() - 60 * 3 * 1000,
      time2: (new Date()).getTime() - 86400 * 3 * 1000
    }
  }
}
</script>
```
:::

## 自动更新间隔

设置自动更新间隔，默认为 60 秒。

:::demo
```vue
<template>
  <v-time :time="time" :interval="1" />
</template>
<script>
export default {
  data () {
    return {
      time: new Date(),
    }
  }
}
</script>
```
:::

## 不同类型

可以根据情况，设置不同的显示类型。

:::demo
```vue
<template>
  <div>
    <v-time :time="time" />
    <br>
    <v-time :time="time" type="date" />
    <br>
    <v-time :time="time" type="datetime" />
  </div>
</template>
<script>
export default {
  data () {
    return {
      time: (new Date()).getTime() - 86400 * 3 * 1000
    }
  }
}
</script>
```
:::