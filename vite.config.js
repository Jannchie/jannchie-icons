import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  // 部署在自定义域名 icons.jannchie.com 的根路径
  base: '/',
  plugins: [vue()],
})
