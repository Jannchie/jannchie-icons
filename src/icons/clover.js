// 四叶草：四片心形叶子在中心相连，只画外轮廓 + 中心到四个凹角的分隔线 + 从右下凹角伸出的叶柄
// 每片叶子是两个叶瓣圆（圆心在叶片方向 ±24°、离中心 5.5，半径 2.6）；外轮廓沿叶瓣圆的外侧走，
// 相邻两个叶瓣圆的外侧交点就是轮廓的拐点（同一片叶子的两瓣之间是心形缺口，相邻叶片之间是凹角）
const [cx, cy] = [12, 10.5]
const [DIST, SPREAD, R] = [5.5, 24, 2.6]
const rad = d => d * Math.PI / 180
const f = p => `${+p[0].toFixed(3)} ${+p[1].toFixed(3)}`

// 叶瓣按顺时针排：上叶左瓣、上叶右瓣、右叶上瓣、右叶下瓣……
const lobes = [-90, 0, 90, 180].flatMap(dir => [-1, 1].map((s) => {
  const a = rad(dir + s * SPREAD)
  return [cx + DIST * Math.cos(a), cy + DIST * Math.sin(a)]
}))
// 两个叶瓣圆的交点里离中心远的那个
function meet(p, q) {
  const [dx, dy] = [q[0] - p[0], q[1] - p[1]]
  const d = Math.hypot(dx, dy)
  const h = Math.sqrt(R * R - d * d / 4)
  const m = [p[0] + dx / 2, p[1] + dy / 2]
  const pts = [[m[0] - dy / d * h, m[1] + dx / d * h], [m[0] + dy / d * h, m[1] - dx / d * h]]
  const dc = pt => Math.hypot(pt[0] - cx, pt[1] - cy)
  return dc(pts[0]) > dc(pts[1]) ? pts[0] : pts[1]
}
const n = lobes.length
const corners = lobes.map((p, i) => meet(p, lobes[(i + 1) % n])) // corners[i]：第 i 瓣和第 i+1 瓣之间
let outline = `M${f(corners[n - 1])}`
lobes.forEach((c, i) => {
  const [from, to] = [corners[(i - 1 + n) % n], corners[i]]
  const ang = pt => Math.atan2(pt[1] - c[1], pt[0] - c[0])
  let span = ang(to) - ang(from)
  while (span < 0) span += 2 * Math.PI
  outline += `A${R} ${R} 0 ${span > Math.PI ? 1 : 0} 1 ${f(to)}`
})
// 凹角：奇数号拐点（相邻叶片之间）；右下那个（右叶下瓣和下叶右瓣之间）是叶柄的起点
const valleys = [1, 3, 5, 7].map(i => corners[i])
const stem = valleys[1]

export default () => [
  `${outline}Z`,
  valleys.map(v => `M${cx} ${cy}L${f(v)}`).join(''),
  `M${f(stem)}Q${f([stem[0] + 1.5, stem[1] + 3])} ${f([stem[0] + 2.5, 21.5])}`,
]
