import { circle, rounded } from '../geometry'

// 奶酪：楔形块（顶面 + 侧面）+ 两个孔
const body = [[3.5, 10.5], [18, 5.5], [20.5, 10.5], [20.5, 19.5], [3.5, 19.5]]
// 圆角半径 r 时，第 i 个顶点处的圆角弧在 y = 10.5 处的 x
function waistX(i, r) {
  const n = body.length
  const [p, a, b] = [body[i], body[(i + n - 1) % n], body[(i + 1) % n]]
  const unit = ([x, y]) => { const l = Math.hypot(x, y); return [x / l, y / l] }
  const [u, v] = [unit([a[0] - p[0], a[1] - p[1]]), unit([b[0] - p[0], b[1] - p[1]])]
  const half = Math.acos(u[0] * v[0] + u[1] * v[1]) / 2
  if (r <= 0 || half <= 0)
    return p[0]
  const bis = unit([u[0] + v[0], u[1] + v[1]])
  const [cx, cy] = [p[0] + bis[0] * r / Math.sin(half), p[1] + bis[1] * r / Math.sin(half)]
  const dx = Math.sqrt(Math.max(0, r * r - (10.5 - cy) ** 2))
  return +(cx < p[0] ? cx + dx : cx - dx).toFixed(3)
}
export default ({ radius }) => [
  rounded(body, Math.min(radius, 1.5)),
  // 腰线两端落在圆角弧上 y = 10.5 处，免得被吸附到弧上的最近点而歪掉
  `M${waistX(0, Math.min(radius, 1.5))} 10.5H${waistX(2, Math.min(radius, 1.5))}`,
  circle(8, 15, 1.5),
  circle(15, 15, 2),
]
