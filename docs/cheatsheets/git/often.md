# Git 常用命令

将当前文件夹所有文件添加到索引：

``` sh
git add .
```

添加代码日志：

``` sh
git commit -m '<代码日志>'
```

从另一个存储库或本地分支合并代码：

``` sh
git pull
```

::: tip
当需要填写完整的命令（`git pull <远程仓库名字> <分支名称>`）时，使用 `git push -u <远程仓库名字> <分支名称>` 进行绑定之后，可直接使用 `git pull` 合并代码。
:::

将新代码提交到仓库：

``` sh
git push
```

查看远程仓库列表：

``` sh
git remote
```

添加远程仓库地址：

``` sh
git remote add <远程仓库自定义名称> <远程仓库地址>
```

删除远程仓库地址：

```sh
git remote remove <远程仓库自定义名称>
```

查看某个远程仓库地址：

``` sh
git remote get-url <远程仓库自定义名称>
```

设置某个远程仓库的地址：

``` sh
git remote set-url <远程仓库自定义名称> <远程仓库地址>
```