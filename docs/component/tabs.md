# Tabs 标签栏

分隔内容上有关联但属于不同类别的数据集合。

:::tip
此组件是对 ElementUI Tabs 二次封装，微调。修改 `type=border-card` 样式，增加 `show-content` 属性，具体看本页最后面的表格。
:::

:::demo 当 `type="border-card"` 样式如下，`show-content` 可以控制 `Content` 区域的显示隐藏，当只要标签栏，不需要内容区域时，可以设置为 `false`。
```html
<template>
  <v-tabs
    v-model="editableTabsValue"
    @tab-click="handleClick"
    type="border-card"
    closable
    :show-content="false"
    @tab-remove="tabRemove"
  >
    <v-tab-pane
      v-for="(item) in editableTabs"
      :key="item.name"
      :label="item.title"
      :name="item.name"
    >
      {{item.content}}
    </v-tab-pane>
  </v-tabs>
</template>

<script>
export default {
  data() {
    return {
      editableTabsValue: '2',
      editableTabs: [
        {
          title: 'Tab 1',
          name: '1',
          content: 'Tab 1 content'
        }, 
        {
          title: 'Tab 2',
          name: '2',
          content: 'Tab 2 content'
        },
        {
          title: 'Tab 3',
          name: '3',
          content: 'Tab 3 content'
        },
        {
          title: 'Tab 4',
          name: '4',
          content: 'Tab 4 content'
        },
        {
          title: 'Tab 5',
          name: '5',
          content: 'Tab 5 content'
        },
      ],
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    tabRemove(targetName) {
      let tabs = this.editableTabs;
      let activeName = this.editableTabsValue;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }
      
      this.editableTabsValue = activeName;
      this.editableTabs = tabs.filter(tab => tab.name !== targetName);
    },
  }
}
</script>
```
:::

## Tabs Attributes

| 参数           | 说明                         | 类型             | 可选值            | 默认值         |
| ------------- |       -------------          | -------------   | -------------    | ------------- |
| show-content  | 控制 `Content` 部分的显示隐藏  | boolean          | -                | true          |

<style>
.page {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>