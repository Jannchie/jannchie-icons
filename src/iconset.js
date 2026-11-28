// 全部图标（Vite 环境：预览站、vitest）：src/icons 下每个文件一个；组装和排序见 icon-list.js，Node 脚本用 scripts/icons.mjs
import { iconsFrom } from './icon-list'

const modules = import.meta.glob('./icons/*.js', { eager: true })

export const { icons, byName } = iconsFrom(Object.entries(modules).map(([path, mod]) => [path.split('/').pop().slice(0, -3), mod]))
