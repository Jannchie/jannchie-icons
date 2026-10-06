// 文件类图标共用：纸张 5–19 × 2.5–20.5，右上 45° 折角；折角两处转角固定小圆角
import { blocked } from './clearance'
import { inset } from './folder'
import { crisp } from './geometry'

const [l, t, r, b] = [5, 2.5, 19, 20.5]
const fold = 5
const corner = radius => [[r - fold, t, crisp(radius)], [r, t + fold, crisp(radius)]]

export const page = radius => [[l, t], ...corner(radius), [r, b], [l, b]]
// 翻折线：从折角的上端竖直落下，再水平到右边
export const flap = `M${r - fold} ${t}V${t + fold}H${r}`

// 纸张中心（折角以下），放符号用
export const center = [12, 13]

// 角标：从纸张右下角往内收 inset，右边和底边在离符号 GAP 处断开
export const badge = [r - inset, b - inset]
export function pageAround(shape, stroke, radius) {
  const right = blocked(shape, 'y', r, stroke)
  const bottom = blocked(shape, 'x', b, stroke)
  return [
    [bottom ? bottom[0] : r, b],
    [l, b],
    [l, t],
    ...corner(radius),
    [r, right ? right[0] : b],
  ]
}

// 格式标签：只画纸张上半部分（侧边在 y = 12 收住），下方 15–21 写三个字母
export const pageTop = radius => [[l, 12], [l, t], ...corner(radius), [r, 12]]
export const labelBox = { left: l, right: r, top: 15, bottom: 21 }
