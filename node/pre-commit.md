# pre-commit
>一个好用的git钩子

----
安装:  `npm install pre-commit -S`


在 `package.json` 添加
```bash
"pre-commit": [
  "lint"
]
```

`lint` 为`node scripts` 任务

设置以后 每次执行 `git commit` 的时候 就会自动检查是否通过
