# Vxe 后台管理系统模板

一个基于 [Vxe UI](https://vxeui.com) 轻量级、极致流畅的系统模板

## 版本

基于 Vxe v4.x 对应 vue3.x 版本

## 项目说明

本项目是基于 [Vxe Admin Template](https://github.com/x-extends/vxe-admin-template) 进行定制开发的后台管理系统。

### 原项目链接
- **GitHub**: https://github.com/x-extends/vxe-admin-template
- **Gitee**: https://gitee.com/x-extends/vxe-admin-template

### 后端项目
- **后端Git仓库**: [后端项目链接待添加]

## 主要修改内容

- 添加了Git自动化批处理脚本
- 优化了项目结构和配置
- 完善了开发文档

## 浏览器支持

![Edge](https://raw.github.com/alrra/browser-logos/master/src/edge/edge_48x48.png) | ![Chrome](https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/src/safari/safari_48x48.png)
--- | --- | --- | --- | --- |
80+ ✔ | 80+ ✔ | 90+ ✔ | 75+ ✔ | 10+ ✔ |

## 在线预览

👉 [点击查看 v4.x](https://vxeui.com/admin-template/)  
👉 [点击查看 v3.x](https://vxeui.com/admin-template-v3/)  

## 目录说明

* api 后台接口
* assets 静态资源（图片、视频等）
* components 全局组件
* i18n 国际化语言
* router 路由目录
  * config 路由配置文件（可按照业务进行模块拆分）
  * index 路由及权限控制
* store 全局数据仓库
  * app 应用通用数据
  * user 用户相关数据
* plugins 插件目录
  * vxe 组件库插件
    * form 表单渲染器
    * table 表格渲染器
    * config 全局默认参数
    * format 全局格式化
  * ...其他插件
* style 样式目录
  * theme 主题文件
* util 通用函数
* views
  * layout 页面布局
  * error 错误相关页面
  * login 登录注册
  * home 首页
  * systemManage 系统管理
  * ...业务模块

## 快速开始

### 方式一：使用批处理脚本（推荐）

1. **初始化Git仓库和配置**
   ```bash
   # 运行初始化脚本
   init-git.bat
   ```

2. **日常代码推送**
   ```bash
   # 运行推送脚本
   push.bat
   ```

### 方式二：手动操作

#### 克隆代码
```bash
git clone https://gitee.com/x-extends/vxe-admin-template.git
```
或
```bash
git clone https://github.com/x-extends/vxe-admin-template.git
```

#### 切换目录
```bash
cd vxe-admin-template
```

### 设置镜像源(可忽略)
```
npm config set registry https://registry.npmmirror.com
```

### 更新依赖
```
npm run update
```

### 运行项目
```
npm run serve
```

## index.html

首页 html 里面包含百度统计的脚本链接，记得正式使用时要移除掉。

## 修改 Logo 图片

* public/favicon.ico
* src/assets/logo.png

## 修改项目路径

vite.config.ts 修改为

```javascript
// ...
base: '/',
// ...
```

## 环境变量

.env 通用环境变量配置文件  
.env.production 正式环境变量配置文件

## 打包正式环境生成 dist 目录
```bash
npm run build
```

## 打包正式环境生成 zip 文件
```bash
npm run build:zip
```

## 批处理脚本说明

### init-git.bat
Git仓库初始化和远程仓库配置脚本，功能包括：
- 自动初始化Git仓库
- 配置Git用户信息
- 配置远程仓库（支持HTTPS/SSH/自定义URL）
- 自动创建.gitignore文件
- 可选的首次提交

### push.bat
快速代码推送脚本，功能包括：
- 自动添加所有修改的文件
- 使用时间戳生成提交信息
- 自动推送到GitHub

## 开发工具

- **前端框架**: Vue 3.x
- **UI组件库**: Vxe UI 4.x
- **构建工具**: Vite
- **包管理器**: npm

## Contributors

Thank you to everyone who contributed to this project.

[![vxe-admin-template](https://contrib.rocks/image?repo=x-extends/vxe-admin-template)](https://github.com/x-extends/vxe-admin-template/graphs/contributors)

## 致谢

感谢 [Vxe UI](https://vxeui.com) 团队提供的优秀组件库和模板。

## License

[MIT](LICENSE) © 2019-present, Xu Liangzhan

---

**注意**: 本项目基于开源项目进行定制开发，请遵守原项目的开源协议。
