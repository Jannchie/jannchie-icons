const fmt = n => String(Math.round(n * 1000) / 1000)
const pt = ([x, y]) => `${fmt(x)} ${fmt(y)}`
const sub = (a, b) => [a[0] - b[0], a[1] - b[1]]
const len = v => Math.hypot(v[0], v[1])

// 在顶点 p 处切一个半径 radius 的圆角；相邻边过短时自动收小半径
// 切点到顶点的距离不超过 radius：直角、钝角不受影响，锐角自动收小圆弧，保留尖感
// 顶点可写成 [x, y, r] 单独指定半径，不跟随全局设定
function corner(a, p, b, radius) {
  radius = p[2] ?? radius
  const va = sub(a, p)
  const vb = sub(b, p)
  const la = len(va)
  const lb = len(vb)
  const half = Math.acos((va[0] * vb[0] + va[1] * vb[1]) / (la * lb)) / 2
  const t = Math.min(radius / Math.tan(half), radius, la / 2, lb / 2)
  const r = t * Math.tan(half)
  const cross = (p[0] - a[0]) * (b[1] - p[1]) - (p[1] - a[1]) * (b[0] - p[0])
  return {
    start: [p[0] + va[0] / la * t, p[1] + va[1] / la * t],
    end: [p[0] + vb[0] / lb * t, p[1] + vb[1] / lb * t],
    r,
    sweep: cross > 0 ? 1 : 0,
  }
}

const arc = c => c.r > 0 ? `L${pt(c.start)}A${fmt(c.r)} ${fmt(c.r)} 0 0 ${c.sweep} ${pt(c.end)}` : `L${pt(c.start)}`

// 造型特征处的角：固定小圆角，不随全局放大
export const crisp = radius => Math.min(radius, 0.5)

// 折线/多边形 → 带圆角的 path d
export function rounded(points, radius, closed = true) {
  const n = points.length
  if (!closed) {
    const inner = points.slice(1, -1).map((p, i) => arc(corner(points[i], p, points[i + 2], radius)))
    return `M${pt(points[0])}${inner.join('')}L${pt(points[n - 1])}`
  }
  const cs = points.map((p, i) => corner(points[(i - 1 + n) % n], p, points[(i + 1) % n], radius))
  return `M${pt(cs[0].end)}${cs.slice(1).map(arc).join('')}${arc(cs[0])}Z`
}

// 外缘固定在 [x0, y0, x1, y1] 的圆角矩形框：中心线往里收半个线宽，线宽变粗只往里长
export function frame(stroke, radius, [x0, y0, x1, y1]) {
  const h = stroke / 2
  return rounded([[x0 + h, y0 + h], [x1 - h, y0 + h], [x1 - h, y1 - h], [x0 + h, y1 - h]], radius)
}

// 直线段 a→b，起点往外伸 e0、终点往外伸 e1（实心版里把挖空线穿出外轮廓，切得干净）
export function through([ax, ay], [bx, by], e0, e1 = e0) {
  const l = Math.hypot(bx - ax, by - ay)
  const [ux, uy] = [(bx - ax) / l, (by - ay) / l]
  return `M${fmt(ax - ux * e0)} ${fmt(ay - uy * e0)}L${fmt(bx + ux * e1)} ${fmt(by + uy * e1)}`
}

// 径向线段：从圆心 c 沿 deg 方向（度；0° 朝右，y 轴朝下所以正角度是顺时针），从半径 from 画到 to
export function ray([cx, cy], deg, from, to) {
  const [c, s] = [Math.cos(deg * Math.PI / 180), Math.sin(deg * Math.PI / 180)]
  return `M${fmt(cx + from * c)} ${fmt(cy + from * s)}L${fmt(cx + to * c)} ${fmt(cy + to * s)}`
}

// 圆
export const circle = (cx, cy, r) => `M${fmt(cx - r)} ${fmt(cy)}a${fmt(r)} ${fmt(r)} 0 1 0 ${fmt(r * 2)} 0a${fmt(r)} ${fmt(r)} 0 1 0 ${fmt(-r * 2)} 0`

// 椭圆（闭合，从左端起笔）
export const oval = (cx, cy, rx, ry) => `M${fmt(cx - rx)} ${fmt(cy)}A${fmt(rx)} ${fmt(ry)} 0 1 0 ${fmt(cx + rx)} ${fmt(cy)}A${fmt(rx)} ${fmt(ry)} 0 1 0 ${fmt(cx - rx)} ${fmt(cy)}Z`

// 两个圆（圆心 c0 半径 r0、圆心 c1 半径 r1）的两个交点，不取整：从 c0 朝 c1 看，第一个在右手边（y 轴朝下），第二个在左手边
// 两个圆连成一条轮廓（熊的脑袋和耳朵、葫芦的两个肚子）时，轮廓在这两点上换弧
export function meet([x0, y0], r0, [x1, y1], r1) {
  const d = Math.hypot(x1 - x0, y1 - y0)
  const [ux, uy] = [(x1 - x0) / d, (y1 - y0) / d]
  const along = (r0 * r0 - r1 * r1 + d * d) / (2 * d)
  const off = Math.sqrt(r0 * r0 - along * along)
  return [
    [x0 + along * ux - off * uy, y0 + along * uy + off * ux],
    [x0 + along * ux + off * uy, y0 + along * uy - off * ux],
  ]
}

// 坐标取三位小数（数字，不是字符串；和上面的 fmt 不同，fmt 用 Math.round，个别 .xxx5 的值舍入不一样）
export const num = v => +v.toFixed(3)

// 圆脑袋 + 左右对称的两只圆耳朵连成的一条闭合轮廓（bear、koala、tiger、monkey）：脑袋圆心 h、半径 R，左耳圆心 e、半径 r，右耳是左耳对 x = 12 的镜像
// 从左耳的脸侧交点起笔，绕过左耳 → 头顶 → 右耳 → 下面一大段脑袋回到起点；large 是最后这段脑袋弧的大弧标志
// （耳朵在头顶两角时下面这段超过半圆，取 1；耳朵长在脑袋两侧时不到半圆，取 0）
export function earedHead([hx, hy], R, [ex, ey], r, large = 1) {
  const [a, b] = meet([hx, hy], R, [ex, ey], r)
  const P = ([x, y]) => `${num(x)} ${num(y)}`
  const M = ([x, y]) => `${num(24 - x)} ${num(y)}`
  return `M${P(b)}A${r} ${r} 0 1 1 ${P(a)}A${R} ${R} 0 0 1 ${M(a)}A${r} ${r} 0 1 1 ${M(b)}A${R} ${R} 0 ${large} 1 ${P(b)}Z`
}
