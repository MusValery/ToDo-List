const path = require("path");

module.exports = {
  lintOnSave: false,
  runtimeCompiler: true,
  configureWebpack: {
    resolve: {
      alias: {
        components: path.resolve(__dirname, "src/components/"),
        actions: path.resolve(__dirname, "src/store/actions"),
        utils: path.resolve(__dirname, "src/utils")
      }
    }
  },
  pluginOptions: {
    svgSprite: {
      /*
       * The directory containing your SVG files.
       */
      dir: "src/assets/icons",
      /*
       * The reqex that will be used for the Webpack rule.
       */
      test: /\.(svg)(\?.*)?$/,
      /*
       * @see https://github.com/kisenka/svg-sprite-loader#configuration
       */
      loaderOptions: {
        extract: true,
        spriteFilename: "img/icons.[hash:8].svg" // or 'img/icons.svg' if filenameHashing == false
      },
      /*
       * @see https://github.com/kisenka/svg-sprite-loader#configuration
       */
      pluginOptions: {
        plainSprite: true
      }
    }
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: '@import "@/assets/mixins/_media.sass"'
      }
    }
  }
};
