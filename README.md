# 1. 前言



考虑到开源库[static-nav](https://github.com/TopVitamin/static-nav)是使用HTML+CSS+JQ简单实现的，代码里面网址都是直接写死的，这样处理的话，维护时会异常繁琐，而且不利于后期拓展，比如定位某个导航的功能，还有就是通过云端存储网址，前端页面请求动态渲染等等。

所以就打算使用vue next + vite + element-plus 重构项目，结合部门实际应用场景，考虑到了通用和项目的问题，还有就是快速定位的问题，后期也可以将navList.ts里的数据存储在服务器，通过部门的后台管理系统配置一下，就可以了。不用前端每次更新，都需要打包部署。

因为最近百度捣鼓了一个开发者搜索，所以也加了一下。

# 2. 功能列表

1. 左边菜单栏快速定位，右边静态导航页动态渲染
2. 通过navList.ts配置，无需改动前端页面
3. 支持百度开发者搜索



# 3. 待实现需求

1. 右边静态页面滚动时，和左侧菜单栏联动
2. 搜索引擎加上图标显示



# 4. 项目预览



![](https://gitee.com/dstweihao/dst-static-nav/raw/master/src/assets/images/nav_preview.jpeg)

