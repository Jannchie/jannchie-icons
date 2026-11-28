// 图标集合的唯一组装方式：模块 → 图标对象 { name, draw, animation?, fill? }，按名字的 UTF-16 码点排序（不随系统语言变）
// 两种运行环境各有一个入口，都只做「收集 [名字, 模块]」这一步：
// - Vite（预览站、vitest）：src/iconset.js，import.meta.glob
// - Node（构建、审计等脚本）：scripts/icons.mjs，读目录后逐个 import
// 纯函数、不依赖 Vite：Node 里可以直接 import

export const compareNames = (a, b) => (a < b ? -1 : a > b ? 1 : 0)

// 默认导出是静态造型 ({ radius, stroke, weight }) => 路径数组；动画图标另外导出 animation（见 render.js 的 animatedPaths）；
// 有实心版的图标另外导出 fill（见 fill.js）。没有的字段不写，和发布包里的图标对象同形
export function iconOf(name, mod) {
  return { name, draw: mod.default, ...(mod.animation && { animation: mod.animation }), ...(mod.fill && { fill: mod.fill }) }
}

// entries：[名字, 模块] 的列表 → { icons（按名字排序）, byName }
export function iconsFrom(entries) {
  const icons = entries.map(([name, mod]) => iconOf(name, mod)).sort((a, b) => compareNames(a.name, b.name))
  return { icons, byName: new Map(icons.map(i => [i.name, i])) }
}
