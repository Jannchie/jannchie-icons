// 两个入口共用的纯函数：尺寸解析、属性名转换。不导入 react（./static 要能在 React Server Components 里用，那里没有 createContext）

// size：数字或 '20'、'20px' 这样的纯像素值才能做像素对齐；'1em' 之类的 CSS 长度原样输出，不对齐
const PX = /^\s*(\d+(?:\.\d+)?)(?:px)?\s*$/
export function pixelSize(size) {
  if (typeof size === 'number')
    return size
  const m = typeof size === 'string' && PX.exec(size)
  return m ? Number(m[1]) : 0
}

// SVG 属性名换成 React 的写法：stroke-width → strokeWidth；aria-*、data-* 保持原样
export function reactAttrs(o) {
  const out = {}
  for (const k in o) {
    if (o[k] != null)
      out[k.startsWith('aria-') || k.startsWith('data-') ? k : k.replace(/-([a-z])/g, (_, c) => c.toUpperCase())] = o[k]
  }
  return out
}
