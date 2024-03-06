## git 

### 1,git长名称解决--Filename too long

```
git config --global core.longpaths true
```

### 2, git warning: LF will be replaced by CRLF

```
git config --global core.autocrlf true
```

### 3,git分支命名main

```
找到user下的git-config文件添加
[init]
	defaultBranch = main
```



