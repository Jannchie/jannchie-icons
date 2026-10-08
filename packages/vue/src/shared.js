// 两个入口（. 和 ./static）共用：全局默认配置的注入键、设备像素比、<svg> 的渲染
// 尺寸解析、默认配置合并、设备像素比订阅这些和框架无关的部分在 @jannchie/icons/runtime（React 包也用）
// 不在顶层碰 window：服务端渲染时整个模块都能安全导入
import { getDpr, mergeDefaults, rootAttrs, subscribeDpr } from '@jannchie/icons/runtime'
import { computed, h, inject, provide, shallowRef, toValue } from 'vue'

export const ICON_DEFAULTS = Symbol('jannchie-icons-defaults')

const EMPTY = Object.freeze({})
// 读当前组件树上的默认配置（没有就是空对象）
export const useIconDefaults = () => inject(ICON_DEFAULTS, null)

// 在组件里提供默认配置：子树里的 JIcon 都用它；嵌套时和外层的合并，colors 按角色合并
// defaults 可以是普通对象、ref、reactive 或 getter
export function provideIconDefaults(defaults) {
  const parent = inject(ICON_DEFAULTS, null)
  const merged = computed(() => mergeDefaults(parent?.value ?? EMPTY, toValue(defaults) ?? EMPTY))
  provide(ICON_DEFAULTS, merged)
  return merged
}

// 插件：app.use(JIconPlugin, { radius: 'sharp', weight: 'bold' })；整个应用的默认配置
export const JIconPlugin = {
  install(app, defaults = {}) {
    app.provide(ICON_DEFAULTS, computed(() => mergeDefaults(EMPTY, toValue(defaults) ?? EMPTY)))
  },
}

// 设备像素比：服务端和第一次渲染都按 1 算（和服务端输出一致，水合时不会对不上），
// 第一个图标挂载后才读真实值并订阅变化；值没变时 shallowRef 不会触发重绘
export const dpr = shallowRef(1)
let watching = false
export function watchDpr() {
  if (watching)
    return
  watching = true
  const read = () => {
    dpr.value = getDpr()
  }
  read()
  subscribeDpr(read)
}

// <svg>：根属性 + 可选的 <title> + 每条路径（动画路径带 <animate>）；shape 是 toPaths 形状的 { svg, paths, title? }
export function renderSvg(size, { svg, paths, title }) {
  const children = paths.map(({ animate, ...p }, i) => h('path', { key: i, ...p }, animate ? [h('animate', animate)] : undefined))
  if (title)
    children.unshift(h('title', title))
  return h('svg', { ...rootAttrs(size), ...svg }, children)
}
