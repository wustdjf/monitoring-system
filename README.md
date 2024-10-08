<div align="center"><img height="120px" src="https://github.com/wustdjf/monitoring-system/blob/master/src/assets/logo/logo.svg"/></div>

<h1 align="center">温湿度监控系统</h1>

## 简介

`温湿度监控系统`是一个监控环境温度和湿度并且可视化显示的系统，使用了`React17`、`vite2`、`react-router-dom v6`、`less` 等主流技术开发。

## 特性

- 技术栈：React17/React-router-dom v6/vite2
- Javascript 版本
- 可自定义主题
- 国际化方案
- Mock 数据方案
- 暗夜模式
- Arco Design UI 库

## 文档

## 准备

- `Node`: 版本建议 >= 12.0.0 [下载链接](https://nodejs.org/zh-cn/download/)
- `Git`: [版本管理工具](https://www.git-scm.com/download)
- `Visual Studio Code`: [最新版本](https://code.visualstudio.com/Download/)
  - [Eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)- 脚本代码检查
  - [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) - 代码格式化
  - [Stylelin](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint) - css 格式化

## 安装使用

- 获取代码

```sh
git clone https://github.com/wustdjf/monitoring-system.git
```

- 安装依赖

```sh
pnpm install
```

- 运行

```sh
pnpm run dev
```

- 打包

```sh
pnpm run build
```

- 本地预览

```sh
pnpm run preview
```

- 如果不想使用 pnpm，请删除 `package.json` 文件中 `preinstall` 脚本后再进行安装

```json
{
  "scripts": {
    "preinstall": "npx only-allow pnpm" // 使用其他包管理工具（npm、yarn、cnpm等）请删除此命令
  }
}
```

## 浏览器支持

本地开发推荐使用`Chrome 80+` 浏览器

支持现代浏览器, 不支持 IE
