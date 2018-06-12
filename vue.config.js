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
  pwa: {
    name: 'Eleitômetro',
    themeColor: '#33cc66',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    workboxOptions: {
      runtimeCaching: [
        {
          urlPattern: /dapi/,
          handler: 'networkFirst',
        },
      ],
    },
  },
};
