// 邮件类图标共用：信封 + 30° 的 V 形封口
// 墨迹框左右 2–22、上下 3–21，和文件夹一样（宽高比也和旧版的信封一样），以画布中线对称；
// 线宽变粗时外缘不动、往里长（见 docs/design.md），h 是半个线宽；线宽 1 时四边中心线 2.5 / 21.5 / 3.5 / 20.5，都落在 .5 上
// 不取更扁的 20 × 16：右下角标（约 8.5 见方）贴到外框角上之后，顶会戳到 V 形封口，右边也只剩很短一截
import { blocked, GAP } from './clearance'
import { asBadge, fitBadge, roomOnRight } from './corner'
import { rounded } from './geometry'

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

// 角标比普通角标大 GROW 倍，和文件夹一样；放大后顶会靠近封口的右半边，离封口不到 GAP（按垂直距离算）时缩小一点再摆
const GROW = 1.3
function clearOfFlap(stroke) {
  const { l, r } = frame(stroke)
  const depth = (r - l) / 2 * Math.tan(Math.PI / 6)
  const [ax, ay, bx, by] = [12, FLAP_Y + depth, r, FLAP_Y]
  const [len, need] = [Math.hypot(bx - ax, by - ay), GAP + stroke]
  // 点到封口右半边（线段）的距离
  const dist = ([x, y]) => {
    const u = Math.max(0, Math.min(1, ((x - ax) * (bx - ax) + (y - ay) * (by - ay)) / (len * len)))
    return Math.hypot(x - ax - u * (bx - ax), y - ay - u * (by - ay))
  }
  return (shape) => {
    if (shape.circle)
      return dist(shape.c) >= shape.circle + need
    const [x0, y0, x1] = shape.box
    // 盒子的上边：封口在它上方，最近的点是上边的左端或右端、或者封口最低点正下方
    return [[x0, y0], [x1, y0], [Math.max(x0, Math.min(x1, ax)), y0]].every(q => dist(q) >= need)
  }
}

// 角标：符号墨迹的右缘、下缘贴到画布留白的边 (22, 22)（比信封底缘 21 低 1，和文件夹一样压在外框角上）；右边和底边在离符号 GAP 处断开，轮廓从底边的断口出发绕一圈到右边的断口
export function withBadge(name, draw, tone, radius, stroke) {
  const { l, t, r, b } = frame(stroke)
  const [roomRight, flapClear] = [roomOnRight(stroke, r, t), clearOfFlap(stroke)]
  const { k, at, shape } = fitBadge(name, draw, radius, stroke, { right: 22, bottom: 22 }, s => roomRight(s) && flapClear(s), GROW)
  const right = blocked(shape, 'y', r, stroke)
  const bottom = blocked(shape, 'x', b, stroke)
  const outline = [[bottom ? bottom[0] : r, b], [l, b], [l, t], [r, t], [r, right ? right[0] : b]]
  return [rounded(outline, radius, false), flap(stroke, radius), ...asBadge(tone(draw(at, k, radius)), name)]
}
