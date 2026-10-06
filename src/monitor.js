// 显示器类图标共用：屏幕 3–21 × 4–16.5 + 立杆 + 底座
import { blocked } from './clearance'
import { inset } from './folder'

const [l, t, r, b] = [3, 4, 21, 16.5]
const base = [8.5, 15.5, 20] // 底座左端、右端、高度

export const screen = [[l, t], [r, t], [r, b], [l, b]]
export const stand = [`M12 ${b}V${base[2]}`, `M${base[0]} ${base[2]}H${base[1]}`]

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
    stand: [`M12 ${b}V${base[2]}`, `M${base[0]} ${base[2]}H${foot ? Math.min(foot[0], base[1]) : base[1]}`],
  }
}
