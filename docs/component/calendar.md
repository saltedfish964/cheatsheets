# Calendar 日历

<ClientOnly>

适合开发交互类型日历。

## 基本

:::demo
```vue
<template>
  <v-calendar></v-calendar>
</template>
```
:::


## 自定义工具栏

`header` 在日历顶部定义按钮和标题；`footer` 在日历底部定义按钮和标题。

:::tip
`footer` 使用参考 `header`
:::

`header` 为 `false` 时，隐藏顶部工具栏。可以为对象提供左，中和右属性。这些属性包含带有逗号/空格分隔值的字符串。用逗号分隔的值将相邻显示。用空格分隔的值之间会显示一个很小的间隙。有一些默认按钮，可以自己尝试：`title`、`prev`、`next`、`prevYear`、`nextYear`、`today`。

自定义按钮只需要自己定义一个字符串，然后在 `customButtons` 对象内声明跟字符串一样的方法，如下。

:::demo 所有配置写在 `options` 属性内。
```vue
<template>
  <v-calendar :options="options"></v-calendar>
</template>

<script>
export default {
  data() {
    return {
      options: null,
    }
  },
  created() {
    this.options = {
      // 头部工具栏
      header: {
        left: 'title',
        center: '',
        right: 'custom1,custom2,custom3'
      },
      // 自定义按钮
      customButtons: {
        custom1: {
          text: '上个月',
          click: function() {
            alert('点击了上个月');
          }
        },
        custom2: {
          text: '今天',
          click: function() {
            alert('点击了今天');
          }
        },
        custom3: {
          text: '下个月',
          click: function() {
            alert('点击了下个月');
          }
        },
      },
    };
  },
}
</script>
```
:::

## 日期点击事件

点击某个日期触发的事件。

:::demo
```vue
<template>
  <v-calendar :options="options"></v-calendar>
</template>

<script>
export default {
  data() {
    return {
      options: null,
    }
  },
  created() {
    this.options = {
      // 点击日期事件
      dateClick: function(info) {
        // this.select(info);
        alert('点击了 ' + info.dateStr);
      },
    };
  },
}
</script>
```
:::

## 添加日程

可以在日历添加日程内容。

:::demo `eventRender` 可以自定义 `event` 的渲染。
```vue
<template>
  <v-calendar :options="options"></v-calendar>
</template>

<script>
export default {
  data() {
    return {
      options: null,
    }
  },
  created() {
    this.options = {
      events: [
        {
          title: '08:08 干饭',
          start: this.formatDate(new Date()),
        },
      ],
      eventRender: function(info) {
        let italicEl = document.createElement('div');
        italicEl.innerHTML = '06:06 当一条咸鱼';

        info.el.innerHTML = '';
        info.el.appendChild(italicEl);
      },
    };
  },
  methods: {
    formatDate(date) {
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      if (month < 10) {
        month = '0' + month;
      }
      let day = date.getDate();
      if (day < 10) {
        day = '0' + day;
      }
      return year + '-' + month + '-' + day;
    },
  },
}
</script>
```
:::
</ClientOnly>

<style>
.fc-toolbar h2 {
  font-size: 1.75em;
  margin: 0;
  padding-bottom: 0;
  border-bottom: 0;
}
.fc table{
  margin: 0;
  display: table;
  overflow: auto;
}
</style>