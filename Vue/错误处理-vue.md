### 1. 关于eslint使用各种报错处理（关闭验证）
在bulid/webpack.base.conf.js里面有配置如下：

```
module: {
rules: [

...(config.dev.useEslint ? [createLintingRule()] : []),
```
点进config.dev.useEslint，发现在config/index.js里配置
useEslint: true, // 改为false即可。



