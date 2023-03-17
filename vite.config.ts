import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { resolve } from "path";
import { viteMockServe } from 'vite-plugin-mock'
import { svgBuilder } from './src/plugins/Builder.js';


// https://vitejs.dev/config/
export default () => defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    viteMockServe({
      supportTs: true,
      logger: false,
      mockPath: "./mock/",
      //  这样可以控制关闭mock的时候不让mock打包到最终代码内
      // injectCode: `import { setupProdMockServer } from './mockProdServer';setupProdMockServer();`,
    }),
    svgBuilder('./src/icons/svg/')
  ],
  //静态资源服务的文件夹
  publicDir: "public",
  base: './',
  //控制台输出的级别 info 、warn、error、silent
  logLevel: "info",
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "#": resolve(__dirname, "types"),
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
  },

  // 依赖优化选项
  optimizeDeps: {
    force: true
  },

  // 开发服务器选项
  server: {
    host: "localhost",
    https: false,//是否启用 http 2
    cors: true,//为开发服务器配置 CORS , 默认启用并允许任何源
    open: false,//服务启动时自动在浏览器中打开应用
    port: 9000,
    strictPort: false, //设为true时端口被占用则直接退出，不会尝试下一个可用端口
    hmr: true,//禁用或配置 HMR 连接
    // 反向代理配置
    // proxy: {
    //   '/api': {
    //     target: "https://xxxx.com/",
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, '')
    //   }
    // }
  },
})
