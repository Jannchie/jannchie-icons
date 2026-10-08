// 标签类图标共用：斜放的标签（tag / tags）和横放的标签（tag-horizontal、tag-<字母/数字>）
// 外形按墨迹的外缘定（尖角下的外缘）：每条边往里收半个线宽 h 得到中心线，线宽变粗时外缘不动、往里长（见 docs/design.md）
// 斜边、尖角在大圆角下会被削掉一截，所以尖角处的外缘留得比直边更靠外，让常规圆角下的墨迹框以画布中线对称
import { circle, rounded } from './geometry'

// 外缘多边形（顺时针、凸）每条边沿法线往里收 h，返回中心线多边形的顶点
export function shrink(points, h) {
  const n = points.length
  const lines = points.map((p, i) => {
    const q = points[(i + 1) % n]
    const [dx, dy] = [q[0] - p[0], q[1] - p[1]]
    const len = Math.hypot(dx, dy)
    // 顺时针（y 朝下）时内法线是 (-dy, dx)
    const [nx, ny] = [-dy / len, dx / len]
    return { p: [p[0] + nx * h, p[1] + ny * h], d: [dx, dy] }
  })
  return lines.map((a, i) => {
    const b = lines[(i + n - 1) % n]
    // 求 b、a 两条线的交点
    const cross = b.d[0] * a.d[1] - b.d[1] * a.d[0]
    const t = ((a.p[0] - b.p[0]) * a.d[1] - (a.p[1] - b.p[1]) * a.d[0]) / cross
    const r = v => Math.round(v * 1000) / 1000
    return [r(b.p[0] + b.d[0] * t), r(b.p[1] + b.d[1] * t)]
  })
}

// 斜放的标签：左上是方角（穿孔在这里），两条 45° 长边伸向右下，右下是平的尾边
// 外缘：左边、顶边在 3（线宽 1 时中心线 3.5），尾边两端的方角外缘在 22.14——常规线宽、圆角 2 下尾边方角的墨迹在 21 左右，和左上的 3 对称；
// 尖角模式下方角的墨迹顶到 22.14（离画布边 1.86，斜角允许外凸）
export const TAG_OUTER = [[3, 3], [12.64, 3], [22.14, 12.5], [12.5, 22.14], [3, 12.64]]
export function tagDiagonal(stroke, radius, outer = TAG_OUTER) {
  return rounded(shrink(outer, stroke / 2), Math.min(radius, 2))
}
export const tagHole = () => circle(8, 8, 1.25)

// 横放的标签：尖头朝左、尖头里一个穿孔，右边方正部分放字（方正部分的中间约 x 14.5）
// 穿孔圆心 x 7.5：尖头随线宽往里收，穿孔再靠左的话粗线宽下会贴上两条斜边（7.5 时和斜边的间距与旧版相同）
// 外缘：上下 4–20（线宽 1 时中心线 4.5 / 19.5）、右边 22；尖头外缘在 x 1.5（尖角模式下墨迹最远到这里，离画布边 1.5），
// 常规圆角下尖头被削圆，墨迹左缘约在 2.1，和右边的 2 基本对称
export function tagHorizontal(stroke, radius) {
  const outer = [[1.5, 12], [7.2, 4], [22, 4], [22, 20], [7.2, 20]]
  return [rounded(shrink(outer, stroke / 2), Math.min(radius, 2)), circle(7.5, 12, 1.25)]
}
