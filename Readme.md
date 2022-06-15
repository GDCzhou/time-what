世界时钟项目

所用技术：
  vue3 typescript vite vueuse fuse.js(模糊查询) timezones.json(世界时钟数据) 
  css： unocss
  eslint配置: @antfu/eslint-config
  icon： @iconify-json/carbon

插件： 
  unplugin-auto-import :vue核心方法自动引入
  unplugin-vue-components： vue组件自动引入

编写总结： 
  数据与视图相互分离
  将数据单独抽离成一个ts文件
  类型定义抽离到types.ts文件中
  时间格式化方法
    new Intl.DateTimeFormat


功能待完善：
  切换动画
  其它
