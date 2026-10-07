// 文件夹类图标共用：45° 斜边的标签页 + 本体
// 横竖边都落在 .5 上（线宽 1 时天生清晰）：左右 3.5 / 20.5，上下 4.5 / 19.5，本体顶边 6.5
import { blocked } from './clearance'
import { rounded } from './geometry'

const [l, t, tabEnd, tabSlope, body, r, b] = [3.5, 4.5, 9, 11, 6.5, 20.5, 19.5]
export const folder = [[l, t], [tabEnd, t], [tabSlope, body], [r, body], [r, b], [l, b]]

// 本体中心，放符号用
export const center = [12, 13]

// 角标变体：本体与普通文件夹完全一致，符号中心从右下角往内收 inset
export const inset = 2.5
export const badge = [r - inset, b - inset]

// 右上角标变体（-badge-top）：符号中心从本体右上角（本体顶边 6.5，不是标签页）往内收 inset；
// 本体顶边和右边在离符号 GAP 处断开，轮廓从右边的断口出发，经右下、左下、标签页，回到顶边的断口
export const badgeTop = [r - inset, body + inset]
export function folderAroundTop(shape, stroke) {
  const right = blocked(shape, 'y', r, stroke)
  const top = blocked(shape, 'x', body, stroke)
  return [
    [r, right ? right[1] : body],
    [r, b],
    [l, b],
    [l, t],
    [tabEnd, t],
    [tabSlope, body],
    [top ? top[0] : r, body],
  ]
}

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
export const aroundTop = (shape, radius, stroke) => [rounded(folderAroundTop(shape, stroke), radius, false)]
