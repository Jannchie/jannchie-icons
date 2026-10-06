import { GAP } from '../clearance'
import { clip } from '../clip'
import { rounded } from '../geometry'
import { rotate } from '../transform'

// 链接：两个 6 × 10 的圆角长环上下交叠，像锁链一样互相套住：
// 左边的交叉点上环在前、下环断开；右边的交叉点下环在前、上环断开。先竖直画，再顺时针转 30°
const [a, b] = [8.5, 15.5] // 上环、下环中心 y
const ring = cy => rounded([[9, cy - 5], [15, cy - 5], [15, cy + 5], [9, cy + 5]], 3)

// 上环底部半圆（圆心 a + 2）与下环顶部半圆（圆心 b − 2）的两个交点
const [ca, cb, r] = [a + 2, b - 2, 3]
const h = Math.sqrt(r * r - ((cb - ca) / 2) ** 2)
const mid = (ca + cb) / 2
const left = [12 - h, mid]
const right = [12 + h, mid]
// 交点处沿某个环的切线方向取一小段，作为只在这一处起作用的「刀」
const blade = (p, center) => {
  const [rx, ry] = [p[0] - 12, p[1] - center]
  const len = Math.hypot(rx, ry)
  const [tx, ty] = [-ry / len * 1.5, rx / len * 1.5]
  return `M${p[0] - tx} ${p[1] - ty}L${p[0] + tx} ${p[1] + ty}`
}

export default ({ stroke }) => {
  const g = GAP + stroke
  const top = clip(ring(a), [blade(right, cb)], g) // 右交点：下环在前，上环断开
  const bottom = clip(ring(b), [blade(left, ca)], g) // 左交点：上环在前，下环断开
  return [rotate(top, 30), rotate(bottom, 30)]
}
