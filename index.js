/**
 * 自定义webpack插件，当用户打开浏览器控制台，会自动跳转到debugger断处，用于防止非法人员调试前端代码
 * 给所有js代码添加 setInterval(() => {debugger}, seconds)
 */
const { ConcatSource } = require('webpack-sources')

class JavascriptAddDebuggerWebpackPlugin {
  /**
   * @param options.min 最小间隔秒数
   * @param options.max 最大间隔秒数
   */
  constructor (options = { min: 1, max: 20 }) {
    this.min = options.min && options.min > 0 ? options.min : 1
    this.max = options.max && options.max <= 600 ? options.max : 600
  }

  apply (compiler) {
    compiler.hooks.afterCompile.tapAsync({
      name: 'JavascriptAddDebuggerWebpackPlugin',
    }, (compilation, callback) => {
      let assetNames = Object.keys(compilation.assets)
      for (const name of assetNames) {
        if (name.endsWith('.js')) { // 跳过非js文件
          let seconds = Math.ceil(Math.random() * (this.max - this.min)) +
            this.min
          let appendContent = `setInterval(() => {debugger}, ${seconds} * 1000);`
          compilation.updateAsset(
            name,
            old => new ConcatSource(old, '\n', appendContent),
          )
        }
      }
      callback()
    })
  }
}

module.exports = JavascriptAddDebuggerWebpackPlugin
