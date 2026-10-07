// 显示器类图标共用：屏幕 3.5–20.5 × 3.5–16.5 + 立杆 + 底座
// 立杆只有一条居中的竖线，为了清晰偏左半格到 x = 11.5（与库里其他图标同向），底座 7.5–15.5 以立杆为中心
import { blocked } from './clearance'
import { inset } from './folder'

const [l, t, r, b] = [3.5, 3.5, 20.5, 16.5]
const pole = 11.5 // 立杆
const base = [7.5, 15.5, 20.5] // 底座左端、右端、高度

export const screen = [[l, t], [r, t], [r, b], [l, b]]
export const stand = [`M${pole} ${b}V${base[2]}`, `M${base[0]} ${base[2]}H${base[1]}`]

// 屏幕中心，放符号用
export const center = [12, (t + b) / 2]

// 角标：从屏幕右下角往内收 inset；屏幕右边、底边和底座都在离符号 GAP 处断开
export const badge = [r - inset, b - inset]
export function screenAround(shape, stroke) {
  const right = blocked(shape, 'y', r, stroke)
  const bottom = blocked(shape, 'x', b, stroke)
  const foot = blocked(shape, 'x', base[2], stroke)
  return {
    outline: [
      [bottom ? bottom[0] : r, b],
      [l, b],
      [l, t],
      [r, t],
      [r, right ? right[0] : b],
    ],
    stand: [`M${pole} ${b}V${base[2]}`, `M${base[0]} ${base[2]}H${foot ? Math.min(foot[0], base[1]) : base[1]}`],
  }
}
