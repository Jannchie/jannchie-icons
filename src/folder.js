// 文件夹类图标共用：45° 斜边的标签页 + 本体
// 墨迹框左右 2–22、上下 3–21，以画布中线对称；线宽变粗时外缘不动、往里长（见 docs/design.md），h 是半个线宽
// 标签页右端在 x 9，45° 斜边往下 3 接到本体顶边（线宽 1 时本体顶边落在 6.5 上，横线清晰）
import { blocked } from './clearance'
import { fitBadge, roomOnRight } from './corner'
import { rounded } from './geometry'
import { inset } from './inset'

function frame(stroke) {
  const h = stroke / 2
  const [l, t, r, b] = [2 + h, 3 + h, 22 - h, 21 - h]
  const tabEnd = 9
  const body = t + 3
  return { h, l, t, r, b, tabEnd, tabSlope: tabEnd + 3, body }
}

// 完整的文件夹轮廓
export function folder(stroke) {
  const { l, t, r, b, tabEnd, tabSlope, body } = frame(stroke)
  return [[l, t], [tabEnd, t], [tabSlope, body], [r, body], [r, b], [l, b]]
}

// 本体中心，放居中符号用：本体顶边和底边都随线宽各收半个线宽，中点不变（13.5）
export const center = [12, 13.5]

// 角标比普通角标大 GROW 倍：本体右下是一整块空白，放大后 16px 下也认得出符号
const GROW = 1.3

// 角标：符号墨迹的右缘、下缘贴到画布留白的边 (22, 22)（比本体底边的外缘 21 低 1，角标压在外框角上，不显得缩在文件夹里）；右边和底边在离符号 GAP 处断开，轮廓从底边的断口出发绕一圈到右边的断口
export function withBadge(name, draw, tone, radius, stroke) {
  const { l, t, r, b, tabEnd, tabSlope, body } = frame(stroke)
  const { k, at, shape } = fitBadge(name, draw, radius, stroke, { right: 22, bottom: 22 }, roomOnRight(stroke, r, body), GROW)
  const right = blocked(shape, 'y', r, stroke)
  const bottom = blocked(shape, 'x', b, stroke)
  const outline = [[bottom ? bottom[0] : r, b], [l, b], [l, t], [tabEnd, t], [tabSlope, body], [r, body], [r, right ? right[0] : b]]
  return [rounded(outline, radius, false), ...tone(draw(at, k, radius))]
}

// 右上角标（-badge-top）：符号墨迹的右缘贴到 22，上缘和标签页顶边的外缘（3）齐平，骑在本体的右上角上；
// 本体顶边和右边在离符号 GAP 处断开，轮廓从右边的断口出发，经右下、左下、标签页，回到顶边的断口
export function withBadgeTop(name, draw, tone, radius, stroke) {
  const { h, l, t, r, b, tabEnd, tabSlope, body } = frame(stroke)
  // 顶边的断口不越过标签页斜边下端（再往左就把标签页也吃掉了）
  const { k, at, shape } = fitBadge(name, draw, radius, stroke, { right: 22, top: t - h }, (s) => {
    const top = blocked(s, 'x', body, stroke)
    return !top || top[0] >= tabSlope
  }, GROW)
  const right = blocked(shape, 'y', r, stroke)
  const top = blocked(shape, 'x', body, stroke)
  // 大符号的断口会一直延伸到标签页斜边下端附近：剩下的顶边不到 1.5 就不画，轮廓停在斜边下端
  const topEnd = top ? top[0] : r
  const outline = [[r, right ? right[1] : body], [r, b], [l, b], [l, t], [tabEnd, t], [tabSlope, body], ...(topEnd - tabSlope >= 1.5 ? [[topEnd, body]] : [])]
  return [rounded(outline, radius, false), ...tone(draw(at, k, radius))]
}

// 以下是旧版几何（中心线固定在 .5 上），文件、对话框、盾牌等系列还在用它们的角标位置；那些系列按新规则重画时再换掉
export { inset }
export const badge = [20.5 - inset, 19.5 - inset]
