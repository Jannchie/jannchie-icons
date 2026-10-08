import { execFileSync } from 'node:child_process'
import { readdirSync, statSync } from 'node:fs'
import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import { defineConfig, normalizePath } from 'vite'

// 每个图标最后修改的时间（毫秒），给预览页「最近修改」排序用：virtual:icon-times → { 名字: 时间 }
// 开发时读文件的修改时间；构建时文件都是刚检出的，改用 git 里每个文件最后一次提交的时间（CI 需要完整历史，见 deploy.yml 的 fetch-depth）
// 开发时只在启动时扫一遍目录，之后改动、新增、删除某个图标只更新它自己的那一条，通过自定义 HMR 事件推给页面——
// 不让这个模块失效（失效会连带整个 App.vue 热更新，每改一个图标都重算全部分类、重建网格）
const ICONS = normalizePath(resolve('src/icons'))
const ID = 'virtual:icon-times'
// 虚拟模块的内部 id 按 Vite 约定以空字符开头
const RESOLVED = `${String.fromCharCode(0)}${ID}`
const EVENT = 'icon-times'
const iconName = file => (normalizePath(file).startsWith(`${ICONS}/`) && file.endsWith('.js') ? normalizePath(file).slice(ICONS.length + 1, -3) : null)
function fileTimes() {
  return Object.fromEntries(readdirSync(ICONS).filter(f => f.endsWith('.js')).map(f => [f.slice(0, -3), Math.round(statSync(resolve(ICONS, f)).mtimeMs)]))
}
function gitTimes() {
  const times = fileTimes()
  let at = 0
  const seen = new Set()
  try {
    const log = execFileSync('git', ['log', '--format=%ct', '--name-only', '--', 'src/icons'], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 })
    for (const line of log.split('\n')) {
      if (/^\d+$/.test(line))
        at = Number(line) * 1000
      else if (line.startsWith('src/icons/') && line.endsWith('.js')) {
        const name = line.slice(10, -3)
        // git log 从新到旧，同一个文件第一次出现就是最后一次修改
        if (!seen.has(name) && name in times) {
          seen.add(name)
          times[name] = at
        }
      }
    }
  }
  catch {}
  return times
}
function iconTimes() {
  let dev = false
  let times
  return {
    name: 'icon-times',
    configResolved: (config) => { dev = config.command === 'serve' },
    resolveId: id => (id === ID ? RESOLVED : undefined),
    load: (id) => {
      if (id !== RESOLVED)
        return
      times ??= dev ? fileTimes() : gitTimes()
      return `export default ${JSON.stringify(times)}`
    },
    configureServer(server) {
      const push = (file, t) => {
        const name = iconName(file)
        if (!name || !times)
          return
        if (t == null)
          delete times[name]
        else
          times[name] = t
        server.ws.send({ type: 'custom', event: EVENT, data: { name, t } })
      }
      server.watcher.on('add', file => push(file, Date.now()))
      server.watcher.on('change', file => push(file, Date.now()))
      server.watcher.on('unlink', file => push(file, null))
    },
  }
}

export default defineConfig({
  // 部署在自定义域名 icons.jannchie.com 的根路径
  base: '/',
  plugins: [vue(), iconTimes()],
  server: {
    // 构建产物、快照、草稿不需要监听：一次 build:packages 会在 packages/ 下生成、删除几万个文件，
    // 全部进入监听和 HMR 插件链，长时间运行的开发服务器会因此占满内存
    watch: { ignored: ['**/packages/**', '**/dist/**', '**/tests/__snapshots__/**', '**/scripts/*.baseline.json', '**/src/_drafts/**'] },
  },
})
