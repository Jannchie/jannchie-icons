// 公文包类图标共用：箱体 3–21 × 7–20 + 提手；基础款有一道腰线，带符号的变体去掉腰线给符号让位
import { blocked, rectAround } from './clearance'
import { rounded } from './geometry'

const [l, t, r, b] = [3, 7, 21, 20]
export const body = [[l, t], [r, t], [r, b], [l, b]]
export const handle = 'M9 7V5A1.5 1.5 0 0 1 10.5 3.5H13.5A1.5 1.5 0 0 1 15 5V7'
export const waist = 'M3 12.5H21'
export const plain = radius => [rounded(body, Math.min(radius, 2.5)), handle]

// 居中符号放在箱体中间
export const center = [12, 13.5]
export const centerScale = 1

// 角标：符号中心从右下角往内收 2.5，右边和底边在离符号 GAP 处断开；腰线碰到符号时也截断
export const badge = [r - 2.5, b - 2.5]
export const briefcaseAround = (shape, stroke) => rectAround(shape, stroke, [l, t, r, b])
export function aroundBase(shape, radius, stroke) {
  const w = blocked(shape, 'x', 12.5, stroke)
  return [rounded(briefcaseAround(shape, stroke), Math.min(radius, 2.5), false), handle, `M3 12.5H${w ? w[0] : 21}`]
}
