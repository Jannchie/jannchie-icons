// 全部图标：src/icons 下每个文件一个，按名字排序；预览页和示例页共用
// 默认导出是静态造型 ({ radius, stroke, weight }) => 路径数组；动画图标另外导出 animation（见 render.js 的 animatedPaths）
const modules = import.meta.glob('./icons/*.js', { eager: true })

export const icons = Object.entries(modules)
  .map(([path, mod]) => ({ name: path.split('/').pop().slice(0, -3), draw: mod.default, animation: mod.animation }))
  .sort((a, b) => a.name.localeCompare(b.name))

export const byName = new Map(icons.map(i => [i.name, i]))
