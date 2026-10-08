import { defineConfig } from 'vitest/config'

// 单独的 vitest 配置：不加载 vite.config.js 里预览站的插件（vue、virtual:icon-times）
// 渲染冒烟按圆角分成几个测试文件（tests/render-*.test.js），vitest 按文件并行，机器核多时总时长约等于最慢的一个分片
export default defineConfig({
  test: {
    include: ['tests/**/*.test.js'],
    // 一个文件要渲染上千个图标，负载高的机器上可能很慢
    testTimeout: 600_000,
    hookTimeout: 600_000,
  },
})
