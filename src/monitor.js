// 显示器类图标共用：屏幕 + 立杆 + 底座
// 墨迹框左右 2–22、上下 3–21，以画布中线对称（和对话气泡系列同一个外框）：屏幕墨迹 2–22 × 3–17，底座墨迹下缘在 21；
// 线宽变粗时外缘不动、往里长（见 docs/design.md），h 是半个线宽。线宽 1 时屏幕四边和底座都落在 .5 上
// 立杆是一条居中的竖线，放在 x 12：居中优先，线宽 1 时它落在整数上、1 倍屏略虚，可以接受；
// 底座墨迹 8–16，以立杆为中心；立杆露出来的长度是 4 − 线宽（常规 2.5）
import { fillDraw, fillSymbol, ledgeAbove, ledgeBelow, leftOf } from './badge-room'
import { blocked, rectAroundTop } from './clearance'
import { asBadge, fitBadge, roomBelow, roomOnRight } from './corner'
import { rounded } from './geometry'
import { badgeFill, solid } from './solid'

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
export const centerScale = 1.15
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
export function withBadge(name, draw, tone, radius, stroke, { fill = false } = {}) {
  const f = frame(stroke)
  const { h, l, t, r, b } = f
  const roomRight = roomOnRight(stroke, r, t)
  const fit = (n, d, more = () => true) => fitBadge(n, d, radius, stroke, { right: 22, bottom: 17 }, (s) => {
    const bottom = blocked(s, 'x', b, stroke)
    return roomRight(s) && (!bottom || bottom[0] >= pole + MIN_SHOULDER) && more(s)
  }, GROW, 0.6)
  // 实心版：主体在角标四周让出一圈缝、朝右下整片让掉，角标画回去（见 badge-room.js）。
  // 让掉的部分从角标最左的墨迹一直拖到底边，所以角标左缘的让位要离开立杆（再留 0.5，不贴着立杆），上面也要留一段够厚的屏幕
  if (fill) {
    const { k, at } = fit(...fillSymbol(name, draw), s => leftOf(stroke, pole + h + 0.5)(s) && ledgeAbove(stroke, 3)(s))
    return badgeFill(fillParts(radius, stroke), asBadge(tone(fillDraw(name, draw)(at, k, radius)), name), 'bottom')
  }
  const { k, at, shape } = fit(name, draw)
  const right = blocked(shape, 'y', r, stroke)
  const bottom = blocked(shape, 'x', b, stroke)
  return [
    rounded([[bottom ? bottom[0] : r, b], [l, b], [l, t], [r, t], [r, right ? right[0] : b]], Math.min(radius, 2.5), false),
    ...standOf(f),
    ...asBadge(tone(draw(at, k, radius)), name),
  ]
}

// 右上角标（-badge-top）：符号墨迹的右缘贴到 22，上缘贴到屏幕顶边的外缘 3；顶边、右边在离符号 GAP 处断开，立杆和底座不变
export function withBadgeTop(name, draw, tone, radius, stroke, { fill = false } = {}) {
  const f = frame(stroke)
  // 顶边至少伸到画布中线 12，免得屏幕只剩左上一个小角
  const fit = (n, d, more = () => true) => fitBadge(n, d, radius, stroke, { right: 22, top: f.t - f.h }, (s) => {
    const c = blocked(s, 'x', f.t, stroke)
    return (!c || c[0] >= 12) && roomBelow(stroke, f.r, f.b)(s) && more(s)
  }, GROW)
  // 实心版：主体在角标四周让出一圈缝、朝右上整片让掉，角标画回去；角标下面到屏幕下缘 17 要留一段够厚的屏幕（见 badge-room.js）
  if (fill) {
    const { k, at } = fit(...fillSymbol(name, draw), ledgeBelow(stroke, 17))
    return badgeFill(fillParts(radius, stroke), asBadge(tone(fillDraw(name, draw)(at, k, radius)), name), 'top')
  }
  const { k, at, shape } = fit(name, draw)
  return [
    rounded(rectAroundTop(shape, stroke, [f.l, f.t, f.r, f.b]), Math.min(radius, 2.5), false),
    ...standOf(f),
    ...asBadge(tone(draw(at, k, radius)), name),
  ]
}

// 以下是旧版几何（屏幕 3.5–20.5 × 3.5–16.5、立杆 x 11.5），screen-record、screen-share 还在用；那两个按新规则重画时再换成 plain
export const screen = [[3.5, 3.5], [20.5, 3.5], [20.5, 16.5], [3.5, 16.5]]
export const stand = ['M11.5 16.5V20.5', 'M7.5 20.5H15.5']

// 实心版（见 solid.js 的 plainFill / badgeFill / centerFill）：屏幕一块，立杆和底座照旧是线
export function fillParts(radius, stroke) {
  const f = frame(stroke)
  return { body: [solid(rounded(screenOf(f), Math.min(radius, 2.5)))], lines: standOf(f) }
}
