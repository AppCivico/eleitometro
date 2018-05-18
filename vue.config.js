const SvgStore = require('webpack-svgstore-plugin');

module.exports = {
  lintOnSave: false,
  configureWebpack: {
    plugins: [
      new SvgStore({
        prefix: '',
      }),
    ],
  },
};
