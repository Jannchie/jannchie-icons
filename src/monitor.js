// 显示器类图标共用：屏幕 3.5–20.5 × 3.5–16.5 + 立杆 + 底座
// 立杆只有一条居中的竖线，为了清晰偏左半格到 x = 11.5（与库里其他图标同向），底座 7.5–15.5 以立杆为中心
import { blocked, rectAroundTop } from './clearance'
import { inset } from './folder'
import { rounded } from './geometry'

const [l, t, r, b] = [3.5, 3.5, 20.5, 16.5]
const pole = 11.5 // 立杆
const base = [7.5, 15.5, 20.5] // 底座左端、右端、高度

export const screen = [[l, t], [r, t], [r, b], [l, b]]
export const stand = [`M${pole} ${b}V${base[2]}`, `M${base[0]} ${base[2]}H${base[1]}`]

// 屏幕中心，放符号用；居中符号（monitor-<符号>）和公文包、书等系列同一套写法：plain + center + centerScale
export const center = [12, (t + b) / 2]
export const centerScale = 1
export const plain = radius => [rounded(screen, Math.min(radius, 2.5)), ...stand]

// 角标：从屏幕右下角往内收 inset；屏幕右边、底边和底座都在离符号 GAP 处断开
export const badge = [r - inset, b - inset]
export function screenAround(shape, stroke) {
  const right = blocked(shape, 'y', r, stroke)
  const bottom = blocked(shape, 'x', b, stroke)
  const foot = blocked(shape, 'x', base[2], stroke)
  const footEnd = foot ? Math.min(foot[0], base[1]) : base[1]
  // 底边的断口落到立杆附近（不到立杆右边 2.5）时，立杆并进屏幕轮廓：从底座沿立杆上来、在立杆顶硬拐到底边往左——
  // 否则立杆顶和底边断口是两个挨着的线头，尖角模式下方头互相冒出来（立杆顶这个拐角不随全局圆角）
  if (bottom && bottom[0] < pole + 2.5) {
    return {
      outline: [[pole, base[2]], [pole, b, 0], [l, b], [l, t], [r, t], [r, right ? right[0] : b]],
      stand: [`M${base[0]} ${base[2]}H${footEnd}`],
    }
  }
  return {
    outline: [
      [bottom ? bottom[0] : r, b],
      [l, b],
      [l, t],
      [r, t],
      [r, right ? right[0] : b],
    ],
    stand: [`M${pole} ${b}V${base[2]}`, `M${base[0]} ${base[2]}H${footEnd}`],
  }
}

// 右上角标变体（-badge-top）：符号中心从屏幕右上角往内收 inset；顶边、右边在离符号 GAP 处断开，立杆和底座不变
export const badgeTop = [r - inset, t + inset]
export function aroundTop(shape, radius, stroke) {
  return [rounded(rectAroundTop(shape, stroke, [l, t, r, b]), radius, false), ...stand]
}
