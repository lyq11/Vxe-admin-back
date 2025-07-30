import { UserConfig, ConfigEnv, loadEnv } from 'vite'
import path from 'path'
import XEUtils from 'xe-utils'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { createHtmlPlugin } from 'vite-plugin-html'
import externalGlobals from 'rollup-plugin-external-globals'
import zipPack from 'vite-plugin-zip-pack'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  return {
    base: '/admin-template/',
    plugins: [
      vue(),
      vueJsx(),
      vueDevTools(),
      createHtmlPlugin({
        inject: {
          data: {
            VITE_APP_BUILD_TIME: XEUtils.toDateString(new Date(), 'yyyy-MM-dd HH:mm:ss'),
            ...env
          }
        }
      }),
      zipPack({
        outDir: './'
      })
    ],
    resolve: {
      alias: {
        '@': path.join(__dirname, './src')
      },
      extensions: ['.js', '.vue', '.json', '.ts', '.tsx']
    },
    server: {
      port: 8084,
      proxy: {
        '/api': {
          target: 'http://localhost:8000',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    build: {
      rollupOptions: {
        // 不打包依赖
        external: ['echarts'],
        plugins: [
          // 不打包依赖映射的对象
          externalGlobals({
            echarts: 'echarts'
          })
        ]
      }
    }
  }
}
