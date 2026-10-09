import { rounded } from '../geometry'
import { star } from '../symbols'

// 半星（评分里的半颗）：和 star 同一颗星（star 符号 k = 2.4，外半径 8.64、内半径 0.48 倍），左半边填实
// 填实的部分沿星的左半轮廓走（顶尖 → 左侧三个内角、两个外角 → 底部内角），再沿中线回到顶尖；
// 圆角取法和 star 一样（内角 corner、外角放宽一倍），填色的边和外轮廓重合。
// 顶尖不能留成尖角：外轮廓在顶尖是一段圆弧（和 geometry 的 corner 同一算法求切点、半径），
// 填色从中线上的弧顶出发、沿这段弧的左半走到左边的切点，才不会从轮廓里戳出来；尖角模式下弧长为 0，就是原来的尖
const k = 2.4
const R = 3.6 * k
const r = R * 0.48
const dy = R * (1 - Math.cos(Math.PI / 5)) / 2
const fmt = n => Math.round(n * 1000) / 1000

export default ({ radius, stroke }) => {
  const corner = Math.min(radius, k * 0.75)
  const pt = (i) => {
    const a = -Math.PI / 2 + i * Math.PI / 5
    const d = i % 2 ? r : R
    return [12 + Math.cos(a) * d, 12 + dy + Math.sin(a) * d, i % 2 ? corner : corner * 2]
  }
  // 顶尖的圆角：切点离顶尖 t，圆弧半径 rho（同 geometry 里 corner 的算法，相邻边长取到内角 i = 9）
  const [px, py] = pt(0)
  const [ax, ay] = pt(9)
  const edge = Math.hypot(ax - px, ay - py)
  const half = Math.atan2(Math.abs(ax - px), ay - py) // 顶角的一半（两条边关于中线对称）
  const t = Math.min(corner * 2 / Math.tan(half), corner * 2, edge / 2)
  const rho = t * Math.tan(half)
  const tangent = [px + (ax - px) / edge * t, py + (ay - py) / edge * t]
  const top = py + t / Math.cos(half) - rho // 弧顶（中线上）
  // 顶尖 → 左侧各角（i = 9, 8, 7, 6）→ 底部内角（i = 5，中线端点，不做圆角）；去掉开头的「M 顶尖」，
  // 由上面的弧接到左切点，再直线接到 i = 9 的圆角（各角圆角和 star 完全一致）
  const side = rounded([pt(0), ...[9, 8, 7, 6].map(pt), pt(5)], corner, false).replace(/^M[^L]*/, '')
  // 填色块本身也描边（线宽 stroke），中线那条边放在 mid = 12 - stroke / 2，描边后墨迹正好停在 x = 12。
  // 上下两端取这条竖线和左半轮廓的交点，不能直接挪：挪出去的角会把描边顶出轮廓
  const h = 12 - stroke / 2
  const mid = fmt(h)
  let head
  if (rho > 0 && tangent[0] <= h) {
    // 交点落在顶尖的圆弧上（圆心在中线上、弧顶下方 rho）
    const y = top + rho - Math.sqrt(rho * rho - (12 - h) ** 2)
    head = `M${mid} ${fmt(y)}A${fmt(rho)} ${fmt(rho)} 0 0 0 ${fmt(tangent[0])} ${fmt(tangent[1])}`
  }
  else {
    // 尖角（或圆弧很窄）：交点在顶尖到 i = 9 的直边上
    const [tx, ty] = rho > 0 ? tangent : [px, py]
    head = `M${mid} ${fmt(ty + (ay - ty) * (tx - h) / (tx - ax))}`
  }
  // 底部：最后一段直线接到底部内角 (12, y5)，改成停在这段线和竖线的交点
  const nums = side.match(/-?[\d.]+/g).map(Number)
  const [qx, qy, , y5] = nums.slice(-4)
  const tail = side.replace(/L[\d.]+ [\d.]+$/, `L${mid} ${fmt(y5 + (qy - y5) * (12 - h) / (12 - qx))}`)
  return [
    ...star([12, 12], k, radius),
    { d: `${head}${tail}Z`, fill: true },
  ]
}
