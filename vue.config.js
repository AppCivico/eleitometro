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
    name: '#observa2018',
    themeColor: '#33cc66',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'no',
    workboxOptions: {
      include: [/\.html$/, /\.js$/, /\.css$/, /\.svg$/, /\.png$/, /\.jpg$/],
      runtimeCaching: [
        {
          urlPattern: new RegExp('^https://dapi-eleitometro.appcivico.com/'),
          handler: 'networkFirst',
        },
        {
          urlPattern: /\.svg$/,
          handler: 'networkFirst',
        },
      ],
    },
  },
};
