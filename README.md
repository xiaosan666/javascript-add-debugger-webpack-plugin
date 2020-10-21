# javascript-add-debugger-webpack-plugin
webpack插件，给.js文件添加 setInterval(() => {debugger}, seconds); 以阻止用户调试js代码

## 安装:
```shell script
npm install --save-dev javascript-add-debugger-webpack-plugin
```

## 配置:
* `min`：setInterval间隔最小时间，单位秒，默认1，最小1  
* `max`：setInterval间隔最大时间，单位秒，默认20，最大600  
> { min: 1, max: 20 } 表生成`setInterval(() => {debugger}, seconds)`中seconds的取值范围为1~20  
> { min: 2, max: 2 } 表生成`setInterval(() => {debugger}, seconds)`中seconds的取值为2    

## Example:
``` javascript
const JavascriptAddDebuggerWebpackPlugin = require('javascript-add-debugger-webpack-plugin')
module.exports = {
  plugins: [
    new JavascriptAddDebuggerWebpackPlugin()
  ]
};
```

## Vue Example:
``` javascript
const JavascriptAddDebuggerWebpackPlugin = require('javascript-add-debugger-webpack-plugin')
module.exports = {
  devServer: {},
  configureWebpack: {
    plugins:
      process.env.NODE_ENV !== 'production'
        ? []
        : [new JavascriptAddDebuggerWebpackPlugin()],
  },
}
```

## License
MIT (http://www.opensource.org/licenses/mit-license.php)


