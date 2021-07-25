# table 合并列相同数据

``` js
function mergeTable(arr) {
  for (let field in arr[0]) {
    let k = 0;
    let i = 0;
    while (k < arr.length) {
      arr[k][field + 'Rowspan'] = 1;
      for (i = k + 1; i <= arr.length - 1; i++) {
        if (arr[k][field] === arr[i][field] && arr[k][field] !== '') {
          arr[k][field + 'Rowspan']++;
        } else {
          break;
        }
      }
      k = i;
    }
  }
  return arr;
}
```

## 效果演示

:::demo
```vue
<template>
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>日期</th>
        <th>访客姓名</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in tableData" :key="index">
        <td v-if="item.idRowspan" :rowspan="item.idRowspan">{{ item.id }}</td>
        <td v-if="item.dateRowspan" :rowspan="item.dateRowspan">{{ item.date }}</td>
        <td v-if="item.ageRowspan" :rowspan="item.ageRowspan">{{ item.age }}</td>
      </tr>
    </tbody>
  </table>
</template>
<script>
export default {
  data () {
    return {
      list: [
        {
          id: 1,
          date: '2021-07-25',
          age: 90,
        },
        {
          id: 2,
          date: '2021-07-25',
          age: 91,
        },
        {
          id: 3,
          date: '2021-07-24',
          age: 100,
        },
        {
          id: 4,
          date: '2021-07-23',
          age: 85,
        },
        {
          id: 5,
          date: '2021-07-23',
          age: 90,
        },
        {
          id: 6,
          date: '2021-07-22',
          age: 90,
        },
      ],
    }
  },
  computed: {
    tableData() {
      return this.mergeTable(this.list);
    },
  },
  methods: {
    mergeTable(arr) {
      for (let field in arr[0]) {
        let k = 0;
        let i = 0;
        while (k < arr.length) {
          arr[k][field + 'Rowspan'] = 1;
          for (i = k + 1; i <= arr.length - 1; i++) {
            if (arr[k][field] === arr[i][field] && arr[k][field] !== '') {
              arr[k][field + 'Rowspan']++;
            } else {
              break;
            }
          }
          k = i;
        }
      }
      return arr;
    },
  },
}
</script>
```
:::