import { circle } from '../geometry'

// 光圈：圆内 6 片叶片。每条线从内六边形的上一个顶点出发，沿一条边经过下一个顶点再延伸到外圆，
// 六条线首尾相接围出中间的六边形孔，外圈形成风车状的叶片
// 内六边形的竖边落在 cx ± 3.5（x.5 上）
const [cx, cy, R, r] = [12, 12, 9, 3.5 / Math.cos(Math.PI / 6)]
const v = Array.from({ length: 6 }, (_, i) => {
  const a = (30 + 60 * i) * Math.PI / 180
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)]
})
const blades = v.map((p, i) => {
  const q = v[(i + 5) % 6]
  const len = Math.hypot(p[0] - q[0], p[1] - q[1])
  const [ux, uy] = [(p[0] - q[0]) / len, (p[1] - q[1]) / len]
  // 从 p 沿 (ux, uy) 射出，求与外圆的交点
  const [dx, dy] = [p[0] - cx, p[1] - cy]
  const b = dx * ux + dy * uy
  const t = -b + Math.sqrt(b * b - (dx * dx + dy * dy - R * R))
  return `M${q[0]} ${q[1]}L${p[0] + ux * t} ${p[1] + uy * t}`
})

export default () => [circle(cx, cy, R), ...blades]
