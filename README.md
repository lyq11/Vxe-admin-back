# Vxe 后台管理系统模板

基于 [Vxe UI](https://vxeui.com) 的后台管理系统

## 项目说明

基于 [Vxe Admin Template](https://github.com/x-extends/vxe-admin-template) 定制开发

### 原项目
- **GitHub**: https://github.com/x-extends/vxe-admin-template
- **Gitee**: https://gitee.com/x-extends/vxe-admin-template

### 后端项目
- **后端Git仓库**: [后端项目链接待添加]

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

### 使用批处理脚本
```bash
# 初始化Git仓库
init-git.bat

# 推送代码
push.bat
```

### 手动操作
```bash
git clone https://github.com/x-extends/vxe-admin-template.git
cd vxe-admin-template
```

```bash
npm config set registry https://registry.npmmirror.com
npm run update
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

## 构建部署

```bash
npm run build        # 生成dist目录
npm run build:zip    # 生成zip文件
```

## 批处理脚本

- `init-git.bat` - Git仓库初始化
- `push.bat` - 快速代码推送

## 技术栈

- Vue 3.x + Vxe UI 4.x + Vite

## Contributors

Thank you to everyone who contributed to this project.

[![vxe-admin-template](https://contrib.rocks/image?repo=x-extends/vxe-admin-template)](https://github.com/x-extends/vxe-admin-template/graphs/contributors)

## License

[MIT](LICENSE) © 2019-present, Xu Liangzhan
