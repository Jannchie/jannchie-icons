// @jannchie/icons-react：通用的图标组件 <JIcon icon={IconHeart} />，按 radius、weight 现场重绘，按显示尺寸 × 设备像素比做像素对齐
import { toPaths } from '@jannchie/icons'
import { getDpr, mergeDefaults, pixelSize, subscribeDpr } from '@jannchie/icons/runtime'
import { createContext, createElement as h, forwardRef, useContext, useMemo, useSyncExternalStore } from 'react'
import { renderSvg } from './attrs.js'

// 默认配置：IconProvider 提供，JIcon 读取
export const IconContext = createContext(null)

// 设备像素比：服务端快照固定为 1，水合时 React 先用服务端快照渲染、再按真实值重渲染，输出不会对不上
// 有组件订阅时才开始监听（见 @jannchie/icons/runtime 的 subscribeDpr）；React 比较快照，值没变时不会重渲染
const getServerDpr = () => 1

// 子树里所有 JIcon 的默认配置；嵌套时和外层合并，colors 按角色合并
export function IconProvider({ children, size, radius, weight, duo, theme, colors, hinting }) {
  const parent = useContext(IconContext)
  const value = useMemo(() => {
    const own = Object.fromEntries(Object.entries({ size, radius, weight, duo, theme, colors, hinting }).filter(([, v]) => v !== undefined))
    return mergeDefaults(parent ?? {}, own)
  }, [parent, size, radius, weight, duo, theme, colors, hinting])
  return h(IconContext.Provider, { value }, children)
}

export const JIcon = forwardRef(function JIcon({ icon, size, radius, weight, duo, theme, colors, title, hinting, children, ...rest }, ref) {
  const d = useContext(IconContext) ?? {}
  const dpr = useSyncExternalStore(subscribeDpr, getDpr, getServerDpr)
  const s = size ?? d.size ?? 24
  const css = pixelSize(s)
  const px = (hinting ?? d.hinting ?? true) && css ? Math.round(css * dpr) : 0
  const r = radius ?? d.radius
  const w = weight ?? d.weight
  const du = duo ?? d.duo
  const th = theme ?? d.theme
  const c = d.colors || colors ? { ...d.colors, ...colors } : undefined
  const ckey = c && JSON.stringify(c)
  // eslint-disable-next-line react-hooks/exhaustive-deps -- colors 按内容比较，调用方每次渲染传新对象也不会重算
  const shape = useMemo(() => toPaths(icon, { radius: r, weight: w, duo: du, theme: th, colors: c, title, px }), [icon, r, w, du, th, ckey, title, px])
  return renderSvg(s, shape, { ...rest, ref }, children)
})

export default JIcon
