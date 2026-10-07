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
const [CX, CY] = [12, 10]
const SPIKES = 11
const TAIL = 7
const shoutPoints = () => Array.from({ length: SPIKES * 2 }, (_, i) => {
  const a = -Math.PI / 2 + i * Math.PI / SPIKES
  if (i === TAIL * 2)
    return [3.5, 21.5, 'tip']
  const [rx, ry] = i % 2 ? [7.75, 6.25] : [10.25, 8.5]
  return [+(CX + Math.cos(a) * rx).toFixed(3), +(CY + Math.sin(a) * ry).toFixed(3), i % 2 ? '' : 'tip']
})
export const shout = radius => rounded(shoutPoints().map(([x, y, tip]) => (tip ? [x, y, crisp(radius)] : [x, y])), Math.min(radius, 0.75))
export const SHOUT_CENTER = [12.5, 10] // 内容的竖笔落在 .5 上，比锯齿圆心右偏半格

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
