// 勾叉类图标共用：圆圈、方框外框
import { circle, rounded } from './geometry'

export const ring = () => circle(12, 12, 9)
export const square = radius => rounded([[3.5, 3.5], [20.5, 3.5], [20.5, 20.5], [3.5, 20.5]], radius)

// 带框字母、数字（letter-*-square / -circle、number-*-*）的框：按外缘固定、线宽变粗往里长（见 docs/design.md）
// 方框外缘 2.5–21.5（比圆圈小一圈：方形看着比同宽的圆大，但收到 3 又显得小一号），圆圈外缘半径 10（墨迹 2–22）
export function glyphSquare(radius, stroke) {
  const [a, b] = [2.5 + stroke / 2, 21.5 - stroke / 2]
  return rounded([[a, a], [b, a], [b, b], [a, b]], radius)
}
export const glyphRing = stroke => circle(12, 12, 10 - stroke / 2)

// 横向标签：尖头朝左、尖头里一个穿孔；方正部分里放字的区域是 10.5–18.5 × 7.5–16.5（离外框中心线 3）
// 旧版几何（中心线固定），现在只有分级图标（rating.js）在用；tag 系列已按新规则改用 tag.js 的 tagHorizontal
export const tagShape = radius => [rounded([[1.5, 12], [7.5, 4.5], [21.5, 4.5], [21.5, 19.5], [7.5, 19.5]], Math.min(radius, 2)), circle(6.5, 12, 1.25)]
