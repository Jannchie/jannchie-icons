// 漫画气泡：日式动漫 / 漫画风格的多边形说话框，尖三角尾巴是轮廓的一部分（闭合，没有线头）
// - bubble：略向右上倾斜的不规则多边形，尾巴从底边左段伸向左下
// - shout：喊叫型，锯齿星形边缘（尖角都 ≥ 60°，尖角模式的斜接上限 2 不会把它们切平），左下一根加长的尖刺当尾巴
// 内容符号（问号、感叹号、省略号……）放在气泡主体中间，键的顺序就是预览顺序
import { crisp, rounded } from './geometry'
import { dot } from './scene'
import { music } from './symbols'

// 普通气泡：主体约 3–21 × 3–16.5，尾尖 (4.5, 21)
const BUBBLE = [[3.5, 6], [11, 3], [20.5, 4.5], [21, 12], [17.5, 16], [11.5, 16.5], [4.5, 21, 'tip'], [6.5, 15.5], [3, 12.5]]
export const bubble = radius => rounded(BUBBLE.map(([x, y, tip]) => (tip ? [x, y, crisp(radius)] : [x, y])), Math.min(radius, 1))
export const BUBBLE_CENTER = [12.5, 9.75]

// 喊叫气泡：椭圆上交替取外点、内点；第 TAIL 个外点换成伸向左下的长尖刺
// 外点是尖角，墨迹会冲出尖点：圆角模式下是 h 减去小圆角（crisp）把尖点削进去的那段，尖角模式下是斜接 h / sin(半角)（60° 时 2h）。
// 所以外点按这段冲出量往圆心收：尖角的墨迹都落在同一个椭圆上（离画布上 1.5、左右 1.5 左右），字重、圆角模式不同也一样大
const [CX, CY] = [12, 10]
const SPIKES = 11
const TAIL = 6
const OUTER = [10.25, 8.4] // 外点墨迹大致所在的椭圆（圆弧尖角的墨迹横向还会多出一点，左右实际约 1.5）
const INNER = [7.75, 6.25] // 内点（凹角）
const shoutPoints = (radius, h) => {
  const at = (i, [rx, ry]) => {
    const a = -Math.PI / 2 + i * Math.PI / SPIKES
    return [CX + Math.cos(a) * rx, CY + Math.sin(a) * ry]
  }
  const r = radius ? crisp(radius) : 0
  return Array.from({ length: SPIKES * 2 }, (_, i) => {
    if (i === TAIL * 2)
      return [3.5, 21.75, 'tip']
    if (i % 2)
      return [...at(i, INNER), '']
    // 尖角的半角：从尖点看两侧凹角
    const [p, q, n] = [at(i, OUTER), at(i - 1, INNER), at(i + 1, INNER)]
    const [u, v] = [[q[0] - p[0], q[1] - p[1]], [n[0] - p[0], n[1] - p[1]]]
    const half = Math.acos((u[0] * v[0] + u[1] * v[1]) / Math.hypot(...u) / Math.hypot(...v)) / 2
    const out = r ? h - r * (1 / Math.sin(half) - 1) : h / Math.sin(half)
    const [dx, dy] = [p[0] - CX, p[1] - CY]
    const k = 1 - out / Math.hypot(dx, dy)
    return [+(CX + dx * k).toFixed(3), +(CY + dy * k).toFixed(3), 'tip']
  })
}
export const shout = (radius, stroke = 1.5) => rounded(shoutPoints(radius, stroke / 2).map(([x, y, tip]) => (tip ? [x, y, crisp(radius)] : [x, y])), Math.min(radius, 0.75))
export const SHOUT_CENTER = [CX, CY] // 内容放在锯齿圆心上

// 内容符号：画在中心 (cx, cy) 附近，s 缩放（1 = 普通气泡里的大小）；竖笔和下面的点之间留 2.75，粗字重下也分得开
const question = (cx, cy, s = 1) => [
  `M${cx - 2 * s} ${cy - 2 * s}A${2 * s} ${2 * s} 0 1 1 ${cx + 1.1 * s} ${cy - 0.35 * s}C${cx + 0.5 * s} ${cy + 0.05 * s} ${cx} ${cy + 0.5 * s} ${cx} ${cy + 1.25 * s}`,
  dot(cx, cy + 4 * s),
]
const exclaim = (cx, cy, s = 1) => [`M${cx} ${cy - 4 * s}V${cy + 1.25 * s}`, dot(cx, cy + 4 * s)]
export const CONTENTS = {
  'empty': { zh: '空', paths: () => [] },
  'question': { zh: '问号', paths: ([x, y]) => question(x, y) },
  'exclaim': { zh: '感叹号', paths: ([x, y]) => exclaim(x, y) },
  'interrobang': { zh: '问号 + 感叹号', paths: ([x, y]) => [...question(x - 2, y), ...exclaim(x + 3, y)] }, // 两根竖笔落在 10.5、15.5
  'ellipsis': { zh: '省略号', paths: ([x, y]) => [-4, 0, 4].map(dx => dot(x + dx, y + 0.25, 2.5)) },
  'music': { zh: '音符', paths: ([x, y], radius) => music([x, y], 1.15, radius) },
}
