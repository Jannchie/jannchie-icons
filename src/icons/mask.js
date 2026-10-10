import { circle, rounded } from '../geometry'
// 蒙版：外框 3.5–20.5 × 4.5–19.5（四边落在 .5 上）+ 正中一个圆；框内、圆外画斜向细线阴影（遮住的部分），圆里留空（选中的部分）
// 阴影线是 x + y = c（c = 15 / 21 / 27 / 33，圆心落在两条线正中）：穿过圆的两条离圆心近、和圆陡交；外侧两条离圆够远。
// 斜线如果擦着圆边交（离圆心接近半径），交点是锐角，finalize 会把圆在那里断开；两端直接接到外框和圆的中心线上，不刻意断开；
// 用圆头（round）——细线的圆头半径小于外框半线宽，端点落在中心线上就整个藏进外框/圆的线里，尖角模式下方头会从斜线端戳出来
const [x0, x1, y0, y1] = [3.5, 20.5, 4.5, 19.5]
const [cx, cy, r] = [12, 12, 4]
const hatch = (c) => {
  const [s, e] = [Math.max(x0, c - y1), Math.min(x1, c - y0)]
  const line = (a, b) => `M${a} ${c - a}L${b} ${c - b}`
  // 与圆相交的线在圆内那段去掉：x + y = c 上离圆心 r 的两点
  const d = (c - cx - cy) / 2
  const k = r * r / 2 - d * d
  if (k <= 0)
    return line(s, e)
  const m = (cx - cy + c) / 2
  const [p, q] = [m - Math.sqrt(k), m + Math.sqrt(k)]
  return `${line(s, p)}${line(q, e)}`
}
export default ({ radius }) => [
  rounded([[x0, y0], [x1, y0], [x1, y1], [x0, y1]], Math.min(radius, 2.5)),
  ...[15, 21, 27, 33].map(c => ({ d: hatch(c), thin: true, round: true })),
  circle(cx, cy, r),
]
