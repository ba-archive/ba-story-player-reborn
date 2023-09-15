const { defineConfig } = require("@vue/cli-service");
const ESLintPlugin = require("eslint-webpack-plugin");
const UnoCSS = require("@unocss/webpack").default;
const path = require("path");

/** @type {import('unplugin-auto-import/webpack')["default"]} */
const AutoImport = require("unplugin-auto-import/webpack");

module.exports = defineConfig({
  transpileDependencies: [],
  css: {
    loaderOptions: {
      css: {
        url: {
          // HACK: 针对webpack5自带的新css-loader的蜜汁解析
          filter: (url, resourcePath) => {
            // resourcePath - path to css file
            // Don't handle absolute urls
            return !url.startsWith("/");
          },
        },
      },
    },
  },
  chainWebpack(config) {
    config.resolve.alias
      .set("@lib", path.resolve(__dirname, "lib/"));

    config
      .plugin("html")
      .tap((args) => {
        args[0].title = process.env.VUE_APP_APPNAME;
        return args;
      });

    config.module.rules.delete("eslint");
    // 如果不要lint，可以注释掉
    config
      .plugin("eslint")
      .use(ESLintPlugin, [{
        extensions: [".js", ".jsx", ".vue", ".ts", ".tsx"],
        // 仅在源码改变后才检查
        lintDirtyModulesOnly: process.env.NODE_ENV == "development",
      }]);

    config
      .plugin("uno")
      .use(UnoCSS, []);

    // 如果不需要开发时ts类型检查，可以取消注释
    // config.plugins.delete('fork-ts-checker');
  },
  configureWebpack: {
    optimization: {
      realContentHash: true,
    },
    plugins: [
      AutoImport({
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/, /\.vue\?vue/, // .vue
        ],
        dts: "./auto-imports.d.ts",
        imports: [
          "vue",
          "vue-router",
        ],
        vueTemplate: false,
        eslintrc: {
          enabled: true,
          filepath: "./.eslintrc-auto-import.json",
          globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
        },
      }),
    ],
  },
  devServer: {
    https: false,
    client: {
      overlay: {
        errors: true,
        warnings: false,
        runtimeErrors: false, //骂声一片的傻逼东西
      },
    },
    proxy: {
      "/api": {
        target: process.env.VUE_APP_API_URL,
        ws: true,
        pathRewrite: {
          "^/api": "/",
        },
      },
    },
  },
});
