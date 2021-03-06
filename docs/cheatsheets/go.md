## 安装

> 下载地址：[https://golang.google.cn/dl/](https://golang.google.cn/dl/)

## 国内镜像配置

::: tip
Go1.13 及更高版本（推荐）
:::

PowerShell 执行如下命令：

配置代理

``` sh
$env:GOPROXY = "https://goproxy.cn"
```

开启 go module 模式

``` sh
$env:GO111MODULE = "on"
```

安装 goimports 校验是否配置成功

``` sh
go get -v golang.org/x/tools/cmd/goimports
```

输出如下内容表示安装成功

``` sh
PS C:\Users\username> go get -v golang.org/x/tools/cmd/goimports
go: downloading golang.org/x/tools v0.1.0
go: found golang.org/x/tools/cmd/goimports in golang.org/x/tools v0.1.0
go: downloading golang.org/x/sys v0.0.0-20210119212857-b64e53b001e4
go: downloading golang.org/x/mod v0.3.0
go: downloading golang.org/x/xerrors v0.0.0-20200804184101-5ec99f83aff1
golang.org/x/mod/semver
golang.org/x/xerrors/internal
golang.org/x/tools/internal/event/label
golang.org/x/xerrors
golang.org/x/sys/execabs
golang.org/x/tools/internal/fastwalk
golang.org/x/tools/go/ast/astutil
golang.org/x/tools/internal/event/keys
golang.org/x/mod/module
golang.org/x/tools/internal/gopathwalk
golang.org/x/tools/internal/event/core
golang.org/x/tools/internal/event
golang.org/x/tools/internal/gocommand
golang.org/x/tools/internal/imports
golang.org/x/tools/cmd/goimports
PS C:\Users\username>
```

## VsCode 开发环境配置

1、创建项目文件夹

2、初始化 `go.mod` 文件

``` sh
go mod init <module 名称>
```

## 命令行运行项目

``` sh
go run <文件名称>
```

## 变量定义

1、使用 `var` 声明

``` go
var variable int
```

2、使用 `var` 声明并赋初始值

``` go
var variable string = "hello"
```

3、使用 `var` 声明不规定类型

``` go
var variable = true
```

4、简洁声明

::: tip
不能用来声明全局变量
:::

``` go
variable := 6.66
```

5、一次声明多个变量

``` go
var (
  variableA = false
  variableB = "变量名"
  variableC = 888
)

// or
var stringA, stringB string = "字符串 A", "字符串 B"

// or
booleanA, intA := true, 888
```

## 常量定义

1、使用 `const` 加变量类型声明

``` go
const globalVariable boolean = false
```

2、使用 `const` 不加变量类型声明

``` go
const globalVariable = true
```

3、一次声明多个常量

``` go
const (
  globalVariableA = false
  globalVariableB = "变量名"
  globalVariableC = 888
  globalVariableD, globalVariableE = true, "false"
)
```

## 枚举定义

使用 `const` 加 `iota` 表达式声明

:::tip
`iota` 从 `0` 开始自增长
:::

``` go
const (
  javascript = iota
  golang
)

// 上方声明的枚举值为：golang = 0，javascript = 1
```

`iota` 表达式可参与运算，如：

``` go
const (
  golang = iota + 1
  javascript
)

// 上方声明的枚举值为：golang = 1，javascript = 2
```

## 条件语句

使用 `if`、`else if`、`else` 定义条件语句

``` go
if a > 100 {
  // more
} else {
  // more
}
// or
if b < 5 {
  // more
} else if b < 3 {
  // more
} else {
  // more
}
```

使用 `switch` 定义条件语句

``` go
var a = 20
var b = 10
var result int
var op string = "+"

switch op {
case "+":
  result = a + b
case "-":
  result = a - b
case "*":
  result = a * b
case "/":
  result = a / b
default:
  painc("无法判断此值：", op)
}
```

**或者**

``` go
var score = 20
var result = ""

switch {
case score < 60:
  result = "F"
case score < 80:
  result = "C"
case score < 90:
  result = "B"
case score <= 100:
  result = "A"
default:
  painc("请输入正确的成绩：", op)
}
```



::: tip
`switch` 会自动 `break`，除非使用 `fallthrough`；`painc` 是一个内建函数，可以中断原有的控制流程；`switch` 后面可以没有表达式。
:::