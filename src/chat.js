// 对话气泡类图标共用：圆角主体 3.5–20.5 × 4.5–16.5，左下角一个尾巴（只画外侧的 45° 斜边，轮廓不闭合）
import { blocked } from './clearance'
import { inset } from './folder'
import { rounded } from './geometry'

const [l, t, r, b] = [3.5, 4.5, 20.5, 16.5]
const tail = [10, 6.5, 20] // 斜边在底边上的起点 x、尾尖 x、尾尖 y

// 轮廓不闭合：从尾巴左侧的底边起，绕一圈回到尾巴，沿斜边到尾尖为止（尾巴左边那条竖边不画）
export const bubble = () => [[tail[1], b], [l, b], [l, t], [r, t], [r, b], [tail[0], b], [tail[1], tail[2]]]

// 主体中心，放符号用
export const center = [12, (t + b) / 2]

// 角标：从主体右下角往内收 inset，右边和底边在离符号 GAP 处断开，所以轮廓分成两段
export const badge = [r - inset, b - inset]
export function bubbleAround(shape, stroke) {
  const right = blocked(shape, 'y', r, stroke)
  const bottom = blocked(shape, 'x', b, stroke)
  return [
    [[tail[1], b], [l, b], [l, t], [r, t], [r, right ? right[0] : b]],
    [[bottom ? bottom[0] : r, b], [tail[0], b], [tail[1], tail[2]]],
  ]
}

// 右上角标变体（-badge-top）：符号中心从主体右上角往内收 inset；顶边、右边在离符号 GAP 处断开，
// 轮廓分两段：尾巴左侧的底边 → 左下 → 左上 → 顶边断口；右边断口 → 右下 → 底边 → 尾巴斜边到尾尖
export const badgeTop = [r - inset, t + inset]
export function aroundTop(shape, radius, stroke) {
  const right = blocked(shape, 'y', r, stroke)
  const top = blocked(shape, 'x', t, stroke)
  return [
    rounded([[tail[1], b], [l, b], [l, t], [top ? top[0] : r, t]], radius, false),
    rounded([[r, right ? right[1] : t], [r, b], [tail[0], b], [tail[1], tail[2]]], radius, false),
  ]
}
