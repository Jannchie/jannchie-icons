// 显示器类图标共用：屏幕 + 立杆 + 底座
// 墨迹框左右 2–22、上下 3–21，以画布中线对称（和对话气泡系列同一个外框）：屏幕墨迹 2–22 × 3–17，底座墨迹下缘在 21；
// 线宽变粗时外缘不动、往里长（见 docs/design.md），h 是半个线宽。线宽 1 时屏幕四边和底座都落在 .5 上
// 立杆是一条居中的竖线，放在 x 12：居中优先，线宽 1 时它落在整数上、1 倍屏略虚，可以接受；
// 底座墨迹 8–16，以立杆为中心；立杆露出来的长度是 4 − 线宽（常规 2.5）
import { blocked, rectAroundTop } from './clearance'
import { fitBadge, roomBelow, roomOnRight } from './corner'
import { rounded } from './geometry'

const pole = 12

function frame(stroke) {
  const h = stroke / 2
  const [l, t, r, b] = [2 + h, 3 + h, 22 - h, 17 - h]
  return { h, l, t, r, b, foot: 21 - h, base: [8 + h, 16 - h] }
}

const screenOf = ({ l, t, r, b }) => [[l, t], [r, t], [r, b], [l, b]]
const standOf = ({ b, foot, base }) => [`M${pole} ${b}V${foot}`, `M${base[0]} ${foot}H${base[1]}`]

// 屏幕中心，放符号用：顶边和底边各随线宽收半个线宽，中点不变
export const center = [12, 10]
export const centerScale = 1
export const plain = (radius, stroke) => {
  const f = frame(stroke)
  return [rounded(screenOf(f), Math.min(radius, 2.5)), ...standOf(f)]
}

// 角标：符号墨迹的右缘贴到 22，下缘贴到屏幕底边的外缘 17；屏幕右边和底边在离符号 GAP 处断开
// 底座不用断：符号墨迹下缘固定在 17，底座墨迹上缘在 21 − 线宽（≥ 19），永远隔着 2 以上
// 立杆和底座始终在正中 x 12，立杆要接在一段完整的底边上：底边断口离立杆不到 MIN_SHOULDER 时（宽符号），
// 或者右边断口太靠近右上圆角时（高符号），把符号缩小一点再摆（corner.js 的 fitBadge）；
// 拼图这类缩放吸在网格上、缩不下去的宽符号允许缩到普通大小的 0.6 倍，否则底边够不到立杆、立杆会被端点吸附拽歪
const MIN_SHOULDER = 1
// 角标比普通角标大 GROW 倍，和文件夹一样（16px 下也认得出符号）；放不下时 fitBadge 再缩回去
const GROW = 1.3
export function withBadge(name, draw, tone, radius, stroke) {
  const f = frame(stroke)
  const { l, t, r, b } = f
  const roomRight = roomOnRight(stroke, r, t)
  const { k, at, shape } = fitBadge(name, draw, radius, stroke, { right: 22, bottom: 17 }, (s) => {
    const bottom = blocked(s, 'x', b, stroke)
    return roomRight(s) && (!bottom || bottom[0] >= pole + MIN_SHOULDER)
  }, GROW, 0.6)
  const right = blocked(shape, 'y', r, stroke)
  const bottom = blocked(shape, 'x', b, stroke)
  return [
    rounded([[bottom ? bottom[0] : r, b], [l, b], [l, t], [r, t], [r, right ? right[0] : b]], Math.min(radius, 2.5), false),
    ...standOf(f),
    ...tone(draw(at, k, radius)),
  ]
}

// 右上角标（-badge-top）：符号墨迹的右缘贴到 22，上缘贴到屏幕顶边的外缘 3；顶边、右边在离符号 GAP 处断开，立杆和底座不变
export function withBadgeTop(name, draw, tone, radius, stroke) {
  const f = frame(stroke)
  // 顶边至少伸到画布中线 12，免得屏幕只剩左上一个小角
  const { k, at, shape } = fitBadge(name, draw, radius, stroke, { right: 22, top: f.t - f.h }, (s) => {
    const c = blocked(s, 'x', f.t, stroke)
    return (!c || c[0] >= 12) && roomBelow(stroke, f.r, f.b)(s)
  }, GROW)
  return [
    rounded(rectAroundTop(shape, stroke, [f.l, f.t, f.r, f.b]), Math.min(radius, 2.5), false),
    ...standOf(f),
    ...tone(draw(at, k, radius)),
  ]
}

// 以下是旧版几何（屏幕 3.5–20.5 × 3.5–16.5、立杆 x 11.5），screen-record、screen-share 还在用；那两个按新规则重画时再换成 plain
export const screen = [[3.5, 3.5], [20.5, 3.5], [20.5, 16.5], [3.5, 16.5]]
export const stand = ['M11.5 16.5V20.5', 'M7.5 20.5H15.5']
