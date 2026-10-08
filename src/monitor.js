// 显示器类图标共用：屏幕 + 立杆 + 底座
// 墨迹框左右 2–22、上下 3–21，以画布中线对称（和对话气泡系列同一个外框）：屏幕墨迹 2–22 × 3–17，底座墨迹下缘在 21；
// 线宽变粗时外缘不动、往里长（见 docs/design.md），h 是半个线宽。线宽 1 时屏幕四边和底座都落在 .5 上
// 立杆是一条居中的竖线，放在 x 12：居中优先，线宽 1 时它落在整数上、1 倍屏略虚，可以接受；
// 底座墨迹 8–16，以立杆为中心；立杆露出来的长度是 4 − 线宽（常规 2.5）
import { blocked, place, rectAroundTop } from './clearance'
import { cornerCenter } from './corner'
import { rounded } from './geometry'
import { cornerScale, outlines } from './symbols'

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
// 底边的断口落到立杆附近（不到立杆右边 2.5）时，立杆并进屏幕轮廓：从底座沿立杆上来、在立杆顶硬拐到底边往左——
// 否则立杆顶和底边断口是两个挨着的线头，尖角模式下方头互相冒出来（立杆顶这个拐角不随全局圆角）。
// 这时立杆和底座整体往左挪半格到 11.5（例外，不居中）：符号墨迹左缘离 x 12 只有一个线宽多一点，
// 立杆留在 12 的话仪表、图片、云在粗字重下几乎贴上立杆顶（可见空隙 < 0.1）；挪半格后空隙回到 0.5 左右
export function withBadge(name, draw, tone, radius, stroke) {
  const { h, l, t, r, b, foot } = frame(stroke)
  const k = cornerScale[name]
  const at = cornerCenter(draw, k, radius, stroke, { right: 22, bottom: 17 })
  const shape = place(outlines[name], at, k)
  const right = blocked(shape, 'y', r, stroke)
  const bottom = blocked(shape, 'x', b, stroke)
  const symbol = tone(draw(at, k, radius))
  const rr = Math.min(radius, 2.5)
  if (bottom && bottom[0] < pole + 2.5) {
    const p = pole - 0.5
    return [
      rounded([[p, foot], [p, b, 0], [l, b], [l, t], [r, t], [r, right ? right[0] : b]], rr, false),
      `M${p - 4 + h} ${foot}H${p + 4 - h}`,
      ...symbol,
    ]
  }
  return [
    rounded([[bottom ? bottom[0] : r, b], [l, b], [l, t], [r, t], [r, right ? right[0] : b]], rr, false),
    ...standOf(frame(stroke)),
    ...symbol,
  ]
}

// 右上角标（-badge-top）：符号墨迹的右缘贴到 22，上缘贴到屏幕顶边的外缘 3；顶边、右边在离符号 GAP 处断开，立杆和底座不变
export function withBadgeTop(name, draw, tone, radius, stroke) {
  const f = frame(stroke)
  const k = cornerScale[name]
  const at = cornerCenter(draw, k, radius, stroke, { right: 22, top: f.t - f.h })
  const shape = place(outlines[name], at, k)
  return [
    rounded(rectAroundTop(shape, stroke, [f.l, f.t, f.r, f.b]), Math.min(radius, 2.5), false),
    ...standOf(f),
    ...tone(draw(at, k, radius)),
  ]
}

// 以下是旧版几何（屏幕 3.5–20.5 × 3.5–16.5、立杆 x 11.5），screen-record、screen-share 还在用；那两个按新规则重画时再换成 plain
export const screen = [[3.5, 3.5], [20.5, 3.5], [20.5, 16.5], [3.5, 16.5]]
export const stand = ['M11.5 16.5V20.5', 'M7.5 20.5H15.5']
