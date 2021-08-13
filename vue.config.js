/*
 * @Author: huanghuan02
 * @Date: 2021-07-24 01:41:00
 * @LastEditors: huanghuan02
 * @LastEditTime: 2021-07-31 00:37:34
 * @Description:
 */
const path = require('path');

module.exports = {
  outputDir: './build',
  // publicPath: './',
  // configureWebpack: {
  //   resolve: {
  //     alias: {
  //       views: '@/views'
  //     }
  //   }
  // }
  // configureWebpack: (config) => {
  //   config.resolve.alias = {
  //     '@': path.resolve(__dirname, 'src'),
  //     views: '@/views'
  //   }
  // },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', path.resolve(__dirname, 'src'))
      .set('views', '@/views');
    config.resolve.alias
      .set('@', path.resolve(__dirname, 'src'))
      .set('components', '@/components');
    config.resolve.alias
      .set('@', path.resolve(__dirname, 'src'))
      .set('assets', '@/assets');
  },
};
