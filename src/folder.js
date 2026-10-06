// 文件夹类图标共用：45° 斜边的标签页 + 本体
import { blocked } from './clearance'

const [l, t, tabEnd, tabSlope, body, r, b] = [3, 5, 9, 11, 7, 21, 19]
export const folder = [[l, t], [tabEnd, t], [tabSlope, body], [r, body], [r, b], [l, b]]

// 本体中心，放符号用
export const center = [12, 13]

// 角标变体：本体与普通文件夹完全一致，符号中心从右下角往内收 inset
export const inset = 2.5
export const badge = [r - inset, b - inset]

// 右边和底边在离符号 GAP 处断开
export function folderAround(shape, stroke) {
  const right = blocked(shape, 'y', r, stroke)
  const bottom = blocked(shape, 'x', b, stroke)
  return [
    [bottom ? bottom[0] : r, b],
    [l, b],
    [l, t],
    [tabEnd, t],
    [tabSlope, body],
    [r, body],
    [r, right ? right[0] : b],
  ]
}
