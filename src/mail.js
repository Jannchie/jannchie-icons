// 邮件类图标共用：信封 + 30° 的 V 形封口
// 墨迹框左右 2–22、上下 3–21，和文件夹一样（宽高比也和旧版的信封一样），以画布中线对称；
// 线宽变粗时外缘不动、往里长（见 docs/design.md），h 是半个线宽；线宽 1 时四边中心线 2.5 / 21.5 / 3.5 / 20.5，都落在 .5 上
// 不取更扁的 20 × 16：右下角标（约 8.5 见方）贴到外框角上之后，顶会戳到 V 形封口，右边也只剩很短一截
import { blocked, place } from './clearance'
import { cornerCenter } from './corner'
import { rounded } from './geometry'
import { cornerScale, outlines } from './symbols'

export function frame(stroke) {
  const h = stroke / 2
  return { h, l: 2 + h, t: 3 + h, r: 22 - h, b: 21 - h }
}

export function envelope(stroke) {
  const { l, t, r, b } = frame(stroke)
  return [[l, t], [r, t], [r, b], [l, b]]
}

// 封口：两端在侧墙上 y FLAP_Y（离外框顶缘 3，线宽 1 时离顶边中心线 2.5，和旧版一样避开顶角的圆角弧；固定的中心线，不随线宽动），以 30° 收到中间
const FLAP_Y = 6
export function flap(stroke, radius) {
  const { l, r } = frame(stroke)
  const depth = (r - l) / 2 * Math.tan(Math.PI / 6)
  return rounded([[l, FLAP_Y], [12, FLAP_Y + depth], [r, FLAP_Y]], Math.min(radius, 1.5), false)
}

// 角标：符号墨迹的右缘贴到 22、下缘贴到 21；右边和底边在离符号 GAP 处断开，轮廓从底边的断口出发绕一圈到右边的断口
export function withBadge(name, draw, tone, radius, stroke) {
  const { l, t, r, b } = frame(stroke)
  const k = cornerScale[name]
  const at = cornerCenter(draw, k, radius, stroke, { right: 22, bottom: 21 })
  const shape = place(outlines[name], at, k)
  const right = blocked(shape, 'y', r, stroke)
  const bottom = blocked(shape, 'x', b, stroke)
  const outline = [[bottom ? bottom[0] : r, b], [l, b], [l, t], [r, t], [r, right ? right[0] : b]]
  return [rounded(outline, radius, false), flap(stroke, radius), ...tone(draw(at, k, radius))]
}
