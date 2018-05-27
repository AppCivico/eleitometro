# Eleitômetro

> A PWA powered by Vue.js

Requires NPM version > 5

## Customization

Scripts: `src/config.js` 
Style: `src/styles/_variables`

## Build Setup

``` bash
# install dependencies
$ npm install

# serve with hot reload at localhost:8081 and open cypress test suite
$ npm run serve

# build for production with minification
$ npm run build

# test code
$ npm test

# lint code
$ npm run lint
```

## SVGs

Just put them in the `src/assets/svg` folder and webpack will take care of it.

### Usage

``` html
  <svg class="svg-icon">
    <use xlink:href="#title"></use>
  </svg>
```

title being the literal name of the svg file

## TODO

1 - Fix line chart (Waiting API fix);
2 - Fix Panorama analyze page (Waiting API fix);
3 - Desktop layout;
4 - Improve animations;
    4.1 - Start moving summary on touchstart;
    4.2 - LaunchScreen leave animation;
5 - Lazy loading
