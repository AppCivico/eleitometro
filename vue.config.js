const SvgStore = require('webpack-svgstore-plugin');
const fs = require('fs');

module.exports = {
  lintOnSave: false,
  configureWebpack: {
    plugins: [
      new SvgStore({
        prefix: '',
      }),
    ],
  },
  css: {
    loaderOptions: {
      sass: {
        data: fs.readFileSync('src/styles/_variables.scss', 'utf-8'),
      },
    },
  },
};
